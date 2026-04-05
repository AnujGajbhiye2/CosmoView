import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const rateLimitedResponse = {
  error: {
    code: 'RATE_LIMITED',
    message: 'Too many AI requests. Please slow down and try again shortly.'
  }
};

export const aiRateLimiters = [
  // Burst: max 2 per minute
  rateLimit({
    windowMs: 60_000,
    max: env.AI_RATE_LIMIT_BURST_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitedResponse
  }),
  // Hourly: max 8 per hour
  rateLimit({
    windowMs: 3_600_000,
    max: env.AI_RATE_LIMIT_HOURLY_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitedResponse
  }),
  // Daily: max 25 per day
  rateLimit({
    windowMs: 86_400_000,
    max: env.AI_RATE_LIMIT_DAILY_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitedResponse
  })
];
