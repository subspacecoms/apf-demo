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

FR1: Dynamic Pix Generation (unique QR, Copia e Cola, expires 30m, status "Paid" in 5s, Zod validation).
FR2: Cross-Border FX Calculation (BRL totals, FX fees, IOF, tax breakdown visible, graceful error/logging).
FR3: Server-Side Rendering (SSR) for Product Detail Pages (PDP).
FR4: Client-Side Interactivity for Cart and Checkout using 'use client' components.
FR5: Feature Flagging for all new features (LaunchDarkly or custom PostgreSQL-backed toggle).
FR6: Automated Security Scanning (SAST and dependency vulnerability scanning) in CI/CD.
FR7: User Authentication with CPF tax ID validation and Multi-Factor Authentication (MFA).
FR8: Profile & Address Management with Brazilian CEP (postal code) auto-lookup via ViaCEP integration.
FR9: Multi-level Department Mega-menu (Eletrodomésticos, TVs, Móveis, etc.).
FR10: Real-time Search with debounced autocomplete.
FR11: Personalization Engine: "Indicados com base nas suas visitas" recommendation carousels.
FR12: Dynamic Pricing Engine (PIX discount, Credit Card 12x interest-free, Carnê Digital).
FR13: Delivery Estimator and Store Pick-up (Retira Rápido) availability lookup.
FR14: Instant PIX Payment with real-time QR Code generation and WebSocket status confirmation.
FR15: Multi-card Credit Processing and "Carnê Digital" credit scoring & checkout.
FR16: Event-driven OMS Pipeline using Cloud Pub/Sub for order status.
FR17: NF-e (Nota Fiscal Eletrônica) generation and management.
FR18: Marketplace Seller Attribution ("Vendido e entregue por...").
FR19: CMS Scheduled Campaign Banners (e.g., Dia do Baianinho).
FR20: Digital Accessibility integration including VLibras (Brazilian Sign Language).

### NonFunctional Requirements

NFR1: Deployment frequency of 1+ successful production deployment per day.
NFR2: Core Web Vitals (LCP) < 2.5 seconds on mobile.
NFR3: Zero critical vulnerabilities in production at launch.
NFR4: Payment success rate for cross-border transactions > 85%.
NFR5: Platform must handle 100k concurrent users (Black Friday baseline).
NFR6: PCI-DSS Level 1 compliance for payment processing.
NFR7: LGPD (Privacy) audit sign-off for customer data handling.
NFR8: Strict TypeScript mode, Shared Types, and Zod validation at boundaries.
NFR9: Observability & SRE: Integration with OpenTelemetry and Cloud Logging.

### Additional Requirements

- **Cloud Infrastructure (GCP)**: Terraform IaC for Cloud Run (or GKE), Cloud SQL (PostgreSQL), Redis (Cloud Memorystore), Cloud Storage, and Cloud CDN.
- **Core Framework**: Turborepo Monorepo with Next.js (App Router, SSR) and Express.js API services.
- **ORM**: Drizzle ORM (v0.30.x).
- **Authentication**: NextAuth.js / Auth.js (v5 beta).
- **API Design**: REST with Shared Zod Schemas for frontend-backend contract.
- **CI/CD**: GitHub Actions for separate frontend, backend, and Terraform pipelines.
- **Implementation Patterns**: Plural snake_case for tables, kebab-case for endpoints, standard JSON envelope for responses.

### UX Design Requirements

No UX Design documents were found. UI/UX requirements are derived from the PRD and the specific feature list provided for Brazilian retail context (Mega-menu, Retira Rápido, VLibras, etc.).

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}
