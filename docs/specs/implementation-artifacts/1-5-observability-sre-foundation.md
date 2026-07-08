# Story 1.5: Observability & SRE Foundation

Status: done


## Story

As an SRE,
I want the application to export telemetry data and structured logs,
so that we can monitor system health, trace cross-service requests, and track latency and error rates in GCP Cloud Logging and Cloud Trace in real-time.

## Acceptance Criteria

1. **OpenTelemetry Tracing Integration (AC1):**
   - **Given** the running Next.js (`apps/web`) storefront and Express (`apps/server`) API services,
   - **When** HTTP requests are processed (inbound or outbound between services),
   - **Then** OpenTelemetry (OTel) Node.js SDK automatically instruments HTTP/HTTPS requests and exports traces to GCP Cloud Trace in production (or stdout/console trace exporter during local development).

2. **GCP-Compatible Structured Cloud Logging (AC2):**
   - **Given** the Express API and Next.js applications,
   - **When** log messages are emitted at any severity level (`INFO`, `WARN`, `ERROR`, `DEBUG`),
   - **Then** logs are output as structured JSON objects containing `timestamp` (ISO 8601), `severity`, `trace` (`projects/${GCP_PROJECT}/traces/${TRACE_ID}`), `spanId`, and contextual payload metadata compliant with GCP Cloud Logging standards.

3. **Express Global Error & Telemetry Middleware (AC3):**
   - **Given** an unhandled exception or API error occurring within `apps/server`,
   - **When** the error reaches Express middleware,
   - **Then** the error handler logs structured error details (including stack trace and active OTel trace ID), increments error telemetry, and returns a standard JSON response envelope: `{ "success": false, "data": null, "error": { "code": "INTERNAL_SERVER_ERROR", "message": "User-friendly message" } }` with appropriate HTTP status code (5xx / 4xx).

4. **Health & Telemetry Endpoint (AC4):**
   - **Given** the Express API server,
   - **When** a GET request is sent to `/api/v1/health`,
   - **Then** it returns an HTTP 200 OK response with a standard JSON envelope containing service status (`ok`), uptime, timestamp, and active telemetry export status.

5. **Terraform GCP Cloud Monitoring & Alerting (AC5):**
   - **Given** the IaC repository in `infra/terraform`,
   - **When** Terraform is applied,
   - **Then** a Cloud Monitoring dashboard is provisioned alongside Alerting Policies for HTTP 5xx error rate (> 1% threshold) and p95 latency (> 2.5 seconds threshold).

## Tasks / Subtasks

