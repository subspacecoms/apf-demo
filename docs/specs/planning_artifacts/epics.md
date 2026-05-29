---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - docs/specs/planning_artifacts/prds/prd-Project-Antigravity-2025-01-24/prd.md
  - docs/specs/planning_artifacts/architecture.md
workflowType: 'epics-stories'
status: 'complete'
completedAt: '2025-01-24'
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

## Epic 2: High-Velocity Task Capture

Enable users to dump thoughts instantly via a command-line interface with real-time AI feedback.

### Story 2.1: CLI-style Fast-Entry Bar UI

As a user,
I want a minimalist, command-line style input field,
So that I can capture tasks with zero friction.

**Acceptance Criteria:**

**Given** the user is on the dashboard
**When** the dashboard loads, the input bar is automatically focused
**Then** I can type my task into a clean, distraction-free input field
**And** the input remains the focal point of the interface.

### Story 2.2: Client-side NLP Highlighting (Regex)

As a user,
I want immediate visual confirmation of tags and priorities,
So that I know the system understands my input shorthand.

**Acceptance Criteria:**

**Given** I am typing in the Fast-Entry bar
**When** I type shorthand like `!high`, `#work`, or `@project`
**Then** the text is immediately highlighted in the UI (< 100ms)
**And** the UI visually distinguishes between different entity types (e.g., tags vs. priorities).

### Story 2.3: Gemini-powered Task Parsing (Backend)

As a user,
I want the system to understand natural language dates and priorities,
So that I don't have to manually format my tasks.

**Acceptance Criteria:**

**Given** I have typed a task like "Call Bob tomorrow at 2pm"
**When** I submit the task or pause typing
**Then** the Gemini 1.5 Flash model parses the date, time, and priority from the string
**And** the entities are accurately extracted and ready for persistence.

### Story 2.4: Real-time Feedback Stream

As a user,
I want to see the AI's parsing results as I type,
So that I can verify the categorization in real-time.

**Acceptance Criteria:**

**Given** I am typing in the capture bar
**When** the debounced input is sent to the AI service
**Then** the Vercel AI SDK streams the parsed entity results back to the UI
**And** the UI updates to show the confirmed date, project, and priority alongside the input.

## Epic 3: Reliable Persistence & Multi-Device Sync

Ensure tasks are never lost by implementing a reliable SQLite storage layer that works offline and syncs across devices.

### Story 3.1: Task CRUD via Server Actions

As a user,
I want my tasks to be saved directly to the database,
So that they are persisted across sessions.

**Acceptance Criteria:**

**Given** I have entered a task
**When** I press Enter
**Then** the task is saved to the SQLite database via Drizzle and Next.js Server Actions
**And** the dashboard list updates to include the new task.

### Story 3.2: Local Persistence with IndexedDB (Dexie.js)

As an offline user,
I want my tasks to be saved locally when I have no connection,
So that I never lose a captured thought.

**Acceptance Criteria:**

**Given** I am offline
**When** I enter a task
**Then** the task is immediately saved to the browser's IndexedDB using Dexie.js
**And** the task is marked as "pending sync."

### Story 3.3: Offline Queue & Background Sync

As a user,
I want my offline tasks to sync automatically when I regain internet access,
So that my task list is always up-to-date.

**Acceptance Criteria:**

**Given** pending tasks in my local IndexedDB queue
**When** the internet connection is restored
**Then** the application automatically syncs the pending tasks to the server's SQLite database
**And** the sync happens in the background without interrupting my work.

### Story 3.4: Multi-device Conflict Resolution

As a user with multiple devices,
I want my task list to stay consistent across all platforms,
So that I can manage my tasks from anywhere.

**Acceptance Criteria:**

**Given** I update a task on my mobile device
**When** I open the application on my desktop
**Then** the desktop dashboard shows the updated task state within < 2 seconds
**And** a "last-write-wins" strategy resolves any timestamp conflicts.

## Epic 4: Intelligent Planning & Focus Mode

Empower users to execute work through predictive daily planning and a distraction-free "Focus Mode."

### Story 4.1: Task Prioritization Heuristics (v1)

As a user,
I want the system to suggest which tasks are most urgent,
So that I can focus on what matters.

**Acceptance Criteria:**

**Given** a pool of active tasks
**When** I view my task list
**Then** the system calculates a priority score based on deadlines, tags, and priority flags
**And** tasks are sorted by their urgency score.

### Story 4.2: "Plan My Day" Wizard

As a user,
I want an intelligent suggestion for my daily plan,
So that I can start my day with focus.

**Acceptance Criteria:**

**Given** I start my morning routine
**When** I click "Plan My Day"
**Then** the system presents a suggested list of up to 5 tasks based on urgency
**And** I can confirm, remove, or reorder the suggestions before starting my day.

### Story 4.3: Focus Mode UI State (Zustand)

As a user,
I want to eliminate all distractions when working on a task,
So that I can enter "Deep Work."

**Acceptance Criteria:**

**Given** I have started a task from my daily plan
**When** I toggle Focus Mode
**Then** the UI (managed by Zustand) removes all sidebars and lists
**And** only the current active task and its details are visible.

### Story 4.4: Completion & Deferral Tracking

As a user,
I want the system to learn from my habits,
So that its daily suggestions become more accurate over time.

**Acceptance Criteria:**

**Given** I complete or defer a suggested task
**When** the action is saved
**Then** the system logs the behavioral event (completion time, deferral rate per tag)
**And** this data is used to adjust the weight of similar tasks in future "Plan My Day" generations.
