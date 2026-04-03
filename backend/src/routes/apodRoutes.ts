import { Router } from 'express';
import { getApod } from '../controllers/apodController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const apodRouter = Router();

apodRouter.get('/', asyncHandler(getApod));
