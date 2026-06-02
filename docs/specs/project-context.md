---
project_name: 'Greenfield'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2026-05-17'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality_rules', 'workflow_rules', 'critical_rules']
status: 'finalizing'
rule_count: 22
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Primary Technologies:** Node.js (Latest LTS), TypeScript (Strict Mode).
- **Architecture Style:** Clean Architecture / Modular Monolith.
- **Key Dependencies:** TBD.
- **Version Constraints:** Always use exact versions in `package.json` (no carets or tildes).

## Critical Implementation Rules

### Language-Specific Rules

- **Strict Typing:** No `any`. Use interfaces for data structures and types for unions/intersections.
- **Functional Patterns:** Prefer `const`, `map`, `filter`, and `reduce`. Minimize side effects in business logic.
- **Async/Await:** All I/O operations must be `async`. Never use `fs.sync` or similar synchronous blocking calls.
- **Error Handling:** Use custom error classes that extend `Error`. Always include a context object in error logs.

### Framework-Specific Rules

- **Dependency Injection:** Use a lightweight DI pattern or container to ensure components are testable.
- **Separation of Concerns:** Keep business logic in "Services" or "Use Cases" and framework-specific code in "Adapters" or "Controllers".
- **Statelessness:** Design components to be stateless wherever possible to simplify scaling.

### Testing Rules

- **Requirement:** 100% test coverage for all logic in `services/` and `utils/`.
- **Organization:** Tests must reside in a `__tests__` folder adjacent to the source file or use the `.test.ts` suffix.
- **Mocks:** Use `jest.mock` or equivalent for all external API and database calls. Never hit a real network in unit tests.

### Code Quality & Style Rules

- **Standard:** Strict adherence to ESLint and Prettier. Run `lint --fix` before every commit.
- **Naming:** 
  - Variables/Functions: `camelCase`
  - Classes/Interfaces: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `kebab-case`
- **Documentation:** Every exported function must have a JSDoc block explaining parameters, return values, and potential exceptions.

### Development Workflow Rules

- **Branching:** `feat/feature-name`, `fix/bug-name`, `chore/task-name`.
- **Commits:** Follow Conventional Commits: `<type>(<scope>): <short summary>`.
- **PRs:** Every PR must include a "Testing Performed" section describing how the change was verified.

### Critical Don't-Miss Rules

- **Security:** Use `dotenv` for environment variables. Never hardcode secrets. Validate all user input using a schema validator (e.g., Zod).
- **Performance:** Avoid O(n^2) operations on large datasets. Use streams for large file processing.
- **Logging:** Use a structured logger (e.g., Pino or Winston). Do not use `console.log` in production code.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.

**For Humans:**
- Keep this file lean and focused on agent needs.
- Update when technology stack changes.

Last Updated: 2026-05-17
