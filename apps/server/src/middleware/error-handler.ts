import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';
import { getCurrentTraceId } from '../lib/tracing';
import { createErrorEnvelope } from '@casas-bahia/shared';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
  const message = err.message || 'An unexpected error occurred';
  const traceId = getCurrentTraceId();

  logger.error(
    {
      err: {
        message: err.message,
        stack: err.stack,
        code: errorCode,
      },
      statusCode,
      traceId,
      path: req.originalUrl,
      method: req.method,
    },
    `Unhandled Error: ${err.message}`
  );

  const responseEnvelope = createErrorEnvelope(errorCode, message);
  res.status(statusCode).json(responseEnvelope);
}
