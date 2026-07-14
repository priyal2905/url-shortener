import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message, { stack: err.stack, path: req.path });
  res.status(500).json({ error: 'Internal server error' });
};