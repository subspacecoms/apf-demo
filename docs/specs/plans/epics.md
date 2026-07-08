---
stepsCompleted: [1, 2, 3]
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
FR11: Personalization Engine: "Indicados com base nas suas visits" recommendation carousels.
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
### Epic 2: Identity & Location Services (CPF & CEP)
### Epic 3: Catalog, Search & Personalization
### Epic 4: Product Detail Experience & Dynamic Pricing
### Epic 5: Cart, Checkout & Payment Orchestration (PIX & Carnê)
### Epic 6: International Commerce & FX Orchestration (EBANKS)
### Epic 7: Order Management, Fulfillment & Marketplace
### Epic 8: Campaign Management, Accessibility & SEO

## Epic 1: Foundation, Infrastructure & Core Framework (GCP)

Establish the Turborepo monorepo, Terraform IaC, and CI/CD pipelines to enable daily deployments and observability.

### Story 1.1: Project Initialization & Monorepo Setup
As a Developer,
I want to initialize the Turborepo workspace with defined apps and packages,
So that the team has a standardized full-stack TypeScript environment.

**Acceptance Criteria:**
**Given** a clean workspace
**When** I run the initialization script
**Then** the project structure includes apps/web (Next.js), apps/server (Express), packages/shared (Zod/Types), and infra/ (Terraform)
**And** pnpm is configured for monorepo workspace management.

### Story 1.2: Base GCP Infrastructure with Terraform
As a DevOps Engineer,
I want to provision core GCP resources using Terraform,
So that we have a reproducible production-grade environment.

**Acceptance Criteria:**
**Given** valid GCP credentials
**When** I run terraform apply
**Then** Cloud Run, Cloud SQL (PostgreSQL), and Redis (Memorystore) instances are provisioned
**And** network connectivity between services is established.

### Story 1.3: CI/CD Pipeline & Automated Security Scanning
As a Security Engineer,
I want to automate the build and security scanning process,
So that every deployment is validated for vulnerabilities.

**Acceptance Criteria:**
**Given** a pull request to the main branch
**When** the CI pipeline triggers
**Then** SAST (Snyk/ESLint) scans pass
**And** container images are built and pushed to GCR only if security checks are successful.

### Story 1.4: Feature Flagging Framework Integration
As a Product Manager,
I want a feature flagging system integrated into the core framework,
So that we can perform dark launches and instant rollbacks.

**Acceptance Criteria:**
**Given** the monorepo setup
**When** I implement the Feature Flagging service
**Then** flags can be toggled via config or a UI dashboard
**And** both apps/web and apps/server can access the same flag states.

### Story 1.5: Observability & SRE Foundation
As an SRE,
I want the application to export telemetry data,
So that we can monitor system health and latency in real-time.

**Acceptance Criteria:**
**Given** the running Cloud Run services
**When** requests are processed
**Then** traces and logs are sent to OpenTelemetry/Cloud Logging
**And** latency and error rates are visible in the GCP dashboard.

## Epic 2: Identity & Location Services (CPF & CEP)

Implement secure authentication with Brazilian tax ID validation and postal code auto-lookup.

### Story 2.1: User Registration with CPF Validation
As a New Customer,
I want to register an account using my CPF,
So that my identity is correctly validated for tax and shipping purposes.

**Acceptance Criteria:**
**Given** the registration form
**When** I enter a CPF number
**Then** the system validates the checksum and format using a Zod schema
**And** an error is returned if the CPF is invalid or already registered.

### Story 2.2: User Login with MFA (NextAuth)
As a Registered Customer,
I want to login securely using multi-factor authentication,
So that my personal and payment data is protected.

**Acceptance Criteria:**
**Given** a registered account
**When** I provide my credentials and MFA token
**Then** a secure JWT session is established via Auth.js (NextAuth)
**And** session data is shared between apps/web and apps/server.

### Story 2.3: Profile Address Management with ViaCEP Auto-lookup
As a Customer,
I want my address details to auto-populate when I enter my CEP,
So that I can complete my profile faster and without errors.

