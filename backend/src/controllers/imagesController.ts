import type { Request, Response } from 'express';
import { services } from '../config/services.js';
import { imageSearchQuerySchema } from '../lib/validation/querySchemas.js';
import { validate } from '../lib/validation/validate.js';

export const searchImages = async (request: Request, response: Response): Promise<void> => {
  const query = validate(imageSearchQuerySchema, request.query);
  const result = await services.images.search(query.q, query.page, query.mediaType);

  response.json({
    data: result.data,
    meta: {
      requestId: response.locals.requestId,
      cached: result.cached,
      source: 'nasa-image-library'
    }
  });
};
