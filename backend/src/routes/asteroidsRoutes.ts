import { Router } from 'express';
import { getAsteroidFeed } from '../controllers/asteroidsController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const asteroidsRouter = Router();

asteroidsRouter.get('/feed', asyncHandler(getAsteroidFeed));
