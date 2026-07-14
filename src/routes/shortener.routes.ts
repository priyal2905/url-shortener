import { Router } from 'express';
import { shortenUrl, redirectUrl } from '../controllers/shortener.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { rateLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();
router.post('/shorten', requireAuth, rateLimiter, shortenUrl);
router.get('/:code', redirectUrl);

export default router;