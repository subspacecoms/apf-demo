---
stepsCompleted:
  - Step 1: Validate Prerequisites and Extract Requirements
inputDocuments:
  - docs/specs/plans/prds/prd-Greenfield-2026-05-17/prd.md
  - docs/specs/plans/briefs/brief-Greenfield-2026-05-17/brief.md
---

# Greenfield Privacy Todo - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Greenfield Privacy Todo, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Biometric Gate - System must require biometric authentication (FaceID/TouchID) or device passcode before granting access.
FR2: Local CRUD - User can create, read, update, and delete tasks without a network connection.
FR3: Peer Pairing - Users pair devices using a one-time QR code or manual key entry for E2EE sync.
FR4: Conflict Resolution (LWW) - Use "Last Write Wins" based on device-local timestamps for simultaneous edits.
FR5: Hierarchical Lists - Support for organizing tasks into hierarchies.
FR6: Tagging - Support for tagging tasks.
FR7: Rich Notes - Markdown support for detailed task descriptions.

### NonFunctional Requirements

NFR1: Zero-Knowledge Privacy - 100% of tasks in database and transit are encrypted; developers cannot see content.
NFR2: Local-First Architecture - Primary data source is local storage; network is optional.
NFR3: AES-256 Encryption - Vault must use SQLCipher with AES-256 standards.
NFR4: Performance (Launch) - Launch time to "ready-to-type" state must be < 100ms.
NFR5: Resource Efficiency - App binary size must be < 50MB.
NFR6: No Telemetry - Zero third-party analytics, tracking, or heartbeat pings allowed.
NFR7: Security Compliance - Must pass an external pen-test before Public Beta.
NFR8: Native Platforms - Target iOS and macOS native applications first.

### Additional Requirements

- None identified from Architecture.

### UX Design Requirements

- None identified from UX Design specifications.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
