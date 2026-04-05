import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

const backendRoot = process.cwd();
dotenv.config({ path: path.join(backendRoot, '.env') });
dotenv.config({ path: path.join(backendRoot, '.env.local'), override: true });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NASA_API_KEY: z.string().min(1),
  FRONTEND_ORIGIN: z.string().url(),
  NASA_API_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  NASA_CACHE_TTL_APOD_MS: z.coerce.number().int().positive().default(3_600_000),
  NASA_CACHE_TTL_ASTEROIDS_MS: z.coerce.number().int().positive().default(900_000),
  NASA_CACHE_TTL_IMAGES_MS: z.coerce.number().int().positive().default(900_000),
  NASA_CACHE_TTL_EPIC_MS: z.coerce.number().int().positive().default(1_800_000),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(60),
  GOOGLE_AI_API_KEY: z.string().min(1).optional(),
  AI_ENABLED_UNTIL: z.string().optional(),
  AI_RATE_LIMIT_BURST_MAX: z.coerce.number().int().positive().default(2),
  AI_RATE_LIMIT_HOURLY_MAX: z.coerce.number().int().positive().default(8),
  AI_RATE_LIMIT_DAILY_MAX: z.coerce.number().int().positive().default(25)
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
