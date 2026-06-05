---
project_name: 'Greenfield'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2024-05-22'
sections_completed: ['technology_stack', 'architecture_constraints']
existing_patterns_found: 3
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Framework:** Wails v2 (Desktop Application)
- **Frontend:** React, Vite, TypeScript
- **Backend:** Go 1.21+
- **Database:** SQLite (Local Persistence)
- **Target Platforms:** Windows, macOS, Linux (via Wails)

---

## Critical Implementation Rules

### 1. "Zero Network" Policy
- **Strictly Offline:** No external API calls, telemetry, or external authentication providers (e.g., No Firebase).
- **Dependency Audit:** AI agents must not suggest libraries that require an internet connection or external CDN.

### 2. Local-First Architecture
- **SQLite Persistence:** All data must be stored in the local SQLite database.
- **Serialization:** High-fidelity JSON/Markdown serialization is required for data portability.
- **State Management:** Prioritize robust local state management for tasks and projects.

### 3. Wails Bridge Conventions
- Ensure clear separation between Go backend logic and React frontend assets.
- Use the Wails bridge for all communication between the UI and the system.

### 4. User Interaction
- **Keyboard-First:** All UI components should support keyboard shortcuts and the global command palette natively.
- **Performance:** Maintain launch times under 150ms and interaction latency under 16ms.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code.
- Follow the **Zero Network** constraint without exception.
- Use Go for high-performance backend operations and React for the UI.

Last Updated: 2024-05-22
