import { z } from 'zod';

export const HealthDataSchema = z.object({
  status: z.literal('ok'),
  uptime: z.number(),
  timestamp: z.string(),
  telemetry: z.object({
    active: z.boolean(),
    exporter: z.string(),
  }),
});

export type HealthData = z.infer<typeof HealthDataSchema>;

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const HealthResponseEnvelopeSchema = z.object({
  success: z.literal(true),
  data: HealthDataSchema,
  error: z.null(),
});

export type HealthResponseEnvelope = z.infer<typeof HealthResponseEnvelopeSchema>;

export function createSuccessEnvelope<T>(data: T) {
  return {
    success: true as const,
    data,
    error: null,
  };
}

export function createErrorEnvelope(code: string, message: string) {
  return {
    success: false as const,
    data: null,
    error: {
      code,
      message,
    },
  };
}
