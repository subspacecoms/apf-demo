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
    [SEMRESATTRS_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'casas-bahia-web',
  }),
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
});

export function initTracing(): void {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      sdk.start();
    } catch (error) {
      console.warn('OTel Web SDK initialization note:', error);
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
