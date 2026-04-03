import { Router } from 'express';
import { apodRouter } from './apodRoutes.js';
import { asteroidsRouter } from './asteroidsRoutes.js';
import { devRouter } from './devRoutes.js';
import { epicRouter } from './epicRoutes.js';
import { healthRouter } from './healthRoutes.js';
import { imagesRouter } from './imagesRoutes.js';

export const appRouter = Router();

appRouter.use('/health', healthRouter);
appRouter.use('/dev', devRouter);
appRouter.use('/api/v1/apod', apodRouter);
appRouter.use('/api/v1/asteroids', asteroidsRouter);
appRouter.use('/api/v1/images', imagesRouter);
appRouter.use('/api/v1/epic', epicRouter);
