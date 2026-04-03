import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export const requestContext = (request: Request, response: Response, next: NextFunction): void => {
  const requestId = request.header('x-request-id') ?? randomUUID();
  response.locals.requestId = requestId;
  response.setHeader('x-request-id', requestId);
  next();
};
