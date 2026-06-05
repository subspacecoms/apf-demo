---
stepsCompleted: [1]
inputDocuments:
  - docs/specs/plans/prds/prd-Greenfield-2024-05-22/prd.md
  - docs/specs/plans/architecture.md
---

# Greenfield - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Greenfield, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-1.1: Users shall be able to create, edit, and delete tasks.
FR-1.2: Users shall be able to assign one of three priority levels: High, Medium, Low.
FR-1.3: Tasks shall support the CommonMark subset for descriptions.
FR-1.4: Users shall be able to mark tasks as "Complete," moving them to a collapsible "Done" section.
FR-1.5: [ASSUMPTION] Users shall be able to reorder tasks within a project via drag-and-drop or keyboard shortcuts (Alt+Up/Down).
FR-2.1: Users shall be able to create "Projects" to group tasks.
FR-2.2: Navigation between projects shall be via a sidebar that can be toggled/hidden (Ctrl+B or Cmd+B).
FR-2.3: [ASSUMPTION] Users shall be able to archive projects to remove them from the active sidebar.
FR-3.1: Users shall be able to set time-based reminders for tasks.
FR-3.2: All notifications must be triggered and managed by the local OS notification system.
FR-4.1: Users shall be able to export all data to JSON and Markdown formats.
FR-4.2: Users shall be able to import data from a Greenfield-formatted JSON file.
FR-4.3: Data shall be stored in a local SQLite database.
FR-4.4: [ASSUMPTION] Automated local "snapshot" backups of the SQLite database every 24 hours.
FR-5.1: [ASSUMPTION] Provide a "Command Palette" (Ctrl+P or Cmd+P) for keyboard-driven navigation.
FR-5.2: [ASSUMPTION] Support system-native Dark and Light themes.
FR-5.3: [ASSUMPTION] WCAG 2.1 Level AA accessibility and keyboard navigation.

### NonFunctional Requirements

NFR-1.1: App launch time (cold start to interactive state) < 150ms.
NFR-1.2: UI interaction latency < 16ms (60fps).
NFR-2.1: Zero Network Calls. Strictly offline.
NFR-2.2: Auditability and reproducible build process.
NFR-3.1: Multi-platform support: Windows, macOS, and Linux.

### Additional Requirements

- Starter Template: Wails (v2) with React + Vite + TypeScript.
- Initialization Command: `wails init -n greenfield -t react-ts`.
- Backend: Go 1.21+ using a pure-Go SQLite driver (modernc.org/sqlite).
- Frontend: React with Vite; Vitest for testing.
- Privacy constraint: Zero Network Calls must be strictly enforced.

### UX Design Requirements

No dedicated UX document found; UI requirements derived from PRD functional requirements (sidebar, command palette, collapsible sections, theme support).

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->
