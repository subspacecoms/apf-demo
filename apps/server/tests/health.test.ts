import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/main';
import { HealthResponseEnvelopeSchema } from '@casas-bahia/shared';

describe('GET /api/v1/health & Error Middleware', () => {
  const app = createApp();

  it('returns HTTP 200 with valid health envelope', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.error).toBeNull();
    expect(res.body.data.status).toBe('ok');
    expect(typeof res.body.data.uptime).toBe('number');
    expect(typeof res.body.data.timestamp).toBe('string');
    expect(res.body.data.telemetry.active).toBe(true);

    // Validate with shared Zod schema
    const parseResult = HealthResponseEnvelopeSchema.safeParse(res.body);
    expect(parseResult.success).toBe(true);
  });

  it('handles errors with standard JSON envelope and status code', async () => {
    const res = await request(app).get('/api/v1/test-error');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      data: null,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Test server error',
      },
    });
  });
});
