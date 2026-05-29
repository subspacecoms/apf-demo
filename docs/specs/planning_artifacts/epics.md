---
stepsCompleted: [1, 2, 3]
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

## Epic 1: Project Foundation & Secure Access

Initialize the technical foundation and secure user access to ensure every task captured is personal and private.

### Story 1.1: Initial Project Scaffolding

As a developer,
I want to initialize the Next.js project with Tailwind CSS and the defined directory structure,
So that I have a consistent foundation for building features.

**Acceptance Criteria:**

**Given** a new repository
**When** I run the initialization commands
**Then** a Next.js 14 App Router project is created with TypeScript and Tailwind CSS
**And** the directory structure follows the feature-based organization (e.g., /app/features)
**And** a basic "Welcome" page is visible on the root route.

### Story 1.2: Database & ORM Setup

As a developer,
I want to configure Drizzle ORM with SQLite,
So that I can persist user tasks and settings in a type-safe manner.

**Acceptance Criteria:**

**Given** an initialized Next.js project
**When** I configure Drizzle ORM and the better-sqlite3 driver
**Then** I can define a `tasks` and `users` schema in `lib/db/schema.ts`
**And** I can run a test migration or query to confirm the SQLite database is connected and writable.

### Story 1.3: Google OAuth Authentication

As a user,
I want to log in using my Google account,
So that my tasks are securely stored and accessible only to me.

**Acceptance Criteria:**

**Given** the application is running
**When** I navigate to the login page and click "Sign in with Google"
**Then** I am redirected to the Google OAuth consent screen
**And** upon successful authentication, I am redirected to the private dashboard
**And** my user session is persisted via NextAuth.js v5.

### Story 1.4: PWA Manifest & Service Worker

As a mobile user,
I want to install the application as a PWA,
So that I can access it quickly from my home screen and use it offline.

**Acceptance Criteria:**

**Given** a configured Next.js project
**When** I add @ducanh2912/next-pwa and configure the manifest
**Then** the browser identifies the site as an installable PWA
**And** a service worker is registered to handle basic offline caching of assets.

### Story 1.5: GCP Deployment Pipeline Scaffolding

As a developer,
I want to automate the deployment to GCP Cloud Run,
So that changes are consistently and safely deployed to production.

**Acceptance Criteria:**

**Given** the project source code
**When** I push a change to the main branch
**Then** a GitHub Action triggers a build of the Docker container
**And** the container is deployed to Google Cloud Run via Cloud Build
**And** the application is accessible at a public GCP URL.
