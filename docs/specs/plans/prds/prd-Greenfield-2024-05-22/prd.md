---
title: Greenfield PRD
status: draft
created: 2024-05-22
updated: 2024-05-22
---

# Greenfield PRD

## Executive Summary
Greenfield is a local-first, open-source task management application designed for privacy-conscious individuals and minimalists. By operating entirely on-device with zero telemetry, Greenfield eliminates the "Cloud Tax" of mandatory accounts and data extraction. The product provides a near-instant, auditable sanctuary for focus where user agency and data sovereignty are the primary constraints.

## Vision & Goals
- **Vision:** To become the gold standard for "sovereign utilities," proving that high-end software does not require a cloud backend to be powerful or convenient.
- **Goals:**
    - **Speed:** Sub-150ms application launch and <16ms interaction latency.
    - **Privacy:** 100% data privacy via a strictly offline-by-design architecture.
    - **Trust:** A community-vetted, open-source codebase with zero external network dependencies.

## Glossary
| Term | Definition |
| :--- | :--- |
| **Task** | A single unit of work containing a title, priority, and optional description. |
| **Project** | A collection of related Tasks. |
| **Local-First** | An architecture where data is stored primarily on the user's device and the application functions fully without a network connection. |
| **Sovereign Utility** | Software that provides essential utility while ensuring the user has total ownership and control over their data and the tool's behavior. |
| **Release Gate** | A set of quality and functional criteria that must be met before transitioning to the next phase of development or release. |

## Personas
1. **The Privacy Advocate (P1):** Needs absolute assurance that task descriptions never leave the device. Values auditability over convenience.
2. **The Flow-State Minimalist (P1):** Needs a "zero-latency" interface that does not interrupt the cognitive flow of work.
3. **The High-Security Professional (P2):** Operates in air-gapped or high-security environments where cloud-connected tools are prohibited.

## User Journeys
### UJ-1: The Zero-Setup Start
*   **Context:** User downloads Greenfield and wants to record a task immediately.
*   **Journey:**
    1. User opens the application.
    2. User is presented immediately with an empty task list (no login, no onboarding wizard).
    3. User types a task and hits Enter.
    4. Task is saved locally and displayed.
*   **Outcome:** Task is recorded in < 2 seconds from cold start.

### UJ-2: The Weekly Data Audit/Backup
*   **Context:** User wants to ensure their data is portable or backed up manually.
*   **Journey:**
    1. User navigates to Settings > Storage.
    2. User selects "Export to Markdown."
    3. User chooses a local directory.
    4. Greenfield generates a human-readable file of all tasks and priorities.
*   **Outcome:** User has a portable, non-proprietary copy of their data.

## Features & Functional Requirements

### 1. Task Management
- **FR-1.1:** Users shall be able to create, edit, and delete tasks.
- **FR-1.2:** Users shall be able to assign one of three priority levels: High, Medium, Low.
- **FR-1.3:** Tasks shall support the CommonMark subset for descriptions (bold, italics, bullet points, and hyperlinks).
- **FR-1.4:** Users shall be able to mark tasks as "Complete," moving them to a collapsible "Done" section.
- **FR-1.5:** [ASSUMPTION] Users shall be able to reorder tasks within a project via drag-and-drop or keyboard shortcuts (Alt+Up/Down).

### 2. Organization
- **FR-2.1:** Users shall be able to create "Projects" to group tasks.
- **FR-2.2:** Navigation between projects shall be via a sidebar that can be toggled/hidden (Ctrl+B or Cmd+B).
- **FR-2.3:** [ASSUMPTION] Users shall be able to archive projects to remove them from the active sidebar without deleting the contained tasks.

### 3. Notifications & Reminders
- **FR-3.1:** Users shall be able to set time-based reminders for tasks.
- **FR-3.2:** All notifications must be triggered and managed by the local OS notification system; the application shall not use external push services.

### 4. Data Portability & Integrity
- **FR-4.1:** Users shall be able to export all data to JSON and Markdown formats.
- **FR-4.2:** Users shall be able to import data from a Greenfield-formatted JSON file.
- **FR-4.3:** Data shall be stored in a local SQLite database to ensure it is both performant and accessible via standard tools.
- **FR-4.4:** [ASSUMPTION] The application shall perform automated local "snapshot" backups of the SQLite database to a user-defined directory once every 24 hours of use.

### 5. User Interface & Accessibility
- **FR-5.1:** [ASSUMPTION] The application shall provide a "Command Palette" (Ctrl+P or Cmd+P) for keyboard-driven navigation and task creation.
- **FR-5.2:** [ASSUMPTION] The application shall support system-native Dark and Light themes.
- **FR-5.3:** [ASSUMPTION] All UI elements must be navigable via keyboard and compatible with screen readers (WCAG 2.1 Level AA).

## Non-Functional Requirements

### 1. Performance
- **NFR-1.1:** App launch time (cold start to interactive state) must be < 150ms.
- **NFR-1.2:** UI interaction latency (input processing, switching projects) must be < 16ms (60fps).

### 2. Privacy & Security
- **NFR-2.1:** **Zero Network Calls.** The application must not initiate any network requests. All dependencies must be bundled locally.
- **NFR-2.2:** **Auditability.** The build process must be reproducible, and the codebase must clearly isolate I/O to local storage to facilitate community auditing.

### 3. Portability
- **NFR-3.1:** Support for Windows (10/11), macOS (Intel/Apple Silicon), and Linux (AppImage/Flatpak).

## Release Gates

### Gate 1: Alpha (Core Engine & Privacy Proof)
- **Functional:** CRUD for tasks and projects complete.
- **Privacy:** Automated CI check confirms zero network dependencies in bundled assets.
- **Performance:** Interaction latency < 16ms on baseline hardware [ASSUMPTION: Intel i5/8GB RAM].

### Gate 2: Beta (Feature Parity & Portability)
- **Functional:** Markdown support, Reminders, and Import/Export verified.
- **Portability:** Stable builds for Windows, macOS, and Linux produced.
- **Accessibility:** Keyboard navigation audit passed.

### Gate 3: Release Candidate (The "Sovereign" Audit)
- **Security:** 24-hour "Zero Packet" soak test passed with 100% success.
- **Trust:** Reproducible build script verified by 3rd party or community member [ASSUMPTION].
- **Integrity:** Database recovery from "snapshot" backup verified.

## Success Metrics
- **Performance Benchmarks:** 95th percentile launch time < 150ms.
- **Privacy Verification:** 0 network packets sent over 24 hours of active use (verified by automated network monitoring).
- **Portability:** 100% of tasks successfully exported/imported without data loss.

## Open Items & Deferrals
- **Search (Deferred to V1.1):** To maintain the minimalist MVP scope, global search is deferred.
- **Update Strategy (Open):** The update mechanism is deferred to the architecture phase. Preferred paths include OS-level package managers to avoid custom network requests.
- **Image Attachments (Out of Scope for MVP):** To preserve SQLite performance, image attachments are not supported.
