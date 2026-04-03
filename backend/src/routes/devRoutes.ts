import { Router } from 'express';
import { getDevEndpoints } from '../controllers/devController.js';

export const devRouter = Router();

devRouter.get('/endpoints', getDevEndpoints);
