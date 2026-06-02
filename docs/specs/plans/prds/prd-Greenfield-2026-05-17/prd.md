---
title: Greenfield PRD
status: draft
created: 2026-05-17
updated: 2026-05-17
---

# Greenfield PRD

## Executive Summary
Greenfield is a local-first, open-source To Do application for privacy-conscious individuals and minimalists. It eliminates the "Cloud Tax" by operating entirely on-device with no accounts, no syncing, and no telemetry. The goal is to provide a near-instant, auditable sanctuary for task management where user agency and data sovereignty are paramount.

## Vision & Goals
- **Vision:** To become the gold standard for "sovereign utilities," proving that high-end software doesn't require a cloud backend.
- **Goals:**
    - Deliver sub-150ms application launch times.
    - Ensure 100% data privacy via a strictly offline architecture.
    - Build a community-vetted, open-source tool that respects user focus.

## Personas
1. **The Privacy Advocate (P1):** Needs absolute assurance that sensitive task descriptions (legal, journalistic, or personal) never leave the device.
2. **The Flow-State Minimalist (P1):** Needs a "zero-latency" interface that disappears into the background of their work.
3. **The High-Security Professional (P2):** Works in environments where cloud-connected tools are a liability or prohibited.

## User Journeys
### UJ-1: The Zero-Setup Start
*   **Context:** User downloads Greenfield and wants to record a task immediately.
*   **Journey:**
    1. User opens the application.
    2. User is presented immediately with an empty task list (no login, no "Welcome" wizard).
    3. User types a task and hits Enter.
    4. Task is saved locally and displayed.
*   **Outcome:** Task is recorded in < 2 seconds from cold start.

### UJ-2: The Weekly Data Audit/Backup
*   **Context:** User wants to ensure their data is portable or backed up manually.
*   **Journey:**
    1. User navigates to Settings/Storage.
    2. User selects "Export to Markdown."
    3. User chooses a local directory.
    4. Greenfield generates a human-readable file of all tasks and priorities.
*   **Outcome:** User has a portable, non-proprietary copy of their data.

## Features & Functional Requirements

### 1. Task Management
- **FR-1.1:** Users shall be able to create, edit, and delete tasks.
- **FR-1.2:** Users shall be able to assign one of three priority levels: High, Medium, Low.
- **FR-1.3:** `[ASSUMPTION]` Tasks shall support basic Markdown for descriptions (bold, italics, links).
- **FR-1.4:** Users shall be able to mark tasks as "Complete," moving them to a collapsible "Done" section.

### 2. Organization
- **FR-2.1:** Users shall be able to create "Folders" or "Projects" to group tasks.
- **FR-2.2:** `[ASSUMPTION]` Navigation between folders shall be via a simple sidebar that can be toggled/hidden.

### 3. Notifications & Reminders
- **FR-3.1:** Users shall be able to set time-based reminders for tasks.
- **FR-3.2:** All notifications must be triggered and managed by the local OS (no push notifications from servers).

### 4. Data Portability (The Exit Strategy)
- **FR-4.1:** Users shall be able to export all data to JSON and Markdown formats.
- **FR-4.2:** Users shall be able to import data from a Greenfield-formatted JSON or Markdown file.
- **FR-4.3:** `[ASSUMPTION]` Data shall be stored in a local SQLite database or a plain-text file structure to ensure it is human-readable even without the app.

## Non-Functional Requirements

### 1. Performance
- **NFR-1.1:** App launch time (cold start) must be < 150ms.
- **NFR-1.2:** UI interaction latency (typing, switching folders) must be < 16ms (60fps).

### 2. Privacy & Security
- **NFR-2.1:** Zero Network Calls. The application must not initiate any network requests (no telemetry, no update checks unless explicitly triggered by user, no gravatar fetches).
- **NFR-2.2:** Auditability. The codebase must be structured to allow easy verification of NFR-2.1 by third-party auditors.

### 3. Portability
- **NFR-3.1:** Cross-platform support for Windows, macOS, and Linux.

## Success Metrics
- **Performance Benchmarks:** Consistent achievement of < 150ms launch times across supported platforms.
- **Community Trust:** 0 network leaks identified in community audits.
- **Adoption:** High GitHub/GitLab star count and active community contributions.

## Open Questions
- **Q1:** Should we support local image attachments? This impacts performance and storage complexity.
- **Q2:** How do we handle application updates without a "phone-home" mechanism? (Perhaps a manual "Check for Updates" button or distribution via package managers like Homebrew/Flatpak).
- **Q3:** Do we need a "Search" feature in MVP, or does that conflict with the minimalist "one-list" focus?
