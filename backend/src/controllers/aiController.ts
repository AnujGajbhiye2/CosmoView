import type { Request, Response } from 'express';
import { services } from '../config/services.js';
import { missionBriefInputSchema } from '../lib/validation/querySchemas.js';
import { validate } from '../lib/validation/validate.js';

export const postMissionBrief = async (request: Request, response: Response): Promise<void> => {
  if (!services.gemini.isAvailable) {
    response.json({
      data: { aiAvailable: false },
      meta: { requestId: response.locals.requestId, cached: false }
    });
    return;
  }

  const input = validate(missionBriefInputSchema, request.body);
  const result = await services.gemini.generateMissionBrief(input);

  response.json({
    data: {
      aiAvailable: true,
      summary: result.summary,
      signal: result.signal,
      prompts: result.prompts
    },
    meta: {
      requestId: response.locals.requestId,
      cached: false
    }
  });
};
