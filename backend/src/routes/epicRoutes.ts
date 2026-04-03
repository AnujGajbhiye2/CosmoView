import { Router } from 'express';
import { getEpicNaturalImages } from '../controllers/epicController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const epicRouter = Router();

epicRouter.get('/natural', asyncHandler(getEpicNaturalImages));
