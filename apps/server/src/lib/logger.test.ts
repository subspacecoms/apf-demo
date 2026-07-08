import { describe, it, expect } from 'vitest';
import { logger, createLogger } from './logger';

describe('GCP Structured Logger', () => {
  it('exports a valid pino logger instance', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('formats log levels with GCP severity labels', () => {
    let output = '';
    const customStream = {
      write: (chunk: string): void => {
        output += chunk;
      },
    };

    const testLogger = createLogger(customStream);
    testLogger.info('Test info message');

    const parsedLog = JSON.parse(output);
    expect(parsedLog.message).toBe('Test info message');
    expect(parsedLog.severity).toBe('INFO');
    expect(parsedLog.time).toBeDefined();
  });

  it('formats error logs with ERROR severity', () => {
    let output = '';
    const customStream = {
      write: (chunk: string): void => {
        output += chunk;
      },
    };

    const testLogger = createLogger(customStream);
    testLogger.error('Test error message');

    const parsedLog = JSON.parse(output);
    expect(parsedLog.message).toBe('Test error message');
    expect(parsedLog.severity).toBe('ERROR');
  });
});
