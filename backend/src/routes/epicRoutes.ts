import { Router } from 'express';
import { getEpicNaturalImages, getEpicLatestNaturalImages } from '../controllers/epicController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const epicRouter = Router();

epicRouter.get('/natural/latest', asyncHandler(getEpicLatestNaturalImages));
epicRouter.get('/natural', asyncHandler(getEpicNaturalImages));
