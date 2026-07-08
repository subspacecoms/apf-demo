---
project_name: 'Casas Bhaia'
user_name: 'accounts.google.com:107764536614723260958'
date: '2024-05-17'
sections_completed: ['technology_stack', 'language_specific_rules', 'framework_specific_rules']
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
