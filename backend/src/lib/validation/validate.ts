import type { ZodTypeAny, infer as Infer } from 'zod';
import { AppError } from '../errors/AppError.js';

export const validate = <TSchema extends ZodTypeAny>(schema: TSchema, value: unknown): Infer<TSchema> => {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new AppError('Validation failed.', {
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      details: result.error.flatten()
    });
  }

  return result.data;
};
