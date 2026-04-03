import type { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

let app: Express;

beforeAll(() => {
  process.env.PORT = process.env.PORT ?? '3001';
  process.env.NODE_ENV = 'test';
  process.env.NASA_API_KEY = process.env.NASA_API_KEY ?? 'DEMO_KEY';
  process.env.FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
  process.env.NASA_API_TIMEOUT_MS = '1000';
  process.env.NASA_CACHE_TTL_APOD_MS = '1000';
  process.env.NASA_CACHE_TTL_ASTEROIDS_MS = '1000';
  process.env.NASA_CACHE_TTL_IMAGES_MS = '1000';
  process.env.NASA_CACHE_TTL_EPIC_MS = '1000';
  process.env.RATE_LIMIT_WINDOW_MS = '60000';
  process.env.RATE_LIMIT_MAX_REQUESTS = '100';
});

beforeAll(async () => {
  const module = await import('../src/app.js');
  app = module.app;
});

describe('app routes', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('ok');
  });

  it('rejects invalid asteroid ranges', async () => {
    const response = await request(app)
      .get('/api/v1/asteroids/feed')
      .query({
        startDate: '2026-04-10',
        endDate: '2026-04-01'
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
