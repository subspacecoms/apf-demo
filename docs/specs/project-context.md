---
project_name: 'Jedi Council'
user_name: 'org-owner@the-high-council.com'
date: '2025-01-24'
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
status: 'initialized'
rule_count: 36
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Cloud Provider:** Google Cloud Platform (GCP)
- **Backend:** Go (GoLang) 1.21+
- **Frontend:** Next.js (App Router preferred) with TypeScript
- **Database (NoSQL):** Google Cloud Firestore
- **Database (Relational):** PostgreSQL via Google Cloud SQL
- **Runtime:** Go and Node.js 20.x (LTS)

## Critical Implementation Rules

### Language-Specific Rules

#### Go (Backend)
- **Error Handling**: Explicitly check all errors. Use `%w` for error wrapping to prevent the error chain.
- **Concurrency**: Use channels and goroutines sparingly; ensure goroutines are properly managed and terminated via `context`.
- **Formatting**: Strictly follow `gofmt` and `goimports`.

#### TypeScript & Next.js (Frontend)
- **Type Safety**: No use of `any`. Define interfaces for all API responses and component props.
- **Server Components**: Default to Server Components; use `'use client'` only when client-side interactivity or hooks are required.
- **Import Ordering**: Group imports: React/Next.js, external libraries, internal aliases (`@/`), and local relative paths.

### Framework-Specific Rules

#### Backend (Go + GCP)
- **Database Access**: Use the official `cloud.google.com/go/firestore` for Firestore and `github.com/lib/pq` (or `pgx`) for PostgreSQL.
- **Configuration**: Load configuration from environment variables. Never hardcode GCP Project IDs or credentials.
- **API Design**: Follow RESTful principles. Use JSON for request and response bodies.

#### Frontend (Next.js + Tailwind)
- **Next.js App Router**: Use `layout.tsx` for persistent UI and `page.tsx` for unique route content. 
- **Tailwind CSS**: Use consistent spacing and color palettes as defined in `tailwind.config.ts`.
- **Environment Variables**: Prefix client-side environment variables with `NEXT_PUBLIC_`.

### Testing Rules

#### Go (Backend)
- **Table-Driven Tests**: Preferred for unit tests to ensure all edge cases are covered systematically.
- **Mocking External Services**: Create interfaces for database and API clients to allow for easy mocking in unit tests.
- **Integration Tests**: Place integration tests in a separate directory (e.g., `/internal/integration`) and tag them with `// +build integration`.

#### TypeScript & Next.js (Frontend)
- **React Testing Library**: Focus on testing behavior and accessibility rather than implementation details.
- **File Organization**: Place tests next to the component they test (e.g., `Component.tsx` and `Component.test.tsx`).
- **Data Mocking**: Use consistent mock data structures that match the TypeScript interfaces defined for the project.

### Code Quality & Style Rules

- **Linting**:
  - **Backend**: Use `golangci-lint` with the default set of enabled linters.
  - **Frontend**: Strictly follow the project's `.eslintrc` and `.prettierrc` configurations.
- **Naming Conventions**:
  - **Go**: Use short, descriptive names for local variables (e.g., `ctx`, `err`, `req`).
  - **React/TS**: Component files should use PascalCase (e.g., `UserDashboard.tsx`). Hook files should use camelCase and start with `use` (e.g., `useAuth.ts`).
- **Organization**:
  - Keep functions and components small and focused on a single responsibility.
  - Avoid deeply nested logic; use early returns (guard clauses) to reduce nesting.

### Development Workflow Rules

- **Git Conventions**:
  - **Branch Naming**: `feat/`, `fix/`, `docs/`, or `refactor/` followed by a descriptive name.
  - **Commits**: **MANDATORY** use of [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `chore:`, `refactor:`).
- **CI/CD Patterns**:
  - **Triggers**: Every push to a feature branch must trigger a CI build (linting and testing).
  - **Deployment**: Provide an option for on-demand deployment of feature branches for preview/testing purposes.
  - **Validation**: All Go code must pass `go test ./...` and frontend must pass `npm run build` before merge.
- **Deployment**:
  - **Backend**: Containerized via Docker and deployed to Google Cloud Run.
  - **Frontend**: Next.js optimized build deployed to Google Cloud Run or Firebase Hosting.

### Critical Don't-Miss Rules

- **Anti-Patterns to Avoid**:
  - **Hardcoding**: Never hardcode GCP credentials or API keys. Use Google Secret Manager or environment variables.
  - **Leaking Secrets**: Ensure `.gitignore` explicitly excludes `.env`, `*.pem`, and `service-account-keys.json`.
- **Resource Management**:
  - **Go**: Always use `defer rows.Close()` and `defer resp.Body.Close()` immediately after checking for errors.
  - **Firestore**: Be mindful of read/write costs; avoid unnecessary document fetches in loops.
- **Next.js Hydration**: Ensure components are hydration-safe; avoid using browser-only globals (like `window` or `localStorage`) directly in the component body without checking for `mount`.
- **GCP Compliance**: All resources must be provisioned in the same GCP region (e.g., `us-central1`) to minimize latency and egress costs.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update when the technology stack changes.
- Review quarterly for outdated rules.
- Remove rules that become obvious over time.

Last Updated: 2025-01-24
