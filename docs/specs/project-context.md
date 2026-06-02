---
project_name: 'Greenfield'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2026-05-17'
sections_completed: ['technology_stack']
status: 'in-progress'
rule_count: 6
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Primary Technologies:** TBD (Greenfield project).
- **Architecture Style:** TBD.
- **Key Dependencies:** None detected yet.
- **Version Constraints:** Use latest stable versions unless otherwise specified.

## Critical Implementation Rules

### Language-Specific Rules

- **Standard:** Use strict typing for all new code once a language is selected.
- **Pattern:** Prefer functional programming patterns where applicable.

### Framework-Specific Rules

- **Status:** To be defined once frameworks are selected.

### Testing Rules

- **Requirement:** 100% test coverage for critical business logic.
- **Organization:** Keep tests adjacent to the code they test (`*.test.ts` or `test_*.py`).

### Code Quality & Style Rules

- **Standard:** Follow the default linting and formatting rules of the selected language ecosystem (e.g., Prettier/ESLint for JS, Black/Flake8 for Python).

### Development Workflow Rules

- **Branching:** Use descriptive branch names (e.g., `feature/xyz`, `bugfix/abc`).
- **Commits:** Use Conventional Commits format.

### Critical Don't-Miss Rules

- **Security:** Never commit secrets or environment variables.
- **Performance:** Avoid premature optimization but keep complexity O(n) where possible.

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
- Remove rules that become obvious over time.

Last Updated: 2026-05-17
