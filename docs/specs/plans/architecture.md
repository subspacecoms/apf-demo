---
stepsCompleted: [1, 2, 3]
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
