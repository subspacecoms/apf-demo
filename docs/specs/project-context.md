---
project_name: 'Globo Listings'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2025-05-17'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality_rules']
status: 'complete'
rule_count: 26
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Frontend:** Next.js (Latest Stable)
- **Backend:** Go (Latest Stable)
- **Database:** PostgreSQL
- **Services:** Firebase (Authentication, Cloud Functions/Hosting)
- **Version Constraints:** Ensure compatibility between Firebase JS SDK and Next.js SSR.

---

## Critical Implementation Rules

### Language-Specific Rules

#### Go
- Follow standard `gofmt` patterns.
- Explicit error handling is mandatory; do not use `panic` for flow control.
- Use context for timeout and cancellation management in API calls.

#### TypeScript/JavaScript
- Use absolute imports with the `@/` prefix.
- Enforce strict typing; avoid the `any` type.
- Use functional components and hooks for all React code.

### Framework-Specific Rules

#### Next.js (App Router)
- Favor Server Components for data fetching to reduce client-side bundle size.
- Use the `app/` directory for routing and layouts.
- Handle loading states using `loading.tsx` files.

#### Firebase
- Initialize Firebase apps using a singleton pattern to prevent multiple initialization errors during Hot Module Replacement (HMR).
- Use Firebase Admin SDK strictly for server-side operations (API routes, Server Components).

### Testing Rules

- **Go:** Use table-driven tests for logic with multiple edge cases. Keep tests in `_test.go` files in the same package.
- **Frontend:** Every new component must have a corresponding `.test.tsx` file using React Testing Library.
- **Integration:** Use a local or containerized PostgreSQL instance for integration tests rather than mocking the database entirely where possible.
- **Firebase:** Use the Firebase Emulator Suite for local testing of Firestore and Auth rules.

### Code Quality & Style Rules

- **Naming Conventions:**
  - React Components: `PascalCase`
  - Functions/Variables: `camelCase`
  - Go Exports: `PascalCase`
  - Files: `kebab-case` for frontend (e.g., `user-profile.tsx`), standard Go patterns for backend.
- **Organization:** Use a feature-based organization. Keep related hooks, components, and types close to the feature they support.
- **Documentation:** Use TSDoc/JSDoc for complex frontend logic and standard Go doc comments for exported backend functions.

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

Last Updated: 2025-05-17
