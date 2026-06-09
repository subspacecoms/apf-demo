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
  ]
status: 'in_progress'
rule_count: 22
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
