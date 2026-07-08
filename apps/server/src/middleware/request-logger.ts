import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const { method, originalUrl, headers } = req;
    const statusCode = res.statusCode;
    const userAgent = headers['user-agent'] || 'unknown';

    const logPayload = {
      httpRequest: {
        requestMethod: method,
        requestUrl: originalUrl,
        status: statusCode,
        userAgent,
        latency: `${durationMs / 1000}s`,
      },
      durationMs,
    };

    if (statusCode >= 500) {
      logger.error(logPayload, `HTTP ${method} ${originalUrl} ${statusCode} in ${durationMs}ms`);
    } else if (statusCode >= 400) {
      logger.warn(logPayload, `HTTP ${method} ${originalUrl} ${statusCode} in ${durationMs}ms`);
    } else {
      logger.info(logPayload, `HTTP ${method} ${originalUrl} ${statusCode} in ${durationMs}ms`);
    }
  });

  next();
}
