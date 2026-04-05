import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryCache } from '../src/lib/cache/memoryCache.js';
import { apodQuerySchema, asteroidsQuerySchema, epicQuerySchema, imageSearchQuerySchema } from '../src/lib/validation/querySchemas.js';
import { ApodService } from '../src/services/nasa/apodService.js';
import { AsteroidsService } from '../src/services/nasa/asteroidsService.js';
import { EpicService } from '../src/services/nasa/epicService.js';

describe('MemoryCache', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns cached items before they expire', () => {
    const cache = new MemoryCache();
    cache.set('key', { value: 1 }, 1_000);

    expect(cache.get<{ value: number }>('key')).toEqual({ value: 1 });
  });

  it('returns undefined after TTL expires', () => {
    const cache = new MemoryCache();
    cache.set('key', 'hello', 500);

    vi.advanceTimersByTime(501);

    expect(cache.get('key')).toBeUndefined();
  });

  it('overwrites existing entry and resets TTL', () => {
    const cache = new MemoryCache();
    cache.set('key', 'first', 500);
    cache.set('key', 'second', 5_000);

    vi.advanceTimersByTime(501);

    expect(cache.get('key')).toBe('second');
  });

  it('returns undefined for keys that were never set', () => {
    const cache = new MemoryCache();
    expect(cache.get('missing')).toBeUndefined();
  });
});

describe('querySchemas — apodQuerySchema', () => {
  it('accepts a valid ISO date', () => {
    expect(() => apodQuerySchema.parse({ date: '2026-04-01' })).not.toThrow();
  });

  it('accepts no date (today)', () => {
    expect(() => apodQuerySchema.parse({})).not.toThrow();
  });

  it('rejects non-ISO date format', () => {
    expect(() => apodQuerySchema.parse({ date: '01-04-2026' })).toThrow();
  });
});

describe('querySchemas — asteroidsQuerySchema', () => {
  it('accepts a valid 7-day range', () => {
    expect(() => asteroidsQuerySchema.parse({ startDate: '2026-04-01', endDate: '2026-04-07' })).not.toThrow();
  });

  it('accepts a single-day range', () => {
    expect(() => asteroidsQuerySchema.parse({ startDate: '2026-04-01', endDate: '2026-04-01' })).not.toThrow();
  });

  it('rejects endDate before startDate', () => {
    expect(() => asteroidsQuerySchema.parse({ startDate: '2026-04-07', endDate: '2026-04-01' })).toThrow();
  });

  it('rejects ranges longer than 7 days', () => {
    expect(() => asteroidsQuerySchema.parse({ startDate: '2026-04-01', endDate: '2026-04-09' })).toThrow();
  });

  it('rejects malformed dates', () => {
    expect(() => asteroidsQuerySchema.parse({ startDate: 'not-a-date', endDate: '2026-04-07' })).toThrow();
  });
});

describe('querySchemas — imageSearchQuerySchema', () => {
  it('accepts a valid search query', () => {
    const result = imageSearchQuerySchema.parse({ q: 'nebula' });
    expect(result.page).toBe(1);
    expect(result.mediaType).toBe('image');
  });

  it('rejects query shorter than 2 characters', () => {
    expect(() => imageSearchQuerySchema.parse({ q: 'a' })).toThrow();
  });

  it('coerces page string to number', () => {
    const result = imageSearchQuerySchema.parse({ q: 'mars', page: '3' });
    expect(result.page).toBe(3);
  });
});

describe('querySchemas — epicQuerySchema', () => {
  it('accepts a valid ISO date', () => {
    expect(() => epicQuerySchema.parse({ date: '2026-04-01' })).not.toThrow();
  });

  it('rejects missing date', () => {
    expect(() => epicQuerySchema.parse({})).toThrow();
  });
});

