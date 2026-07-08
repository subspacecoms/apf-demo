---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "docs/specs/plans/prds/prd-Casas-Bahia-2025-05-19/prd.md"
  - "docs/specs/plans/briefs/brief-Casas-Bahia-2026-05-17/brief.md"
  - "docs/specs/project-context.md"
workflowType: 'architecture'
project_name: 'Casas Bahia'
user_name: 'accounts.google.com:107764536614723260958'
date: '2026-05-17'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The architecture must support a unified payment strategy (Pix & EBANKS FX), high-performance SEO-optimized storefront (SSR/Next.js), and a resilient middleware layer (Express). Key features like dynamic QR code generation and real-time order status updates necessitate a reactive and type-safe integration layer.

**Non-Functional Requirements:**
- **Performance:** Sub-2.5s LCP on mobile and 100k concurrent user capacity.
- **Security:** PCI-DSS Level 1 compliance, Zero Trust architecture, and automated SAST/DAST in CI/CD.
- **Agility:** Daily production deployment capability enabled by decoupled architecture and feature flags.
- **Consistency:** Strict TypeScript mode and shared types across frontend and backend boundaries.

**Scale & Complexity:**
The project is categorized as Enterprise due to the intersection of high-volume retail traffic and complex financial orchestration.

- Primary domain: Full-stack Web (Next.js/Express)
- Complexity level: Enterprise
- Estimated architectural components: ~12-15 (Storefront, API Gateway, Payment Orchestrator, Auth Service, FX Service, Cache Layer, etc.)

### Technical Constraints & Dependencies

- **Infrastructure:** Google Cloud Platform (Cloud Run, Cloud SQL).
- **External APIs:** EBANKS, Pix Gateways, and Legacy WMS APIs.
- **Technology Debt:** The system must act as a bridge from the legacy monolith to a decoupled future.
- **Compliance:** Strict adherence to LGPD and PCI-DSS standards.

### Cross-Cutting Concerns Identified

- **Boundary Validation:** Shared Zod schemas to ensure data integrity between Next.js and Express.
- **Error Orchestration:** Centralized error handling across the stack for user feedback and internal logging.
- **Feature Management:** Decoupling code deployment from feature activation.
- **State Management:** Balancing SSR for SEO and client-side state for checkout/cart interactivity.

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack Monorepo** (Next.js + Express + TypeScript) with **Infrastructure as Code (Terraform)** based on project requirements analysis.

### Starter Options Considered

1.  **Turborepo (Customized):**
    *   **Pros:** Highly optimized for Next.js and shared TypeScript packages. Ideal for the "Shared Types" requirement.
    *   **Cons:** Requires manual setup for the Express layer and Terraform structure.
2.  **Nx (with GCP Plugin):**
    *   **Pros:** Robust tooling for monorepos with excellent support for diverse frameworks (Next.js & Express). Can integrate Terraform through custom executors.
    *   **Cons:** Higher learning curve than Turborepo.
3.  **T3 Stack (Monorepo via Turborepo):**
    *   **Pros:** Best-in-class type safety (tRPC/Zod).
    *   **Cons:** Harder to decouple the Express middleware logic as specified in the PRD.

### Selected Starter: Turborepo (Next.js + Express + Terraform)

**Rationale for Selection:**
Turborepo provides the most lightweight and flexible foundation for maintaining shared TypeScript packages (like the required **Shared Zod Schemas**) while allowing the Next.js frontend and Express backend to exist as independent services within the same repository. We will extend this with a dedicated `/infra` directory for Terraform modules targeting GCP.

**Initialization Command:**

