import { Router } from 'express';
import { postMissionBrief } from '../controllers/aiController.js';
import { aiRateLimiters } from '../middleware/aiRateLimiter.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const aiRouter = Router();

aiRouter.post('/mission-brief', ...aiRateLimiters, asyncHandler(postMissionBrief));
