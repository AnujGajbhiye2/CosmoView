import cors from 'cors';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { requestContext } from './middleware/requestContext.js';
import { appRouter } from './routes/index.js';

const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug'
});

export const app = express();

app.disable('x-powered-by');
app.use(requestContext);
app.use(pinoHttp({
  logger,
  customProps: (_request: Request, response: Response) => ({
    requestId: response.locals.requestId
  })
}));
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_ORIGIN
}));
app.use(express.json({ limit: '1mb' }));
app.use(apiRateLimiter);
app.use(appRouter);
app.use(notFoundHandler);
app.use(errorHandler);
