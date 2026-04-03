import type { Request, Response } from 'express';
import { services } from '../config/services.js';
import { apodQuerySchema } from '../lib/validation/querySchemas.js';
import { validate } from '../lib/validation/validate.js';

export const getApod = async (request: Request, response: Response): Promise<void> => {
  const query = validate(apodQuerySchema, request.query);
  const result = await services.apod.getApod(query.date);

  response.json({
    data: result.data,
    meta: {
      requestId: response.locals.requestId,
      cached: result.cached,
      source: 'nasa-apod'
    }
  });
};
