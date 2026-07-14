import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 shorten requests per minute per IP
  message: { error: 'Too many requests, slow down.' },
});