**Acceptance Criteria:**
**Given** the address entry form
**When** I enter a valid Brazilian CEP
**Then** the system fetches Street, Neighborhood, City, and State from the ViaCEP API
**And** the form fields are automatically filled.

## Epic 3: Catalog, Search & Personalization

Build the navigation, real-time search, and recommendation engines.

### Story 3.1: Multi-level Department Mega-menu
As a Shopper,
I want to browse products through a structured department menu,
So that I can quickly find the category I'm interested in.

**Acceptance Criteria:**
**Given** the homepage
**When** I hover over the "Departments" menu
**Then** a mega-menu appears with nested categories (e.g., TVs -> Smart TVs)
**And** categories are fetched from the database with sub-second response time.

### Story 3.2: Debounced Search Autocomplete API
As a Shopper,
I want to see product suggestions as I type in the search bar,
So that I can find products without typing the full name.

**Acceptance Criteria:**
**Given** the search input
**When** I type 3 or more characters
**Then** the system returns a list of matching products and categories after a 300ms debounce
**And** results are updated dynamically as I type.

### Story 3.3: Personalization Recommendation Carousels
As a Shopper,
I want to see "Recommended for You" carousels based on my history,
So that my shopping experience feels personalized.

**Acceptance Criteria:**
**Given** a user session with browsing history
**When** I view the homepage or product pages
**Then** the "Indicados com base nas suas visitas" carousel displays relevant products
**And** the list is updated based on recent views.

## Epic 4: Product Detail Experience & Dynamic Pricing

Develop high-performance PDPs with dynamic pricing and availability lookups.

### Story 4.1: SSR Product Detail Page (PDP)
As a Shopper,
I want the product page to load instantly and be SEO-friendly,
So that I can see product details and prices quickly.

**Acceptance Criteria:**
**Given** a product URL
**When** the page is requested
**Then** the content is pre-rendered using Next.js SSR
**And** the LCP (Largest Contentful Paint) is under 2.5 seconds on mobile.

### Story 4.2: Dynamic Pricing Engine (PIX, Card, Carnê)
As a Shopper,
I want to see the price breakdown for different payment methods on the PDP,
So that I can choose the best financing option for me.

**Acceptance Criteria:**
**Given** a product with a base price
**When** I view the PDP
**Then** the system displays the PIX cash price (with discount), Credit Card installments (12x), and Carnê Digital estimate
**And** prices are calculated server-side to ensure accuracy.

### Story 4.3: Delivery Estimator & Store Pick-up (Retira Rápido)
As a Shopper,
I want to check delivery dates and store pick-up availability on the PDP,
So that I can plan my purchase based on delivery time.

**Acceptance Criteria:**
**Given** my CEP or geolocation
**When** I click "Calculate Shipping" on the PDP
**Then** the system returns estimated delivery dates and a list of nearby stores for "Retira Rápido"
**And** availability is checked against real-time inventory.

## Epic 5: Cart, Checkout & Payment Orchestration (PIX & Carnê)

Enable a reactive checkout experience with instant payments and financing.

### Story 5.1: Persistent Shopping Cart
As a Shopper,
I want my cart items to be saved across devices,
So that I can continue my purchase later.

**Acceptance Criteria:**
**Given** items added to the cart
**When** I log in on a different device
**Then** the items are still present in my cart
**And** the cart totals are updated based on current pricing and availability.

### Story 5.2: Unified Checkout Orchestrator
As a Customer,
I want a streamlined checkout process with all payment options in one place,
So that I can complete my purchase efficiently.

**Acceptance Criteria:**
**Given** items in the cart
**When** I proceed to checkout
**Then** the system presents Address selection, Shipping method, and Payment method selection (PIX, Card, Carnê)
**And** the checkout state is managed using a 'use client' component for immediate feedback.

### Story 5.3: Instant PIX Payment with WebSocket Confirmation
As a Customer,
I want to pay via PIX and see my order confirmed instantly,
So that I don't have to wait for manual confirmation.

**Acceptance Criteria:**
**Given** PIX selected as the payment method
**When** I confirm the order
**Then** a unique QR code and "Copia e Cola" string are generated
**And** the screen updates to "Paid" automatically via WebSockets within 5 seconds of payment.

