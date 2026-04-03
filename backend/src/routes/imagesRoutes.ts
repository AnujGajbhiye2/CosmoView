import { Router } from 'express';
import { searchImages } from '../controllers/imagesController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const imagesRouter = Router();

imagesRouter.get('/search', asyncHandler(searchImages));
