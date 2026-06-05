---
project_name: 'Greenfield'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2024-05-22'
sections_completed: ['technology_stack']
status: 'complete'
rule_count: 5
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
- **Critical Version Note:** Ensure strict compatibility between Firebase JS SDK and Next.js SSR to prevent hydration mismatches or server-side authentication failures.

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

Last Updated: 2024-05-22
