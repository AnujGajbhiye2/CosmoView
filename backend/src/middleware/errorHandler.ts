import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../lib/errors/AppError.js';
import type { ApiErrorResponse } from '../types/api.js';

export const notFoundHandler = (_request: Request, response: Response): void => {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found.'
    }
  } satisfies ApiErrorResponse);
};

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    } satisfies ApiErrorResponse);
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed.',
        details: error.flatten()
      }
    } satisfies ApiErrorResponse);
    return;
  }

  response.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred.'
    }
  } satisfies ApiErrorResponse);
};
