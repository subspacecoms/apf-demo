---
stepsCompleted: [1]
inputDocuments:
  - "docs/specs/plans/prds/prd-Casas-Bahia-2025-05-19/prd.md"
  - "docs/specs/plans/architecture.md"
  - "docs/specs/plans/briefs/brief-Casas-Bahia-2026-05-17/brief.md"
  - "docs/specs/project-context.md"
---

# Casas Bahia - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Casas Bahia, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Dynamic Pix Generation (unique QR, Copia e Cola, expires 30m, status "Paid" in 5s, Zod validation).
FR2: Cross-Border FX Calculation (BRL totals, FX fees, IOF, tax breakdown visible, graceful error/logging).
FR3: Server-Side Rendering (SSR) for Product Detail Pages (PDP).
FR4: Client-Side Interactivity for Cart and Checkout using 'use client' components.
FR5: Feature Flagging for all new features (LaunchDarkly or custom PostgreSQL-backed toggle).
FR6: Automated Security Scanning (SAST and dependency vulnerability scanning) in CI/CD.
FR7: Core Shopping Journey: Home, Search, PDP, Cart, Checkout.
FR8: Account Management: Login, Signup, and Order History.

### NonFunctional Requirements

NFR1: Deployment frequency of 1+ successful production deployment per day.
NFR2: Core Web Vitals (LCP) < 2.5 seconds on mobile.
NFR3: Zero critical vulnerabilities in production at launch.
NFR4: Payment success rate for cross-border transactions > 85%.
NFR5: Platform must handle 100k concurrent users (Black Friday baseline).
NFR6: PCI-DSS Level 1 compliance for payment processing.
NFR7: LGPD (Privacy) audit sign-off for customer data handling.
NFR8: Strict TypeScript mode, Shared Types, and Zod validation at boundaries.

### Additional Requirements

- **Starter Template**: Turborepo (Next.js + Express + Terraform) using `npx create-turbo@latest --example basic`.
- **Infrastructure**: Google Cloud Run (Compute) and Google Cloud SQL (PostgreSQL).
- **Caching**: Redis (Google Cloud Memorystore) for session and data caching.
- **ORM**: Drizzle ORM (v0.30.x).
- **Authentication**: NextAuth.js / Auth.js (v5 beta).
- **API Design**: REST with Shared Zod Schemas for frontend-backend contract.
- **CI/CD**: GitHub Actions for separate frontend, backend, and Terraform pipelines.
- **Implementation Patterns**: Plural snake_case for tables, kebab-case for endpoints, standard JSON envelope for responses.

### UX Design Requirements

No UX Design documents were found. Requirements are derived from the PRD's User Journeys and Features.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}
