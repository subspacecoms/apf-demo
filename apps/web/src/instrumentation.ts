import { initTracing } from './lib/tracing';

export async function register(): Promise<void> {
  initTracing();
}
