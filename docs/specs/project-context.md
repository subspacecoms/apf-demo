---
project_name: 'Casas Bhaia'
user_name: 'accounts.google.com:107764536614723260958'
date: '2024-05-17'
sections_completed: ['technology_stack', 'language_specific_rules']
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
