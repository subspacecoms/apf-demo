---
project_name: 'Casas Bhaia'
user_name: 'accounts.google.com:107764536614723260958'
date: '2024-05-17'
sections_completed: ['technology_stack', 'language_specific_rules', 'framework_specific_rules', 'testing_rules', 'code_quality_rules', 'workflow_rules', 'critical_dont_miss_rules']
existing_patterns_found: 0
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Language**: TypeScript (Strict Mode)
- **Frontend**: Next.js (Latest stable, App Router)
- **Styling**: Tailwind CSS
- **Middleware**: Express.js
- **Database**: PostgreSQL
- **Infrastructure**: 
  - **Production**: Google Cloud SQL
  - **Local Development**: Docker (PostgreSQL container)

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

- **Strict Mode**: `strict: true` must be enabled in `tsconfig.json`. No `any` types allowed.
- **Type Definitions**: Use `interface` for object structures and `type` for unions or aliases.
- **Explicit Returns**: All functions, especially API routes and Express middleware, must have explicit return types.
- **Shared Types**: Maintain a shared `types/` directory at the project root for interfaces used by both Next.js and Express to ensure boundary consistency.
- **Runtime Validation**: Use **Zod** for validating `process.env` and all incoming request data at the API/Middleware boundaries.
- **Imports**: Use absolute imports (e.g., `@/components/...`) as configured in `tsconfig.json`.
- **Naming**: `PascalCase` for types/interfaces; `camelCase` for variables/functions.

### Framework-Specific Rules

#### Next.js (Frontend)
- **App Router Patterns**: Use Server Components by default; use `'use client'` only when interactivity or browser APIs are required.
- **Data Fetching**: Prefer Server Actions or direct database access (if applicable) for data mutations.
- **Component Organization**: Use a `components/` directory structured by domain or feature (e.g., `components/ui`, `components/auth`).
- **SEO**: Utilize the Metadata API for page-specific SEO.

#### Express.js (Middleware/API)
- **Route Handling**: Use Express Routers to modularize the API logic.
- **Error Handling**: Implement a global error-handling middleware to catch and format all errors consistently.
- **Middleware Boundary**: Ensure the Express layer acts as the primary validator (using the Zod rules we established) before hitting the database.
- **Async Handling**: Use a wrapper or `express-async-handler` to handle async/await errors in routes without manual try/catch bloat.

### Testing Rules

- **Unit & Integration Testing**: Use **Vitest**.
- **E2E Testing**: Use **Playwright**.
- **Frontend Testing**: Use **React Testing Library** with Vitest for component testing, focusing on user behavior.
- **API Testing**: Use **Supertest** with Vitest for testing Express routes and middleware.
- **Mocking**: Mock external services (e.g., Cloud SQL) for unit tests; use the **Docker PostgreSQL** container for integration and E2E tests that require a real database.
- **Naming Convention**: Test files must follow the `*.test.ts(x)` pattern and live alongside the code they test.
- **E2E Organization**: Playwright tests should be located in a dedicated `e2e/` directory at the project root.

### Code Quality & Style Rules

- **Linting & Formatting**: Use **ESLint** (Next.js recommended) and **Prettier**.
- **Scalable Folder Structure**:
  - `src/app/`: Next.js Routing and UI composition.
  - `src/features/`: Domain-specific logic (components, hooks, local types).
  - `src/shared/`: Cross-cutting UI components (UI kit), hooks, and utils.
  - `src/server/`: Express API logic, modularized by domain (Routes, Controllers, Services).
  - `src/middleware/`: Shared middleware logic for both Next.js and Express.
  - `types/`: Global, project-wide TypeScript definitions.
- **Naming Conventions**:
  - Components/Files: `kebab-case.tsx` for React components; `camelCase.ts` for logic/utilities.
  - Constants: `UPPER_SNAKE_CASE` for global constants.
- **Documentation**: JSDoc for complex logic; `README.md` in major directories to explain architectural intent.

### Development Workflow Rules

- **Branch Naming**: Use a prefix pattern: `feature/`, `fix/`, `docs/`, or `refactor/` followed by a descriptive name (e.g., `feature/auth-setup`).
- **Commit Messages**: Follow **Conventional Commits** (e.g., `feat: add postgres connection pool`).
- **PR Requirements**: All tests pass, no linting errors, and documentation updated for new features.
- **Local Dev**: Use `docker-compose up` to spin up the PostgreSQL environment before starting the dev server.
- **Deployment**: Next.js and Express backend deployed to **Google Cloud Run**; Database on **Google Cloud SQL**.

### Critical Don't-Miss Rules

- **Anti-Pattern: Hydration Mismatches**: Never use browser-only globals (like `window` or `localStorage`) in Next.js Server Components without checking for existence or using `useEffect` in a Client Component.
- **Anti-Pattern: Secret Leaks**: Never hardcode API keys or Cloud SQL credentials. Always use `process.env` validated by the Zod schema.
- **Security Rule: SQL Injection**: Never use template strings for raw SQL queries. Always use parameterized queries or a type-safe query builder.
- **Performance Gotcha: N+1 Queries**: Avoid fetching data in a loop. Use JOINs or batched queries when interacting with PostgreSQL.
- **Next.js/Express Boundary**: Do not duplicate business logic. If logic is shared between the frontend and the Express middleware, it must live in `src/shared/` or a dedicated service layer.
- **Cloud SQL Connectivity**: Ensure that the Cloud SQL Auth Proxy is correctly configured or that IAM database authentication is used for secure production connections.