- [x] **Task 1: OpenTelemetry SDK & Tracing Setup** (AC: #1)
  - [x] 1.1 Add `@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations-node`, `@google-cloud/opentelemetry-cloud-trace-exporter`, and `@opentelemetry/api` to `apps/server` and `apps/web` package dependencies.
  - [x] 1.2 Create `apps/server/src/lib/tracing.ts` to initialize OTel SDK before any other module imports.
  - [x] 1.3 Create `apps/web/src/lib/tracing.ts` or Next.js `instrumentation.ts` to initialize tracing for server-side Next.js routes.
  - [x] 1.4 Ensure W3C Trace Context propagation (`traceparent` header) across Next.js -> Express HTTP calls.

- [x] **Task 2: Structured Cloud Logging Implementation** (AC: #2)
  - [x] 2.1 Implement structured logger in `apps/server/src/lib/logger.ts` (using Pino or Winston) formatted for GCP Cloud Logging with traceId / spanId extraction.
  - [x] 2.2 Implement request-logging middleware in `apps/server/src/middleware/request-logger.ts` capturing method, path, status, duration, and user-agent.
  - [x] 2.3 Implement structured logger in `apps/web/src/lib/logger.ts` for Next.js server-side logging.

- [x] **Task 3: Express Error Handler & Health Endpoint** (AC: #3, #4)
  - [x] 3.1 Create/enhance global error handler in `apps/server/src/middleware/error-handler.ts` enforcing standard JSON envelope and trace ID attachment.
  - [x] 3.2 Create Zod schema for health check in `packages/shared/src/schemas/telemetry.ts`.
  - [x] 3.3 Implement `/api/v1/health` route in `apps/server/src/api/health.ts`.

- [x] **Task 4: Terraform Cloud Monitoring & Alerting IaC** (AC: #5)
  - [x] 4.1 Create Terraform module `infra/terraform/modules/monitoring/main.tf` defining GCP Cloud Monitoring dashboard (Cloud Run latency, request volume, 5xx errors).
  - [x] 4.2 Define `google_monitoring_alert_policy` resources for high error rates and high latency.

- [x] **Task 5: Unit & Integration Testing** (AC: #1, #2, #3, #4)
  - [x] 5.1 Add unit tests for logger and tracing helper in `apps/server/src/lib/logger.test.ts`.
  - [x] 5.2 Add integration tests for `/api/v1/health` and error middleware in `apps/server/tests/health.test.ts` using Vitest and Supertest.

### Review Findings

- [x] [Review][Patch] Create Next.js `instrumentation.ts` to initialize OpenTelemetry SDK for server-side Next.js routes [`apps/web/src/instrumentation.ts`:1]
- [x] [Review][Patch] Add graceful shutdown handler (`shutdownTracing()`) in Express server for SIGTERM/SIGINT signals [`apps/server/src/main.ts`:34]
- [x] [Review][Patch] Enhance GCP Project ID environment variable resolution in structured loggers [`apps/server/src/lib/logger.ts`:4]
- [x] [Review][Defer] Root Terraform module invocation for monitoring module — deferred to IaC deployment pipeline story


## Dev Notes

### Architecture Patterns & Guardrails

1. **Standard API Response Envelope:**
   All Express API responses (including error and health endpoints) MUST adhere to:
   - Success: `{ "success": true, "data": T, "error": null }`
   - Error: `{ "success": false, "data": null, "error": { "code": string, "message": string } }`

2. **OpenTelemetry Initialization Order:**
   - **CRITICAL:** `tracing.ts` MUST be imported/required before any HTTP server (Express, Next.js), database client, or external library is loaded. In Express, import `tracing.ts` as the very first line of `apps/server/src/main.ts` or use Node `-r ./dist/lib/tracing.js`.

3. **GCP Cloud Logging Format:**
   Structured JSON logs must map to GCP special fields:
   - `severity`: `'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'`
   - `logging.googleapis.com/trace`: `projects/${GCP_PROJECT}/traces/${traceId}`
   - `logging.googleapis.com/spanId`: `spanId`
   - `message` or `msg`: Human-readable log string.

4. **Strict TypeScript & Zod Boundaries:**
   - Enable strict mode (`strict: true`). Explicit return types for all functions/middleware.
   - Use Zod schema in `packages/shared/src/schemas/telemetry.ts` to validate health response.

### Source Tree Components to Touch

```text
casas-bahia-portal/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── logger.ts
│   │   │   │   └── tracing.ts
│   │   │   └── instrumentation.ts
│   └── server/
│       ├── src/
│       │   ├── api/
│       │   │   └── health.ts
│       │   ├── lib/
│       │   │   ├── logger.ts
│       │   │   ├── logger.test.ts
│       │   │   └── tracing.ts
│       │   ├── middleware/
│       │   │   ├── error-handler.ts
│       │   │   └── request-logger.ts
│       │   └── main.ts
│       └── tests/
│           └── health.test.ts
├── packages/
│   └── shared/
│       └── src/
│           └── schemas/
│               └── telemetry.ts
└── infra/
    └── terraform/
        └── modules/
            └── monitoring/
                ├── main.tf
                ├── variables.tf
                └── outputs.tf
```

### References

- [Architecture Decision Document](file:///usr/local/google/home/sumeetsing/workspace/apf-demo/.agents/worktrees/1-5/docs/specs/plans/architecture.md#L44-L51)
- [Project Context & Rules](file:///usr/local/google/home/sumeetsing/workspace/apf-demo/.agents/worktrees/1-5/docs/specs/project-context.md#L48-L54)
- [Epic 1 Breakdown](file:///usr/local/google/home/sumeetsing/workspace/apf-demo/.agents/worktrees/1-5/docs/specs/plans/epics.md#L144-L154)

## Dev Agent Record

### Agent Model Used

Gemini Next

### Debug Log References

N/A

### Completion Notes List

- Comprehensive story created and implemented for Story 1.5 Observability & SRE Foundation.
- Implemented OpenTelemetry Node.js SDK tracing in Express (`apps/server`) and Next.js (`apps/web`) with trace context propagation.
- Implemented GCP Cloud Logging structured logger using Pino with active trace ID and span ID correlation (`logging.googleapis.com/trace`, `severity`).
- Created Express request logging middleware and global error handling middleware with standard API response envelopes.
- Created shared Zod schemas for telemetry and health check response in `@casas-bahia/shared`.
- Implemented `/api/v1/health` endpoint returning HTTP 200 with uptime, timestamp, and active telemetry status.
- Created Terraform GCP Cloud Monitoring dashboard and Alerting Policies for 5xx error rate (>1%) and p95 latency (>2.5s).
- Added unit tests for structured logger and integration tests for health endpoint and error handling (100% test pass rate across monorepo).

### File List

- `package.json`
- `tsconfig.base.json`
- `packages/shared/package.json`
- `packages/shared/tsconfig.json`
- `packages/shared/src/index.ts`
- `packages/shared/src/schemas/telemetry.ts`
- `apps/server/package.json`
- `apps/server/tsconfig.json`
- `apps/server/src/main.ts`
- `apps/server/src/lib/tracing.ts`
- `apps/server/src/lib/logger.ts`
- `apps/server/src/lib/logger.test.ts`
- `apps/server/src/middleware/request-logger.ts`
- `apps/server/src/middleware/error-handler.ts`
- `apps/server/src/api/health.ts`
- `apps/server/tests/health.test.ts`
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/src/lib/tracing.ts`
- `apps/web/src/lib/logger.ts`
- `apps/web/src/lib/logger.test.ts`
- `apps/web/src/instrumentation.ts`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`
- `infra/terraform/modules/monitoring/main.tf`
- `infra/terraform/modules/monitoring/variables.tf`
- `infra/terraform/modules/monitoring/outputs.tf`
