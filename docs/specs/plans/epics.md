---
stepsCompleted: [1]
inputDocuments:
  - "docs/specs/plans/prds/prd-Casas-Bahia-2025-05-19/prd.md"
  - "docs/specs/plans/architecture.md"
---

# Casas Bahia - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Casas Bahia, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Dynamic Pix Generation (unique QR code/Copia e Cola per order, 30 min expiry, status update < 5s).
FR2: Cross-Border FX Calculation (calculate/display BRL totals including fees/IOF, tax breakdown visible, graceful error on timeout).
FR3: Server-Side Rendering (SSR) for Product Detail Pages (PDP) for SEO and speed.
FR4: Client-Side Interactivity for Cart and Checkout using 'use client' components.
FR5: Feature Flagging for all new features (LaunchDarkly or custom PostgreSQL-backed toggle).
FR6: Automated Security Scanning (SAST and dependency scanning in CI/CD).

### NonFunctional Requirements

NFR1: Performance - LCP < 2.5s on mobile.
NFR2: Scalability - 100k concurrent users (Black Friday baseline).
NFR3: Security - Zero Trust model, PCI-DSS Level 1 compliance, LGPD compliance.
NFR4: Agility - 1+ production deployment per day.
NFR5: Quality - 95% Unit/Integration test coverage on Payment Orchestration; 100% pass on SAST/DAST.

### Additional Requirements

- **Monorepo Structure**: Turborepo workspace with apps/web, apps/server, packages/shared, and infra/.
- **Starter Template**: Initialize with `npx create-turbo@latest --example basic`.
- **Data Architecture**: Drizzle ORM (v0.30.x) with PostgreSQL (Cloud SQL) and Redis (Memorystore).
- **API & Security**: REST API using Shared Zod Schemas; Zero Trust with JWT/Session verification.
- **Authentication**: NextAuth.js / Auth.js (v5 beta).
- **Infrastructure**: Terraform (v1.8.x) for GCP (Cloud Run, SQL, Redis).
- **DevSecOps**: Automated SAST/DAST and dependency scanning in CI/CD.

### UX Design Requirements

No separate UX Design specification found. Requirements are derived from the PRD user journeys.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}
