---
stepsCompleted:
  - Step 1: Validate Prerequisites and Extract Requirements
inputDocuments:
  - docs/specs/plans/prds/prd-Greenfield-2026-05-17/prd.md
  - docs/specs/project-context.md
---

# Greenfield - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Greenfield, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1.1: Users shall be able to create, edit, and delete tasks.
FR1.2: Users shall be able to assign one of three priority levels: High, Medium, Low.
FR1.3: Tasks shall support the CommonMark subset for descriptions (bold, italics, bullet points, and hyperlinks).
FR1.4: Users shall be able to mark tasks as "Complete," moving them to a collapsible "Done" section.
FR2.1: Users shall be able to create "Projects" to group tasks.
FR2.2: Navigation between projects shall be via a sidebar that can be toggled/hidden (Ctrl+B or Cmd+B).
FR3.1: Users shall be able to set time-based reminders for tasks.
FR3.2: All notifications must be triggered and managed by the local OS notification system; the application shall not use external push services.
FR4.1: Users shall be able to export all data to JSON and Markdown formats.
FR4.2: Users shall be able to import data from a Greenfield-formatted JSON file.
FR4.3: Data shall be stored in a local SQLite database to ensure it is both performant and accessible via standard tools.

### NonFunctional Requirements

NFR1.1: App launch time (cold start to interactive state) must be < 150ms.
NFR1.2: UI interaction latency (input processing, switching projects) must be < 16ms (60fps).
NFR2.1: Zero Network Calls. The application must not initiate any network requests. All dependencies must be bundled locally.
NFR2.2: Auditability. The build process must be reproducible, and the codebase must clearly isolate I/O to local storage to facilitate community auditing.
NFR3.1: Support for Windows (10/11), macOS (Intel/Apple Silicon), and Linux (AppImage/Flatpak).

### Additional Requirements

- Primary Technologies: Node.js (Latest LTS), TypeScript (Strict Mode).
- Architecture Style: Clean Architecture / Modular Monolith.
- Data Storage: Local SQLite database (ensuring auditability and performance).
- Security: Use `dotenv` for environment variables. Never hardcode secrets. Validate all user input using a schema validator (e.g., Zod).
- Error Handling: Use custom error classes that extend `Error`. Always include a context object in error logs.
- Logging: Use a structured logger (e.g., Pino or Winston). Do not use `console.log` in production code.
- Strict adherence to ESLint and Prettier.

### UX Design Requirements

UX-DR1: Sidebar toggle support via Ctrl+B (Windows/Linux) or Cmd+B (macOS).
UX-DR2: Markdown support for task descriptions (bold, italics, bullet points, hyperlinks).
UX-DR3: OS-level notification integration for reminders (no external push services).
UX-DR4: Collapsible "Done" section for completed tasks.
UX-DR5: Distraction-free, zero-latency interface.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->
