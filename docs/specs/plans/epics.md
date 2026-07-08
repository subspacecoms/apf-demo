---
stepsCompleted: [1, 2]
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

FR1: Epic 5 - Instant PIX payment/status
FR2: Epic 6 - Cross-border FX/EBANKS
FR3: Epic 4 - SSR for PDP
FR4: Epic 5 - Client-side interactivity (Cart/Checkout)
FR5: Epic 1 - Feature Flagging
FR6: Epic 1 - Automated Security Scanning
FR7: Epic 2 - Auth with CPF validation/MFA
FR8: Epic 2 - Profile/Address with ViaCEP
FR9: Epic 3 - Mega-menu navigation
FR10: Epic 3 - Real-time search
FR11: Epic 3 - Personalization engine
FR12: Epic 4 - Dynamic pricing engine
FR13: Epic 4 - Delivery/Store pick-up lookup
FR14: Epic 5 - Instant PIX with WebSocket
FR15: Epic 5 - Multi-card/Carnê Digital checkout
FR16: Epic 7 - Event-driven OMS (Pub/Sub)
FR17: Epic 7 - NF-e generation
FR18: Epic 7 - Marketplace attribution
FR19: Epic 8 - CMS Scheduled Banners
FR20: Epic 8 - VLibras accessibility

## Epic List

### Epic 1: Foundation, Infrastructure & Core Framework (GCP)
Establish the Turborepo monorepo, Terraform IaC, and CI/CD pipelines.
**FRs covered:** FR5, FR6

### Epic 2: Identity & Location Services (CPF & CEP)
Implement secure authentication with Brazilian tax ID (CPF) validation and postal code (CEP) auto-lookup.
**FRs covered:** FR7, FR8

### Epic 3: Catalog, Search & Personalization
Build the department mega-menu, real-time debounced search, and personalized recommendation carousels.
**FRs covered:** FR9, FR10, FR11

### Epic 4: Product Detail Experience & Dynamic Pricing
Develop high-performance SSR Product Detail Pages (PDP) with the dynamic pricing engine and store availability (Retira Rápido).
**FRs covered:** FR3, FR12, FR13

### Epic 5: Cart, Checkout & Payment Orchestration (PIX & Carnê)
Enable a reactive cart and checkout experience supporting instant PIX (with WebSocket confirmation), multi-card processing, and Carnê Digital.
**FRs covered:** FR1, FR4, FR14, FR15

### Epic 6: International Commerce & FX Orchestration (EBANKS)
Integrate EBANKS for cross-border payment handling, including automatic FX and IOF tax calculations.
**FRs covered:** FR2

### Epic 7: Order Management, Fulfillment & Marketplace
Implement the event-driven OMS (Pub/Sub), NF-e generation, and marketplace seller attribution.
**FRs covered:** FR16, FR17, FR18

### Epic 8: Campaign Management, Accessibility & SEO
Add scheduled CMS banners, Brazilian Sign Language (VLibras) integration, and final SEO optimizations.
**FRs covered:** FR19, FR20
