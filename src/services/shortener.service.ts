import { LinkRepository } from '../repositories/link.repository';
import { ClickEventRepository } from '../repositories/clickEvent.repository';
import { encodeBase62 } from '../utils/base62';
import { redisClient } from '../config/redis';

const CACHE_TTL_SECONDS = 3600; // 1 hour

export const ShortenerService = {
  async shortenUrl(originalUrl: string, userId: number | null): Promise<string> {
    const { id } = await LinkRepository.create(originalUrl, userId);
    const shortCode = encodeBase62(id);
    await LinkRepository.setShortCode(id, shortCode);
    return shortCode;
  },

  async resolveUrl(shortCode: string): Promise<string | null> {
    // 1. Check cache first
    const cached = await redisClient.get(`link:${shortCode}`);
    if (cached) return cached;

    // 2. Cache miss — hit DB
    const link = await LinkRepository.findByCode(shortCode);
    if (!link) return null;

    // 3. Populate cache for next time
    await redisClient.set(`link:${shortCode}`, link.original_url, 'EX', CACHE_TTL_SECONDS);
    return link.original_url;
  },

  // Fire-and-forget analytics — doesn't block the redirect response
  trackClick(shortCode: string, ip: string, userAgent: string): void {
    ClickEventRepository.logClick(shortCode, ip, userAgent).catch((err) => {
      console.error('Failed to log click:', err);
    });
  },
};