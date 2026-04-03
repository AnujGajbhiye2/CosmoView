import { z } from 'zod';

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD date.');

export const apodQuerySchema = z.object({
  date: isoDateSchema.optional()
});

export const asteroidsQuerySchema = z.object({
  startDate: isoDateSchema,
  endDate: isoDateSchema
}).superRefine((value, ctx) => {
  const start = new Date(`${value.startDate}T00:00:00Z`);
  const end = new Date(`${value.endDate}T00:00:00Z`);
  const diffDays = Math.floor((end.getTime() - start.getTime()) / 86_400_000);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Dates must be valid ISO dates.'
    });
    return;
  }

  if (end < start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'endDate must be on or after startDate.'
    });
  }

  if (diffDays > 7) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'NeoWs feed supports a maximum range of 7 days.'
    });
  }
});

export const imageSearchQuerySchema = z.object({
  q: z.string().trim().min(2),
  page: z.coerce.number().int().positive().default(1),
  mediaType: z.literal('image').default('image')
});

export const epicQuerySchema = z.object({
  date: isoDateSchema
});
