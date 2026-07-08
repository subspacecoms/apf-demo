import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace, context } from '@opentelemetry/api';

const isProduction = process.env.NODE_ENV === 'production' || process.env.ENABLE_CLOUD_TRACE === 'true';

const traceExporter = isProduction
  ? new TraceExporter()
  : new ConsoleSpanExporter();

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'casas-bahia-server',
  }),
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
});

try {
  sdk.start();
} catch (error) {
  // Graceful fallback for duplicate init in test/dev
  if (process.env.NODE_ENV !== 'test') {
    console.warn('OTel SDK initialization note:', error);
  }
}

export async function shutdownTracing(): Promise<void> {
  try {
    await sdk.shutdown();
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error shutting down OTel SDK:', error);
    }
  }
}

export function getCurrentTraceId(): string | undefined {
  const activeSpan = trace.getSpan(context.active());
  if (activeSpan) {
    const spanContext = activeSpan.spanContext();
    return spanContext.traceId;
  }
  return undefined;
}

export function getCurrentSpanId(): string | undefined {
  const activeSpan = trace.getSpan(context.active());
  if (activeSpan) {
    const spanContext = activeSpan.spanContext();
    return spanContext.spanId;
  }
  return undefined;
}

export { sdk };

