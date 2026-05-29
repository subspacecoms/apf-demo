---
stepsCompleted: [1, 2]
inputDocuments:
  - docs/specs/planning_artifacts/prds/prd-Project-Antigravity-2025-01-24/prd.md
  - docs/specs/planning_artifacts/architecture.md
---

# Project Antigravity - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Project Antigravity, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: NLP Task Parsing - The system must extract date, time, priority, and project/tags from a single string.
FR2: Inline Feedback - The system must provide visual confirmation of parsed entities as the user types with < 100ms latency.
FR3: Daily Plan Generation - The system suggests a subset of tasks (max 5) for the "Daily Plan" based on urgency and user-defined "Deep Work" windows.
FR4: Behavioral Learning (v1) - The system tracks when tasks are completed versus deferred to improve future suggestions.
FR5: Focus Mode Toggle - The user can enter a mode where only the "current" task is visible, removing navigation and other list items.
FR6: Multi-Device Sync (Web/PWA) - Tasks added via mobile PWA appear on the Web dashboard in < 2 seconds.

### NonFunctional Requirements

NFR1: Task Capture Speed - Average time from opening app to task creation < 5 seconds.
NFR2: UI Performance - Entity highlighting updates with < 100ms latency.
NFR3: Sync Performance - Multi-device sync latency < 2 seconds.
NFR4: Reliability - Support for offline task capture via PWA with reliable background synchronization.
NFR5: Usability - Minimalist, zero-friction "command-line style" interface.

### Additional Requirements

- Starter Template: Next.js 14 (App Router), Tailwind CSS, Drizzle ORM (SQLite), Vercel AI SDK (Gemini), and @ducanh2912/next-pwa.
- Authentication: NextAuth.js v5 using Google OAuth.
- Data Strategy: Server-First with an offline queue managed by Dexie.js (IndexedDB).
- State Management: Zustand for global task filtering and Focus Mode state.
- API Patterns: Next.js Server Actions for CRUD; AI streaming via Vercel AI SDK.
- Infrastructure: GCP Cloud Run with Google Cloud Build CI/CD.
- Secret Management: GCP Secret Manager for API keys and Auth secrets.

### UX Design Requirements

(No separate UX Design document provided. Requirements extracted from PRD UJ-1 and UJ-2)
UX-DR1: Command-line style input field as the focal point of the interface.
UX-DR2: Real-time visual confirmation (highlighting) of parsed entities (dates, tags, priorities) during input.
UX-DR3: Focus Mode UI that eliminates all distractions except the current active task.
UX-DR4: Dashboard view for "Morning Planning" with a wizard-like "Plan My Day" experience.

### FR Coverage Map

FR1: Epic 2 - High-Velocity Task Capture
FR2: Epic 2 - High-Velocity Task Capture
FR3: Epic 4 - Intelligent Planning & Focus Mode
FR4: Epic 4 - Intelligent Planning & Focus Mode
FR5: Epic 4 - Intelligent Planning & Focus Mode
FR6: Epic 3 - Reliable Persistence & Multi-Device Sync

## Epic List

### Epic 1: Project Foundation & Secure Access
Initialize the technical foundation and secure user access to ensure every task captured is personal and private.
**FRs covered:** Prerequisites for all FRs.

### Epic 2: High-Velocity Task Capture
Enable users to dump thoughts instantly via a command-line interface with real-time AI feedback.
**FRs covered:** FR1, FR2.

### Epic 3: Reliable Persistence & Multi-Device Sync
Ensure tasks are never lost by implementing a reliable SQLite storage layer that works offline and syncs across devices.
**FRs covered:** FR6.

### Epic 4: Intelligent Planning & Focus Mode
Empower users to execute work through predictive daily planning and a distraction-free "Focus Mode."
**FRs covered:** FR3, FR4, FR5.
