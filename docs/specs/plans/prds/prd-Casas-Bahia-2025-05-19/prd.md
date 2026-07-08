---
title: Casas Bahia Portal Revamp PRD
status: draft
created: 2025-05-19
updated: 2025-05-19
---

# PRD: Casas Bahia Portal Revamp

## 0. Document Purpose
This PRD defines the requirements for the complete rebuild of the Casas Bahia e-commerce portal. It serves as the primary source of truth for Product Managers, Engineers (Frontend/Backend/DevSecOps), and Architects. This document focuses on transforming a legacy monolith into a decoupled, high-performance, and secure platform. It builds upon the initial "Casas Bahia Portal Revamp Product Brief" and integrates the "Project Context" for TypeScript/Next.js/Express standards.

## 1. Vision
To rebuild the Casas Bahia portal into the most agile and secure retail platform in Brazil. By moving to a modern, decoupled architecture, we enable daily feature deployments and baked-in security, transforming technical debt into a competitive advantage. The platform will not only serve the domestic market via Pix but will also bridge international commerce through cross-border payment orchestration with EBANKS.

## 2. Target User

### 2.1 Primary Persona
**Ricardo, the Frequent Shopper:** A tech-savvy Brazilian consumer who values speed and security. He often shops via mobile during his commute and expects a frictionless checkout, whether paying via local Pix or utilizing international payment options for specialty imports.

### 2.2 Jobs To Be Done
- **Functional:** Browse, search, and purchase products with sub-second page loads.
- **Contextual:** Securely pay using Pix (dynamic QR) or international methods (EBANKS) on a mobile device.
- **Emotional:** Feel confident that personal and payment data is protected by "Zero Trust" security.

### 2.3 Key User Journeys

- **UJ-1. Ricardo buys a TV via Pix.**
  - **Persona + context:** Ricardo wants a new TV for the championship; he's on his phone.
  - **Entry state:** Authenticated on the mobile web portal.
  - **Path:** Searches for "Smart TV", selects a 55" model, adds to cart, and chooses "Pix" at checkout.
  - **Climax:** A dynamic QR code is generated instantly. He switches to his banking app, pays, and returns to find the "Order Confirmed" screen updated via WebSockets.
  - **Resolution:** He receives a push notification/email confirmation.

- **UJ-2. Ricardo purchases an imported gadget via EBANKS.**
  - **Persona + context:** Ricardo is buying a specialized item from an international seller.
  - **Entry state:** Logged in, browsing the "International Marketplace" section.
  - **Path:** Adds item to cart. The price is shown in BRL [ASSUMPTION]. At checkout, he selects EBANKS.
  - **Climax:** The system calculates FX rates and IOF taxes transparently. He completes the payment.
  - **Resolution:** Order is placed with clear international shipping tracking.

## 3. Glossary
- **EBANKS Integration** — The payment orchestration layer handling cross-border FX, international compliance, and diverse payment methods.
- **Pix (Dynamic)** — Brazilian instant payment system using a unique, transaction-specific QR code for automated reconciliation.
- **Zero Trust Security** — A security model where no entity is trusted by default, requiring strict verification for every access request.
- **Agility Gap** — The delay in feature release caused by legacy monolithic dependencies.
- **FX (Foreign Exchange)** — The conversion of one currency to another, including associated fees and taxes (e.g., IOF).

## 4. Features

### 4.1 Payment Orchestration (Pix & EBANKS)
**Description:** A unified payment service that abstracts the complexity of local and international payment gateways. Realizes UJ-1, UJ-2. [ASSUMPTION: The system uses a Strategy pattern to switch between Pix and EBANKS providers.]

**Functional Requirements:**

#### FR-1: Dynamic Pix Generation
The system must generate a unique Pix QR code and "Copia e Cola" string for every order.
- **Consequences:** QR code expires after 30 minutes; order status updates to "Paid" within 5 seconds of payment notification.

#### FR-2: Cross-Border FX Calculation
The system must calculate and display final BRL totals for international purchases, including FX fees and IOF.
- **Consequences:** Tax breakdown must be visible at the final checkout step.

### 4.2 Decoupled Frontend (Next.js)
**Description:** A high-performance, SEO-optimized frontend using Next.js App Router.
- **FR-3: Server-Side Rendering (SSR):** Product Detail Pages (PDP) must be pre-rendered for SEO and speed.
- **FR-4: Client-Side Interactivity:** The cart and checkout must use `'use client'` components for immediate feedback.

### 4.3 Developer Agility & DevSecOps
**Description:** Tools and patterns to enable the goal of daily deployments.
- **FR-5: Feature Flagging:** All new features must be wrapped in feature flags to allow dark launches and instant rollbacks. [ASSUMPTION: Using a service like LaunchDarkly or a custom PostgreSQL-backed toggle.]
- **FR-6: Automated Security Scanning:** CI/CD pipeline must include SAST (Static Analysis) and dependency vulnerability scanning (e.g., Snyk).

## 5. Non-Goals (Explicit)
- **v1 Non-Goal:** Building an internal warehouse management system (WMS). We consume existing WMS APIs only.
- **v1 Non-Goal:** Native Mobile Apps. The focus is strictly on a high-performance Web Portal (PWA-ready).

## 6. MVP Scope

### 6.1 In Scope
- Core Journey: Home, Search, PDP, Cart, Checkout.
- Account Management: Login/Signup, Order History.
- Payments: Pix (Dynamic) and EBANKS (Cross-border).
- Infrastructure: Next.js frontend, Express API, PostgreSQL on Cloud SQL.

### 6.2 Out of Scope for MVP
- Legacy Admin Back-office (stay on legacy tools via API bridge).
- Loyalty Program (Casas Bahia Rewards) deep integration.

## 7. Success Metrics
- **SM-1 (Agility):** Deployment Frequency. Target: 1+ successful production deployment per day.
- **SM-2 (Performance):** Core Web Vitals (LCP). Target: < 2.5 seconds on mobile.
- **SM-3 (Security):** Zero critical vulnerabilities in production at launch.
- **SM-4 (Conversion):** Payment Success Rate for Cross-border. Target: > 85%.

## 8. Open Questions
1. What is the exact FX markup policy for EBANKS transactions?
2. Which international regions are the primary focus for the EBANKS rollout?
3. What is the threshold for "High Performance" load during Black Friday? [ASSUMPTION: 100k concurrent users.]

## 9. Assumptions Index
- **[ASSUMPTION: BRL Display]** International prices are displayed in BRL with conversion happening at the checkout stage.
- **[ASSUMPTION: Strategy Pattern]** The backend uses a pluggable strategy for payment providers.
- **[ASSUMPTION: Feature Flags]** A feature flagging system is required to hit "daily deployment" goals.
- **[ASSUMPTION: Load Target]** The platform must handle 100k concurrent users (Black Friday baseline).
- **[ASSUMPTION: PCI-DSS]** The system must meet PCI-DSS Level 1 compliance requirements.

## 10. Release Gates (The Gates)
To move from Development to Production, the following gates must be passed:
- **Gate 1: Security Audit:** 100% pass on SAST/DAST and PCI-DSS Level 1 validation.
- **Gate 2: Performance Gate:** Successful "Black Friday" load test (100k concurrent users) with no degradation.
- **Gate 3: Compliance Gate:** LGPD (Privacy) audit sign-off for customer data handling.
- **Gate 4: Functional Gate:** 95% Unit/Integration test coverage on Payment Orchestration logic.
