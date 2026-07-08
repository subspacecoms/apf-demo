import { shutdownTracing } from './lib/tracing';
import express, { Express } from 'express';
import { requestLogger } from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';
import { healthRouter } from './api/health';
import { logger } from './lib/logger';

export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.use('/api/v1', healthRouter);

  // Test error route for integration testing
  if (process.env.NODE_ENV !== 'production') {
    app.get('/api/v1/test-error', (_req, _res, next) => {
      const error = new Error('Test server error');
      next(error);
    });
  }

  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });

  const handleShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await shutdownTracing();
      logger.info('Tracing SDK shut down. Exiting process.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

