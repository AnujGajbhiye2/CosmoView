import { describe, expect, it } from 'vitest';
import { MemoryCache } from '../src/lib/cache/memoryCache.js';
import { AsteroidsService } from '../src/services/nasa/asteroidsService.js';
import { EpicService } from '../src/services/nasa/epicService.js';

describe('MemoryCache', () => {
  it('returns cached items before they expire', () => {
    const cache = new MemoryCache();
    cache.set('key', { value: 1 }, 1_000);

    expect(cache.get<{ value: number }>('key')).toEqual({ value: 1 });
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
