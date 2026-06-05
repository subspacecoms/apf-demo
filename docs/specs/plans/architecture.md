---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - docs/specs/plans/prds/prd-Greenfield-2024-05-22/prd.md
  - docs/specs/project-context.md
workflowType: 'architecture'
project_name: 'Greenfield'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2024-05-22'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The system must support complex local state management for tasks and projects. Key architectural needs include a robust local database schema (SQLite), a Markdown rendering engine, and an OS-native notification bridge. Data portability is a first-class citizen, requiring high-fidelity JSON/Markdown serialization.

**Non-Functional Requirements:**
The "Zero Network" constraint is the primary architectural driver, necessitating that all dependencies be bundled and no telemetry or external auth (like Firebase) be used. Performance targets require an architecture with minimal abstraction overhead.

**Scale & Complexity:**
- Primary domain: Local-First Desktop Application
- Complexity level: Medium
- Estimated architectural components: ~6 (UI Layer, Command Engine, Project/Task Store, Data Export/Import Service, Local Notification Bridge, SQLite Persistence Layer)

### Technical Constraints & Dependencies

- Strictly Offline: No external API calls allowed.
- Local Persistence: SQLite is the mandated storage engine.
- Cross-Platform: Must target Electron or a similar desktop runtime to support Win/Mac/Linux from a single codebase.

### Cross-Cutting Concerns Identified

- **Data Integrity:** Ensuring local backups and export/import don't corrupt the user's "sovereign" data.
- **Privacy Auditability:** Code structure must make it trivial to verify no network code exists.
- **Keyboard-First Interaction:** Architecting the UI layer to support the Command Palette and global shortcuts natively.

## Starter Template Evaluation

### Primary Technology Domain

**Local-First Desktop Application** based on project requirements analysis.

### Starter Options Considered

1.  **Wails (v2) with React + Vite:** High performance, native webview, Go backend.
2.  **Fyne:** Pure Go UI, but non-native appearance.
3.  **Wails (v2) with Next.js (SSG):** Familiar patterns but slightly higher overhead.

### Selected Starter: Wails (v2) with React + Vite + TypeScript

**Rationale for Selection:**
Wails provides the best path to meeting the sub-150ms launch time and <16ms interaction latency targets. Using Go for the backend allows for high-performance SQLite operations without the overhead of a full browser-in-browser environment like Electron.

**Initialization Command:**

```bash
wails init -n greenfield -t react-ts
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
Go 1.21+ (Backend) and TypeScript/React (Frontend).

**Styling Solution:**
Standard CSS (Vite-supported).

**Build Tooling:**
Vite for frontend; Wails CLI for desktop bundling.

**Testing Framework:**
Go testing (Backend) and Vitest (Frontend).

**Code Organization:**
Separation of Go application logic and React frontend assets within a single repository.

**Development Experience:**
Hot reloading for both frontend and backend logic.

**Note:** Project initialization using this command should be the first implementation story.
