import { describe, it, expect } from 'vitest';
import { logger } from './logger';

describe('Web Structured Logger', () => {
  it('exports a valid pino logger instance for Next.js', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });
});