describe('ApodService', () => {
  const mockApodPayload = {
    title: 'Horsehead Nebula',
    date: '2026-04-01',
    media_type: 'image',
    explanation: 'A dark nebula.',
    url: 'https://apod.nasa.gov/apod/image/horsehead.jpg',
    hdurl: 'https://apod.nasa.gov/apod/image/horsehead_hd.jpg',
    copyright: 'Some Photographer'
  };

  it('fetches and maps NASA response to DTO on cache miss', async () => {
    const cache = new MemoryCache();
    const client = { get: vi.fn().mockResolvedValue({ data: mockApodPayload }) };

    const service = new ApodService(client as never, cache, 60_000);
    const result = await service.getApod('2026-04-01');

    expect(result.cached).toBe(false);
    expect(result.data).toEqual({
      title: 'Horsehead Nebula',
      date: '2026-04-01',
      mediaType: 'image',
      explanation: 'A dark nebula.',
      imageUrl: 'https://apod.nasa.gov/apod/image/horsehead.jpg',
      hdImageUrl: 'https://apod.nasa.gov/apod/image/horsehead_hd.jpg',
      copyright: 'Some Photographer'
    });
    expect(client.get).toHaveBeenCalledOnce();
  });

  it('returns cached data on second call without hitting the API', async () => {
    const cache = new MemoryCache();
    const client = { get: vi.fn().mockResolvedValue({ data: mockApodPayload }) };

    const service = new ApodService(client as never, cache, 60_000);
    await service.getApod('2026-04-01');
    const second = await service.getApod('2026-04-01');

    expect(second.cached).toBe(true);
    expect(client.get).toHaveBeenCalledOnce();
  });

  it('handles null optional fields gracefully', async () => {
    const cache = new MemoryCache();
    const payload = { ...mockApodPayload, hdurl: undefined, copyright: undefined };
    const client = { get: vi.fn().mockResolvedValue({ data: payload }) };

    const service = new ApodService(client as never, cache, 60_000);
    const result = await service.getApod();

    expect(result.data.hdImageUrl).toBeNull();
    expect(result.data.copyright).toBeNull();
  });
});

describe('AsteroidsService mapping', () => {
  it('normalizes the NeoWs response into chart-friendly DTOs', async () => {
    const cache = new MemoryCache();
    const client = {
      get: async () => ({
        data: {
          near_earth_objects: {
            '2026-04-01': [
              {
                id: '123',
                name: 'Asteroid 123',
                is_potentially_hazardous_asteroid: true,
                estimated_diameter: {
                  kilometers: {
                    estimated_diameter_min: 1.25,
                    estimated_diameter_max: 2.75
                  }
                },
                close_approach_data: [
                  {
                    close_approach_date: '2026-04-01',
                    relative_velocity: {
                      kilometers_per_hour: '12345.6'
                    },
                    miss_distance: {
                      kilometers: '987654.3'
                    }
                  }
                ]
              }
            ]
          }
        }
      })
    };

    const service = new AsteroidsService(client as never, cache, 60_000);
    const result = await service.getFeed('2026-04-01', '2026-04-01');

    expect(result.cached).toBe(false);
    expect(result.data.asteroids[0]).toEqual({
      id: '123',
      name: 'Asteroid 123',
      hazardous: true,
      diameterKmMin: 1.25,
      diameterKmMax: 2.75,
      closeApproachDate: '2026-04-01',
      missDistanceKm: 987654.3,
      velocityKph: 12345.6
    });
  });
});

describe('EpicService mapping', () => {
  it('builds EPIC archive URLs from natural imagery payloads', async () => {
    const cache = new MemoryCache();
    const client = {
      get: async () => ({
        data: [
          {
            identifier: 'abc',
            caption: 'Earth view',
            image: 'epic_1b_20260401000000',
            date: '2026-04-01 00:00:00',
            centroid_coordinates: {
              lat: 12.3,
              lon: 45.6
            }
          }
        ]
      })
    };

    const service = new EpicService(client as never, cache, 60_000);
    const result = await service.getNaturalImages('2026-04-01');

    expect(result.data[0]?.archiveUrl).toBe(
      'https://epic.gsfc.nasa.gov/archive/natural/2026/04/01/png/epic_1b_20260401000000.png'
    );
  });
});
