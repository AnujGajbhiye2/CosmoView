import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import type { DevEndpointsDto } from '../types/dev.js';

const endpoints: DevEndpointsDto['endpoints'] = [
  {
    name: 'Health Check',
    description: 'Basic liveness route used to confirm the backend is running.',
    method: 'GET',
    path: '/health',
    variations: [
      {
        description: 'Default health check.',
        method: 'GET',
        path: '/health'
      }
    ]
  },
  {
    name: 'Astronomy Picture of the Day',
    description: 'Returns a normalized APOD payload for a specific date or today.',
    method: 'GET',
    path: '/api/v1/apod',
    query: {
      date: 'Optional YYYY-MM-DD date.'
    },
    variations: [
      {
        description: 'Fetch today’s APOD.',
        method: 'GET',
        path: '/api/v1/apod'
      },
      {
        description: 'Fetch APOD for a specific date.',
        method: 'GET',
        path: '/api/v1/apod?date=2025-01-01'
      }
    ]
  },
  {
    name: 'Near-Earth Asteroid Feed',
    description: 'Returns a normalized NeoWs feed for a date range up to 7 days.',
    method: 'GET',
    path: '/api/v1/asteroids/feed',
    query: {
      startDate: 'Required YYYY-MM-DD start date.',
      endDate: 'Required YYYY-MM-DD end date. Must be within 7 days of startDate.'
    },
    variations: [
      {
        description: 'Fetch a 3-day asteroid feed.',
        method: 'GET',
        path: '/api/v1/asteroids/feed?startDate=2025-01-01&endDate=2025-01-03'
      },
      {
        description: 'Fetch a single-day asteroid feed.',
        method: 'GET',
        path: '/api/v1/asteroids/feed?startDate=2025-01-01&endDate=2025-01-01'
      }
    ]
  },
  {
    name: 'NASA Image Library Search',
    description: 'Searches NASA’s image library and returns normalized image results.',
    method: 'GET',
    path: '/api/v1/images/search',
    query: {
      q: 'Required search term with at least 2 characters.',
      page: 'Optional positive page number.',
      mediaType: 'Optional. Currently only image is supported.'
    },
    variations: [
      {
        description: 'Search the first page of moon images.',
        method: 'GET',
        path: '/api/v1/images/search?q=moon&page=1&mediaType=image'
      },
      {
        description: 'Search a later page of nebula images.',
        method: 'GET',
        path: '/api/v1/images/search?q=nebula&page=2&mediaType=image'
      }
    ]
  },
  {
    name: 'EPIC Natural Imagery',
    description: 'Returns normalized EPIC natural images for a given date.',
    method: 'GET',
    path: '/api/v1/epic/natural',
    query: {
      date: 'Required YYYY-MM-DD date.'
    },
    variations: [
      {
        description: 'Fetch EPIC natural imagery for a specific day.',
        method: 'GET',
        path: '/api/v1/epic/natural?date=2025-01-01'
      }
    ]
  },
  {
    name: 'EPIC Latest Natural Imagery',
    description: 'Returns normalized EPIC natural images for the most recently available date.',
    method: 'GET',
    path: '/api/v1/epic/natural/latest',
    variations: [
      {
        description: 'Fetch the most recent EPIC natural imagery.',
        method: 'GET',
        path: '/api/v1/epic/natural/latest'
      }
    ]
  }
];

export const getDevEndpoints = (_request: Request, response: Response): void => {
  response.json({
    data: {
      environment: env.NODE_ENV,
      basePath: '/',
      endpoints
    },
    meta: {
      requestId: response.locals.requestId
    }
  });
};
