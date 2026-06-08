---
project_name: 'Remote Field'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2026-05-17'
sections_completed:
  [
    'technology_stack',
    'language_rules',
    'framework_rules',
    'testing_rules',
    'quality_rules',
    'workflow_rules',
    'anti_patterns',
  ]
status: 'complete'
rule_count: 22
optimized_for_llm: true
---

# Project Context for AI Agents

*This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss.*

---

## Technology Stack & Versions

- **Frontend:** Next.js (App Router preferred)
- **Backend:** Go (Golang)
- **Authentication/Services:** Firebase
- **Database:** PostgreSQL

## Critical Implementation Rules

### Language-Specific Rules

**Go (Backend):**
- **Error Handling:** Always check errors explicitly. Wrap errors with context using `fmt.Errorf("context: %w", err)`.
- **Concurrency:** Use channels for communication; avoid shared memory. Ensure goroutines are context-aware.
- **Interface Usage:** Accept interfaces, return structs. Keep interfaces small and focused.

**TypeScript/JavaScript (Frontend):**
- **Strict Typing:** Use TypeScript's `strict` mode. Avoid `any`; use `unknown` if necessary.
- **Async/Await:** Prefer `async/await` over raw Promises. Use `Promise.allSettled` for parallel operations.
- **Immutability:** Use `const` by default. Use spread operators for state updates.

### Framework-Specific Rules

**Next.js (App Router):**
- **Server Components:** Default to Server Components. Use `'use client'` only when necessary.
- **Data Fetching:** Use `fetch` in Server Components with appropriate caching tags.
- **Routing:** Follow file-system based routing strictly (`layout.tsx`, `page.tsx`).
- **Mutations:** Use Server Actions for data mutations.

**Firebase Integration:**
- **Auth State:** Monitor auth state via `onAuthStateChanged` on the client.
- **Backend Auth:** Verify Firebase ID tokens in the Go backend using the Firebase Admin SDK.
- **Security Rules:** All access must be governed by backend or Firebase security rules.

### Testing Rules

**Go (Backend):**
- **Unit Tests:** Place in same package (e.g., `service_test.go`). Use table-driven tests.
- **Mocking:** Use interfaces to mock external dependencies.

**Frontend:**
- **Component Testing:** Use React Testing Library focusing on user behavior.
- **Mocks:** Use emulators or mocks for Firebase/PostgreSQL during tests.

### Code Quality & Style Rules

- **Naming:** 
  - Frontend: `kebab-case.ts`, `PascalCase.tsx`.
  - Backend: `snake_case.go`.
  - General: `camelCase` for variables/functions.
- **Organization:** Feature-based organization for frontend; `internal` directory for Go.
- **Formatting:** Pass `eslint`/`prettier` (frontend) and `gofmt`/`goimports` (backend).

### Development Workflow Rules

- **Branching:** Use descriptive branch names (e.g., `feat/`, `fix/`).
- **Commits:** Follow conventional commit messages.
- **PRs:** Ensure all tests pass and linting is clean before PR submission.

### Critical Don't-Miss Rules

- **Security:** Never expose Firebase Admin keys or database credentials in client-side code.
- **Performance:** Avoid unnecessary re-renders in React; optimize Go SQL queries to avoid N+1 problems.
- **Anti-Patterns:** Do not bypass the Go backend for database writes; use the backend as the single source of truth.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**
- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review quarterly for outdated rules.

Last Updated: 2026-05-17
