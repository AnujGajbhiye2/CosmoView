import type { Request, Response } from 'express';
import { services } from '../config/services.js';
import { epicQuerySchema } from '../lib/validation/querySchemas.js';
import { validate } from '../lib/validation/validate.js';

export const getEpicNaturalImages = async (request: Request, response: Response): Promise<void> => {
  const query = validate(epicQuerySchema, request.query);
  const result = await services.epic.getNaturalImages(query.date);

  response.json({
    data: result.data,
    meta: {
      requestId: response.locals.requestId,
      cached: result.cached,
      source: 'nasa-epic'
    }
  });
};
