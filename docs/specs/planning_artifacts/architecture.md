---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - docs/specs/planning_artifacts/prds/prd-Project-Antigravity-2025-01-24/prd.md
  - docs/specs/planning_artifacts/briefs/brief-task-manager-2026-05-17/brief.md
workflowType: 'architecture'
project_name: 'Project Antigravity'
user_name: 'sumeetsing@gcp.altostrat.com'
date: '2025-01-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The application centers on high-velocity task capture (NLP-based) and intelligent daily planning. Key features include a fast-entry command bar with real-time feedback, a predictive prioritization engine that learns from user behavior, and a distraction-free "Focus Mode."

**Non-Functional Requirements:**
- **Performance:** < 100ms latency for NLP entity highlighting in the UI.
- **Synchronization:** < 2s latency for data sync across multiple devices.
- **Reliability:** Support for offline task capture via PWA.
- **Usability:** Minimalist, zero-friction interface.

**Scale & Complexity:**
- **Primary domain:** Web/PWA Full-stack
- **Complexity level:** Medium
- **Estimated architectural components:** 4-6 (Frontend, NLP Service, Prioritization Engine, Analytics/Learning Service, Sync/Data Layer)

### Technical Constraints & Dependencies
- Must support PWA standards for mobile capture.
- Hybrid shorthand/NLP parsing requirement for power users.
- Suggestive (non-forced) prioritization requires a flexible UI for user overrides.

### Cross-Cutting Concerns Identified
- **Real-time State Management:** Critical for both the NLP feedback and multi-device sync.
- **Data Persistence & Sync:** Handling offline-to-online transitions reliably.
- **Behavioral Data Ingestion:** Tracking completions and deferrals for the prioritization engine.

## Starter Template Evaluation

### Primary Technology Domain
Full-stack Web Application (Next.js) based on the requirement for high-speed capture and multi-device sync.

### Starter Options Considered
- **T3 Stack:** Strong type-safety but complex for PWA integration.
- **Vercel AI Starter:** Excellent Gemini integration but defaults to Postgres.
- **Custom Next.js + Drizzle:** Best balance for SQLite performance.

### Selected Starter: Next.js Modern Full-stack (Custom Composition)

**Rationale for Selection:**
To meet the <100ms NLP feedback and SQLite requirements, a combination of Next.js 14 (App Router) and Drizzle ORM provides the lowest overhead and maximum control over the local-first PWA sync strategy.

**Initialization Command:**

```bash
# Initialize Next.js with Tailwind and App Router
npx create-next-app@latest project-antigravity --typescript --tailwind --eslint

# Add Drizzle ORM and SQLite
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3

# Add Gemini/AI capabilities
npm install @google/generative-ai ai

# Add PWA support
npm install @ducanh2912/next-pwa
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript with Node.js 20+ runtime for optimal performance on GCP Cloud Run.

**Styling Solution:**
Tailwind CSS for high-speed, minimalist UI development (required for Focus Mode).

**Build Tooling:**
Next.js Turbo (SWC-based) for fastest possible development cycles and optimized production builds.

**Testing Framework:**
Vitest for fast unit testing of the NLP parsing logic.

**Code Organization:**
App Router structure (`/app`) with separate layers for `/app/api` (Gemini/NLP) and `/lib/db` (Drizzle/SQLite).

**Development Experience:**
Fast Refresh and Zod for runtime type-safe validation of NLP inputs.

**Note:** Project initialization using these commands should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Data Sync Strategy:** Server-First with Offline Queue.
- **Auth Provider:** NextAuth.js v5.
- **NLP Processing:** Hybrid (Client-side highlighting + Gemini parsing).

**Important Decisions (Shape Architecture):**
- **Infrastructure:** GCP Cloud Run with Cloud Build.
- **State Management:** Zustand for UI/Task state.

**Deferred Decisions (Post-MVP):**
- **Predictive Prioritization Model:** Initial heuristic-based, moving to ML-based as behavioral data is collected.

### Data Architecture
- **Database:** SQLite (via `better-sqlite3` in production on Cloud Run with persistent volume/Cloud Storage mount or standard ephemeral with sync).
- **ORM:** Drizzle ORM (v0.30+).
- **Offline Strategy:** `Dexie.js` for IndexedDB management to queue offline tasks.

### Authentication & Security
- **Provider:** NextAuth.js (v5) using Google OAuth.
- **Session Management:** JWT-based sessions stored in secure, HTTP-only cookies.
- **Authorization:** Middleware-based route protection for `/dashboard` and `/focus`.

### API & Communication Patterns
- **Standard:** Next.js Server Actions for all CRUD operations.
- **AI Streaming:** Vercel AI SDK for streaming Gemini responses to the NLP bar.
- **Validation:** Zod (v3.22+) for all input and environment variable validation.

### Frontend Architecture
- **State Management:** Zustand for global task filtering and Focus Mode state.
- **Components:** Tailwind CSS + Radix UI (Headless) for accessible, minimalist components.
- **PWA:** `@ducanh2912/next-pwa` for service worker management and manifest generation.

### Infrastructure & Deployment
- **Platform:** GCP Cloud Run.
- **CI/CD:** Google Cloud Build triggered by GitHub repository pushes.
- **Secret Management:** GCP Secret Manager for Gemini API keys and Auth secrets.

### Decision Impact Analysis

**Implementation Sequence:**
1. Next.js/Drizzle/SQLite Initialization.
2. NextAuth.js Configuration.
3. NLP Fast-Entry Bar with Vercel AI SDK (Gemini).
4. PWA Service Worker & Offline Queue.
5. Prioritization Engine Heuristics.

**Cross-Component Dependencies:**
The NLP Fast-Entry Bar depends on both the AI SDK and the Server Actions layer for immediate task persistence. Focus Mode depends on the Zustand state store for UI isolation.
