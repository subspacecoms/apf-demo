---
stepsCompleted: [1, 2, 3, 4, 5, 6]
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

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
4 areas where AI agents could make different choices regarding database naming, project organization, API response structure, and loading states.

### Naming Patterns

**Database Naming Conventions:**
- Tables and columns MUST use `snake_case`. Example: `task_items`, `user_settings_id`.
- Foreign keys MUST follow the pattern `fk_[target_table]_[source_column]`.

**API Naming Conventions:**
- Server Actions MUST be named with a verb prefix. Example: `createTaskAction`, `updatePriorityAction`.
- API endpoints (if any) MUST use plural nouns and kebab-case. Example: `/api/task-items`.

**Code Naming Conventions:**
- TypeScript variables and functions MUST use `camelCase`.
- React Components MUST use `PascalCase`.
- Files MUST use `kebab-case`. Example: `task-item-card.tsx`.

### Structure Patterns

**Project Organization:**
- Feature-based organization: Features live in `/app/features/[feature-name]`.
- Shared components live in `/components/ui`.
- Business logic lives in `/lib`.

**File Structure Patterns:**
- Tests MUST be co-located with the implementation using the `.test.ts(x)` suffix.
- Constants MUST live in a `constants.ts` file within their respective feature or lib folder.

### Format Patterns

**API Response Formats:**
- All Server Actions MUST return a standardized object: `{ data: T | null, error: string | null }`.

**Data Exchange Formats:**
- JSON payloads MUST use `camelCase` keys in TypeScript, mapped from `snake_case` database columns by Drizzle.

### Communication Patterns

**Event System Patterns:**
- No global event bus; communication happens via Zustand state updates or standard prop drilling for simple components.

**State Management Patterns:**
- Immutable updates MUST be used for all Zustand state transitions.
- Action naming in Zustand MUST be descriptive: `setFocusMode`, `addTaskToQueue`.

### Process Patterns

**Error Handling Patterns:**
- Graceful degradation: If Gemini parsing fails, fall back to basic text capture with a manual priority flag.
- Use `try/catch` in all Server Actions to return the standardized error object.

**Loading State Patterns:**
- Use `loading.tsx` for route-level skeleton screens.
- Use local `isLoading` state within components for button/interaction feedback.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use the standardized Server Action response wrapper.
- Adhere to the `snake_case` (DB) to `camelCase` (Code) mapping.
- Organize new code into the feature-based directory structure.

**Pattern Enforcement:**
- Pattern compliance will be checked during implementation readiness validation.
- Violations MUST be flagged as "out of architectural alignment."

### Pattern Examples

**Good Examples:**
```typescript
// Server Action with Standardized Wrapper
export async function createTaskAction(data: TaskSchema): Promise<ActionResponse<Task>> {
  try {
    const task = await db.insert(tasks).values(data).returning();
    return { data: task[0], error: null };
  } catch (e) {
    return { data: null, error: "Failed to create task" };
  }
}
```

**Anti-Patterns:**
- Directly throwing errors from Server Actions without a wrapper.
- Using `camelCase` for database column names in Drizzle schemas.
- Placing feature-specific components in a global `components/` folder.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
project-antigravity/
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── .env.local
├── .github/
│   └── workflows/
│       └── gcp-deploy.yml
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── ai/parse/route.ts
│   ├── features/
│   │   ├── task-capture/
│   │   │   ├── components/
│   │   │   │   ├── fast-entry-bar.tsx
│   │   │   │   └── nlp-highlight.tsx
│   │   │   ├── actions/
│   │   │   │   └── capture-task.ts
│   │   │   └── hooks/
│   │   │       └── use-nlp-parser.ts
│   │   ├── focus/
│   │   │   ├── components/
│   │   │   │   └── focus-task-view.tsx
│   │   │   └── store/
│   │   │       └── focus-store.ts
│   │   └── daily-planning/
│   │       ├── actions/
│   │       │   └── generate-daily-plan.ts
│   │       └── components/
│   │           └── planning-wizard.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── ui/              # Radix UI / Shadcn base components
├── lib/
│   ├── db/
│   │   ├── index.ts     # Drizzle client
│   │   └── schema.ts    # SQLite tables
│   ├── ai/
│   │   ├── gemini.ts    # Gemini SDK config
│   │   └── parser.ts    # NLP logic
│   └── utils.ts
├── public/
│   ├── icons/           # PWA icons
│   └── manifest.json    # PWA manifest
└── tests/
    ├── unit/
    └── integration/
```

### Architectural Boundaries

**API Boundaries:**
- **Next.js Server Actions:** Primary boundary for internal data mutation and NLP parsing.
- **NextAuth API:** Secure boundary for authentication flows with Google OAuth.
- **AI Streaming API:** Dedicated `/api/ai/parse` for high-frequency NLP feedback.

**Component Boundaries:**
- **Shared UI:** Independent components in `/components/ui` with no business logic.
- **Feature Modules:** Encapsulated logic in `/app/features/` to prevent cross-feature dependency leakage.
- **State Store:** Zustand stores provide a boundary between raw data and UI-reactive state.

**Service Boundaries:**
- **NLP Service:** Abstracted in `lib/ai/parser.ts` to allow switching between regex and Gemini logic.
- **Database Service:** Drizzle layer in `lib/db` acts as the single entry point for SQLite operations.

**Data Boundaries:**
- **Persistence:** SQLite for long-term storage; IndexedDB for ephemeral offline queuing.
- **Validation:** Zod schemas define the boundary for all incoming data at the Server Action level.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- **NLP Fast Capture:** `app/features/task-capture/`
- **Predictive Prioritization:** `app/features/daily-planning/` and `lib/ai/prioritization-engine.ts`
- **Focus Mode:** `app/features/focus/`

**Cross-Cutting Concerns:**
- **Authentication:** `app/(auth)/` and `lib/auth/`
- **Database/Storage:** `lib/db/` and `public/manifest.json` (PWA configuration)

### Integration Points

**Internal Communication:**
- Components trigger Server Actions for data persistence.
- Zustand handles real-time UI state (e.g., toggling Focus Mode).

**External Integrations:**
- **Google Gemini API:** Integrated via Vercel AI SDK in the NLP feature.
- **GCP Cloud Run:** Deployment target via GitHub Actions.

**Data Flow:**
1. User Input -> NLP Bar (Client-side Highlight)
2. Debounced Input -> Gemini Parser (Backend Action)
3. Action Returns parsed entities -> UI Updates
4. Save -> Server Action (Drizzle/SQLite) -> Sync Queue (if offline)