```bash
# Initialize Turborepo with Next.js and a shared UI package
npx create-turbo@latest --example basic

# Note: We will manually add the 'server' (Express) and 'infra' (Terraform) workspaces.
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript (Strict Mode) with shared `tsconfig` base. Node.js 20+ runtime.

**Styling Solution:**
Tailwind CSS integrated into the UI package and Next.js apps.

**Build Tooling:**
Turborepo for orchestration; pnpm for fast, disk-efficient package management.

**Testing Framework:**
Vitest setup across all packages for unit and integration tests; Playwright for E2E.

**Code Organization:**
Monorepo structure with `apps/web` (Next.js), `apps/server` (Express), `packages/shared` (Zod schemas/types), and `infra/` (Terraform).

**Development Experience:**
Remote caching for builds and tests; centralized linting (ESLint) and formatting (Prettier).

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **ORM:** Drizzle ORM for type-safe database interactions.
- **API Pattern:** REST with Shared Zod Schemas for frontend-backend contract enforcement.
- **Infrastructure:** Google Cloud Run (Dockerized) for scaling and agility.

**Important Decisions (Shape Architecture):**
- **Caching:** Redis (Google Cloud Memorystore) for session and data caching.
- **Auth:** NextAuth.js (Auth.js) for flexible, provider-based authentication.
- **IaC:** Terraform for managing GCP infrastructure.

**Deferred Decisions (Post-MVP):**
- **Global CDN Optimization:** Deferring advanced Edge routing until traffic patterns are established.

### Data Architecture

- **Database:** PostgreSQL (Cloud SQL)
- **ORM:** **Drizzle ORM (v0.30.x)**
    - *Rationale:* Lightweight, pure TypeScript, and provides the best performance for high-concurrency environments like Casas Bahia.
- **Caching:** **Redis (Google Cloud Memorystore v7.x)**
    - *Rationale:* Essential for sub-2.5s LCP and handling 100k concurrent users during peak retail events.

### Authentication & Security

- **Auth Provider:** **NextAuth.js / Auth.js (v5 beta)**
    - *Rationale:* Seamless integration with Next.js App Router and supports the secure session management required for retail portals.
- **Security Pattern:** **Zero Trust**
    - *Rationale:* All API requests from Next.js to Express must be validated via JWT/Session tokens and verified against Zod schemas.

### API & Communication Patterns

- **API Design:** **RESTful API**
- **Contract Enforcement:** **Shared Zod Schemas**
    - *Rationale:* Ensures that the Next.js frontend and Express backend remain in sync without the overhead of GraphQL, while remaining compatible with legacy WMS APIs.

### Infrastructure & Deployment

- **Compute:** **Google Cloud Run**
    - *Rationale:* Serverless agility with the ability to scale to meet Black Friday demands.
- **IaC:** **Terraform (v1.8.x)**
    - *Rationale:* Standardizes infrastructure across environments and ensures reproducible deployments.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize Monorepo with Turborepo.
2. Setup Shared Zod Schemas and Drizzle Schema.
3. Configure Express API with REST routes and Zod validation.
4. Implement NextAuth.js in Next.js app.
5. Deploy base infrastructure via Terraform to Cloud Run.

**Cross-Component Dependencies:**
- The **Express API** depends on **Shared Zod Schemas** for request validation.
- **Next.js Server Actions** depend on the **Express API** for data mutations to maintain the decoupling boundary.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
**8** areas where AI agents could make different choices (Naming, API structure, Database conventions, Shared Types, Error Handling, Loading states, Test organization, and Infrastructure patterns).

### Naming Patterns

**Database Naming Conventions:**
- **Tables:** `plural_snake_case` (e.g., `user_accounts`, `payment_transactions`).
- **Columns:** `snake_case` (e.g., `updated_at`, `is_active`).
- **Foreign Keys:** `singular_table_name_id` (e.g., `user_account_id`).

**API Naming Conventions:**
- **Endpoints:** `plural-kebab-case` with `/api/v1/` prefix (e.g., `/api/v1/order-history`).
- **Query Params:** `camelCase` (e.g., `?orderId=123`).

**Code Naming Conventions:**
- **Components/Types/Interfaces:** `PascalCase` (e.g., `PaymentForm`, `UserAccount`).
- **Functions/Variables:** `camelCase` (e.g., `calculateTotal`, `isProcessing`).
- **Files:** `kebab-case.tsx` or `kebab-case.ts` (e.g., `order-list.tsx`).

### Structure Patterns

**Project Organization:**
- **Feature-First:** Group logic by domain in `src/features/[feature-name]`.
- **Shared Package:** All cross-boundary validation and shared types MUST reside in `packages/shared`.

**File Structure Patterns:**
- **Co-location:** Tests and styles must live next to the implementation (e.g., `button.tsx`, `button.test.tsx`, `button.module.css`).

### Format Patterns

**API Response Formats:**
- **Standard Envelope:** 
  - Success: `{ "success": true, "data": { ... }, "error": null }`
  - Error: `{ "success": false, "data": null, "error": { "code": "STRING_CODE", "message": "User-friendly message" } }`

**Data Exchange Formats:**
- **JSON Fields:** `camelCase` (consistent with TypeScript objects).
- **Dates:** `ISO 8601` strings.

### Communication Patterns

**Event System Patterns:**
- **Naming:** `domain.event.action` (e.g., `payment.pix.completed`).
- **Payload:** Must be a flat object where possible, validated by a Zod schema in `packages/shared`.

**State Management Patterns:**
- **React State:** Use `useOptimistic` for UI updates; React Query/SWR for server state.
- **Immutability:** Absolute requirement for all state updates.

### Process Patterns

**Error Handling Patterns:**
- **Express:** Global middleware to catch all async errors and return the Standard Envelope.
- **Frontend:** Error Boundaries at the feature level to prevent total app crashes.

**Loading State Patterns:**
- **Naming:** Use boolean `isLoading` or status strings `'idle' | 'loading' | 'success' | 'error'`.
- **Skeleton Screens:** Required for all primary data-fetching components to meet the 2.5s LCP goal.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use the shared Zod schemas in `packages/shared` for ALL API request/response validation.
- Implement explicit return types for all functions and API handlers.
- Co-locate tests for every new feature implementation.
