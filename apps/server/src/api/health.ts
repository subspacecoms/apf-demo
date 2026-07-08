import { Router, Request, Response } from 'express';
import { createSuccessEnvelope, HealthData } from '@casas-bahia/shared';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  const healthData: HealthData = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    telemetry: {
      active: true,
      exporter: process.env.NODE_ENV === 'production' ? 'gcp-cloud-trace' : 'console',
    },
  };

  res.status(200).json(createSuccessEnvelope(healthData));
});
