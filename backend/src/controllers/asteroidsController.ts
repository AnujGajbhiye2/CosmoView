import type { Request, Response } from 'express';
import { services } from '../config/services.js';
import { asteroidsQuerySchema } from '../lib/validation/querySchemas.js';
import { validate } from '../lib/validation/validate.js';

export const getAsteroidFeed = async (request: Request, response: Response): Promise<void> => {
  const query = validate(asteroidsQuerySchema, request.query);
  const result = await services.asteroids.getFeed(query.startDate, query.endDate);

  response.json({
    data: result.data,
    meta: {
      requestId: response.locals.requestId,
      cached: result.cached,
      source: 'nasa-neows'
    }
  });
};