### Story 5.4: Multi-card Credit & Carnê Digital Scoring
As a Customer,
I want to split payment between two cards or use Carnê Digital financing,
So that I can afford higher-value items.

**Acceptance Criteria:**
**Given** the payment selection
**When** I choose "Multi-card" or "Carnê Digital"
**Then** the system processes credit scoring for Carnê or validates limits for multiple cards
**And** transaction data is validated via Zod at the Express API boundary.

## Epic 6: International Commerce & FX Orchestration (EBANKS)

Integrate international payment handling and FX calculations.

### Story 6.1: EBANKS Integration for International Payments
As a Customer buying an imported item,
I want to pay using EBANKS orchestration,
So that international compliance and FX are handled securely.

**Acceptance Criteria:**
**Given** an international marketplace item
**When** I select EBANKS at checkout
**Then** the system routes the payment through the EBANKS API
**And** international taxes (IOF) are included in the final total.

### Story 6.2: Cross-Border FX & IOF Calculation Service
As a Shopper,
I want to see the final BRL price for international items before I pay,
So that I have full transparency on the conversion cost.

**Acceptance Criteria:**
**Given** an item with an international price
**When** the checkout calculates the total
**Then** the system fetches real-time FX rates from EBANKS and adds IOF taxes
**And** a detailed tax breakdown is shown to the user.

## Epic 7: Order Management, Fulfillment & Marketplace

Implement the event-driven order pipeline and marketplace seller attribution.

### Story 7.1: Event-driven OMS Pipeline (Pub/Sub)
As an Operations Manager,
I want order status changes to trigger downstream events automatically,
So that logistics and notifications are handled in real-time.

**Acceptance Criteria:**
**Given** a change in order status (e.g., "Paid" to "Shipped")
**When** the status is updated in the database
**Then** an event is published to GCP Pub/Sub
**And** subscriber services (Email, WMS, Logistics) process the update.

### Story 7.2: Automated NF-e (Nota Fiscal) Generation
As a Customer,
I want to receive my official tax invoice (NF-e) as soon as the order is billed,
So that I have a valid proof of purchase.

**Acceptance Criteria:**
**Given** a paid order
**When** the billing service processes the order
**Then** an NF-e is generated and sent to the customer via email
**And** the XML/PDF is stored in Cloud Storage for future access.

### Story 7.3: Marketplace Seller Attribution
As a Shopper,
I want to see who is selling and shipping the product,
So that I can identify marketplace vs. direct sales.

**Acceptance Criteria:**
**Given** a product listing
**When** I view the page or search results
**Then** the system displays "Vendido e entregue por [Seller Name]"
**And** marketplace commissions are correctly calculated in the backend for every sale.

## Epic 8: Campaign Management, Accessibility & SEO

Add banner scheduling, sign language integration, and SEO optimizations.

### Story 8.1: CMS Scheduled Banner Management
As a Marketing Manager,
I want to schedule homepage banners for specific campaigns,
So that our promotions go live automatically.

**Acceptance Criteria:**
**Given** a campaign banner (e.g., "Dia do Baianinho")
**When** I set a start and end date in the CMS
**Then** the banner appears on the storefront only during that period
**And** assets are served via Cloud CDN for maximum performance.

### Story 8.2: Digital Accessibility: VLibras Integration
As a Deaf or Hard of Hearing User,
I want to use VLibras to translate content into Sign Language,
So that the portal is accessible to me.

**Acceptance Criteria:**
**Given** any page on the portal
**When** I click the VLibras widget
**Then** the 3D avatar translates the text content into Brazilian Sign Language (Libras)
**And** accessibility standards (WCAG) are maintained.

### Story 8.3: SEO Metadata & Core Web Vitals Optimization
As a Product Owner,
I want all pages to have optimized metadata and high performance,
So that we rank higher in search results and convert better.

**Acceptance Criteria:**
**Given** any page on the portal
**When** searched or audited
**Then** SEO metadata (title, description, OG tags) is present and page-specific
**And** the site maintains a "Good" rating for all Core Web Vitals.
