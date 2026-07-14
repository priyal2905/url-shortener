import { Response } from 'express';
import { ShortenerService } from '../services/shortener.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const shortenUrl = async (req: AuthRequest, res: Response): Promise<void> => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    res.status(400).json({ error: 'originalUrl is required' });
    return;
  }
  const shortCode = await ShortenerService.shortenUrl(originalUrl, req.userId ?? null);
  res.status(201).json({ shortCode, shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
};

export const redirectUrl = async (req: AuthRequest, res: Response): Promise<void> => {
  const code = req.params.code as string;
  const originalUrl = await ShortenerService.resolveUrl(code);
  if (!originalUrl) {
    res.status(404).json({ error: 'Short URL not found' });
    return;
  }
  ShortenerService.trackClick(code, req.ip || '', req.get('User-Agent') || '');
  res.redirect(originalUrl);
};