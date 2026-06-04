---
project_name: 'Project Antigravity SDK'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2026-05-17'
sections_completed: ['technology_stack', 'language_rules']
status: 'in-progress'
rule_count: 8
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

**Go (Backend):**
*   **Error Handling:** Never ignore errors. Use `if err != nil { return ... }`. Errors should be wrapped with context where appropriate.
*   **Composition over Inheritance:** Use structs and interfaces for code reuse; avoid deep nesting.
*   **Concurrency:** Use goroutines and channels sparingly and only when necessary. Ensure goroutine lifecycles are managed (avoid leaks).
*   **Standard Library:** Prefer the standard library for HTTP handling and basic utilities before reaching for external dependencies.

### Framework-Specific Rules
_To be defined_

### Testing Rules
_To be defined_

### Code Quality & Style Rules
_To be defined_

### Development Workflow Rules
_To be defined_

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
