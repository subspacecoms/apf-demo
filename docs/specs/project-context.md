---
project_name: 'Globo Listings'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2025-05-17'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules']
existing_patterns_found: 0
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
