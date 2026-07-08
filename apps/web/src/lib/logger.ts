import pino from 'pino';
import { getCurrentTraceId, getCurrentSpanId } from './tracing';

const gcpProject = process.env.GCP_PROJECT_ID || process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'casas-bahia-dev';


export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  messageKey: 'message',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label: string) {
      const severityMap: Record<string, string> = {
        trace: 'DEBUG',
        debug: 'DEBUG',
        info: 'INFO',
        warn: 'WARNING',
        error: 'ERROR',
        fatal: 'CRITICAL',
      };
      return { severity: severityMap[label] || 'INFO' };
    },
    log(object: Record<string, unknown>) {
      const traceId = getCurrentTraceId();
      const spanId = getCurrentSpanId();

      const gcpTraceFields: Record<string, unknown> = {};

      if (traceId) {
        gcpTraceFields['logging.googleapis.com/trace'] = `projects/${gcpProject}/traces/${traceId}`;
        gcpTraceFields['traceId'] = traceId;
      }
      if (spanId) {
        gcpTraceFields['logging.googleapis.com/spanId'] = spanId;
        gcpTraceFields['spanId'] = spanId;
      }

      return {
        ...object,
        ...gcpTraceFields,
      };
    },
  },
});
