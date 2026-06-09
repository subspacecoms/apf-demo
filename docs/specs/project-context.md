---
project_name: 'Brownfield'
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
    'critical_rules',
  ]
status: 'complete'
rule_count: 26
optimized_for_llm: true
---

# Project Context for AI Agents

*This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss.*

---

## Technology Stack & Versions

- **Frontend:** Next.js (App Router)
- **Backend:** Go (Golang)
- **Authentication:** Firebase (Client & Admin SDK)
- **Database:** PostgreSQL
- **Testing:** React Testing Library (Frontend), Go internal testing (Backend)

## Critical Implementation Rules

### Language-Specific Rules

**Go (Backend):**
- **Error Handling:** Explicit checks required. Use `fmt.Errorf("...: %w", err)` to preserve the error chain.
- **Concurrency:** Prefer channels over shared memory. All long-running processes must respect `ctx.Done()`.
- **Interfaces:** Define interfaces where they are used (consumer-side) rather than where they are implemented.

**TypeScript (Frontend):**
- **Type Safety:** No `any`. Use discriminated unions for complex state/responses.
- **Modern Syntax:** Prefer `async/await`. Use Optional Chaining (`?.`) and Nullish Coalescing (`??`) for cleaner null checks.

### Framework-Specific Rules

**Next.js (App Router):**
- **Architecture:** Default to Server Components. Colocate components, hooks, and types within the feature folder.
- **Data:** Use `fetch` with Next.js extended options (tags/revalidation).
- **Forms:** Prefer Server Actions over client-side API calls for simple mutations.

**Firebase:**
- **Identity:** Always extract and verify the UID from the Firebase Token in the backend context.
- **Client Side:** Use `onAuthStateChanged` to manage local UI state only.

### Testing Rules

**Go (Backend):**
- **Style:** Use table-driven tests for all business logic.
- **Naming:** Test functions must be descriptive (e.g., `TestCalculateTotal_DiscountApplied`).
- **Dependencies:** Use interfaces for dependency injection to facilitate easy mocking.

**Frontend:**
- **Strategy:** Prioritize Integration tests over high-unit-test-coverage for UI.
- **Tools:** Use Vitest/Jest with React Testing Library. Mock API calls using MSW (Mock Service Worker) if applicable.

### Code Quality & Style Rules

- **Naming:** 
  - TS/JS: `kebab-case` files, `PascalCase` components, `camelCase` variables.
  - Go: `snake_case` files, `PascalCase` for exports, `camelCase` for internals.
- **Organization:** Group by feature rather than type (e.g., put `AuthButton.tsx` and `useAuth.ts` in the same feature folder).
- **Linting:** Code must pass `golangci-lint` (backend) and `eslint` (frontend) without warnings.
- **Documentation:** Use JSDoc for complex TS functions and standard Go doc comments for exported symbols.

### Development Workflow Rules

- **Branching:** Descriptive branch names required (e.g., `feat/feature-name`, `fix/issue-id`).
- **Commits:** Mandatory use of Conventional Commits format.
- **PRs:** No PR should be submitted with linting errors or failing tests. Provide a clear description of changes and links to relevant tasks.
- **Deployment:** The backend must be deployable independently of the frontend. Ensure backwards compatibility for API changes during transition periods.

### Critical Don't-Miss Rules

- **Security:** Always verify Firebase ID tokens in the backend context. Never hardcode secrets; use environment variables.
- **Anti-Pattern:** Avoid using the Firebase Client SDK for direct database writes if those writes require business logic validation—route them through the Go API.
- **Concurrency:** In Go, never start a goroutine without a way to stop it (leaked goroutines). Use `context.WithCancel` or `context.WithTimeout`.
- **State:** In Next.js, do not use `localStorage` for authentication state; rely on the Firebase Auth cookie/token and Server Components for initial state.

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
