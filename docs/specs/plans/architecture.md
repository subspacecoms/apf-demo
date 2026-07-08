---
stepsCompleted: [1, 2]
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
