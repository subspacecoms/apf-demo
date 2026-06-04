---
project_name: 'Project Antigravity SDK'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2026-05-17'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'style_rules', 'workflow_rules']
status: 'in-progress'
rule_count: 38
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

*   **Frontend/App:** Next.js (TypeScript)
*   **Backend:** Go (Golang)
*   **Databases:** Postgres (Relational), Firestore (NoSQL)
*   **Project State:** Greenfield (Initial Setup)

## Critical Implementation Rules

### Language-Specific Rules

**TypeScript (Frontend):**
*   **Strict Mode:** Always enable `strict: true` in `tsconfig.json`.
*   **No `any`:** Use of `any` is strictly prohibited. Use `unknown` or define specific interfaces/types.
*   **Functional Patterns:** Prefer functional components and immutable data patterns.
*   **Type Imports:** Use `import type` for type-only imports to optimize build bundles.
*   **Schema Validation:** Use Zod for all API response and form validation to ensure type safety at runtime.

**Go (Backend):**
*   **Error Handling:** Never ignore errors. Use `if err != nil { return ... }`. Wrap errors with `%w` for context.
*   **Composition over Inheritance:** Use structs and interfaces; avoid deep nesting.
*   **Concurrency:** Manage goroutine lifecycles using `context.Context`. Avoid "naked" goroutines without shutdown handling.
*   **Interface Placement:** Define interfaces where they are *consumed*, not where they are implemented (Go proverb).
*   **Standard Library:** Prefer the standard library for HTTP/JSON before reaching for external frameworks.

### Framework-Specific Rules

**Next.js (App Router):**
*   **Server Components First:** Default to React Server Components (RSC). Only use `'use client'` when interactivity (hooks, event listeners) is strictly required.
*   **Data Fetching:** Fetch data directly in Server Components using `async/await`. Avoid `useEffect` for initial data fetching.
*   **API Routes:** Place route handlers in `app/api/[route]/route.ts`. Use standard Web Request/Response objects.
*   **Metadata API:** Use the `generateMetadata` function or static `metadata` object for SEO; do not use `<Head>` components.

**Go (Backend Services):**
*   **Middleware Pattern:** Use a standard `func(http.Handler) http.Handler` signature for all middleware.
*   **Dependency Injection:** Pass dependencies (DB, Logger) explicitly to handlers via struct injection or constructor functions; avoid global state.
*   **Graceful Shutdown:** All services must listen for `SIGINT`/`SIGTERM` and shut down the HTTP server and DB connections gracefully.

### Testing Rules

**Frontend (Vitest / Testing Library):**
*   **Component Testing:** Prefer testing behavior (what the user sees) over implementation details (internal state).
*   **Hook Testing:** Use `renderHook` for complex custom hooks; keep hook logic pure and easy to test.
*   **Mocking:** Use MSW (Mock Service Worker) for network-level mocking instead of manual fetch mocks.

**Backend (Go Testing):**
*   **Table-Driven Tests:** Use table-driven tests for all logic-heavy functions to ensure edge case coverage.
*   **Integration Tests:** Use `testcontainers-go` for Postgres and Firestore integration tests to avoid manual DB setup.
*   **Concurrency Tests:** Use the `-race` flag during test execution to catch data races early.
*   **Interfaces for Mocks:** Ensure logic depends on interfaces so they can be easily mocked using `gomock` or manual stubs.

### Code Quality & Style Rules

**General Conventions:**
*   **Naming:** Use `kebab-case` for file names and `PascalCase` for React components. For Go, use `camelCase` for internal and `PascalCase` for exported identifiers.
*   **DRY vs AHA:** Avoid Premature Abstraction. Prefer "Avoid Hasty Abstractions" (AHA) — let a pattern emerge before abstracting.
*   **Comments:** Use comments to explain *why* something is done, not *what* is being done. Code should be self-documenting for the "what".

**Frontend Specific:**
*   **Barrel Imports:** Avoid barrel files (`index.ts`) as they can lead to circular dependencies and slower build times in Next.js.
*   **Component Structure:** One component per file. Move sub-components to a `components/` sub-directory if they are specific to a page.

**Backend Specific:**
*   **Small Packages:** Keep Go packages small and focused on a single responsibility.
*   **Receiver Naming:** Use short, consistent names for method receivers (e.g., `s` for `Service`).

### Development Workflow Rules

**Git & Version Control:**
*   **Branch Naming:** Use `feat/`, `fix/`, `docs/`, or `refactor/` prefixes (e.g., `feat/auth-implementation`).
*   **Commit Messages:** Follow Conventional Commits (e.g., `feat(ui): add primary button component`).
*   **Small PRs:** Keep PRs focused on a single logical change. If a task is large, break it into multiple PRs.

**Deployment & Environment:**
*   **Environment Variables:** Never hardcode secrets. Use `.env.example` to document required variables.
*   **Build Check:** Always run `npm run build` or `go build` locally before pushing to ensure no build-breaking changes.
*   **Database Migrations:** All schema changes must be handled via migration files in `/migrations`. Never apply manual changes to the database.

### Critical Don't-Miss Rules
_To be defined_

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-05-17
