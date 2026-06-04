---
title: Greenfield Privacy-Focused Todo App PRD
status: final
created: 2026-05-17
updated: 2026-05-17
---

# PRD: Greenfield Privacy Todo

## 0. Document Purpose
This PRD defines the requirements for Greenfield v1, a local-first, privacy-centric task manager. It is intended for Product Managers, Lead Architects, and UX Designers to ensure a shared understanding of the "Privacy-First" technical constraints and user experience. It builds upon the *Greenfield Product Brief* and establishes the functional baseline for the "Secure Local" and "E2EE Sync" milestones.

## 1. Vision
Greenfield exists to restore digital sovereignty to personal productivity. Our vision is a world where managing your daily life doesn't require a trade-off with your data privacy. We provide a zero-compromise task management experience for those who demand absolute ownership of their information.

## 2. Target User

### 2.1 Primary Persona: The High-Stakes Professional
*Priya is an investigative journalist.* She manages sources, sensitive timelines, and travel plans. She avoids cloud-based tools like Notion or Todoist because a single data breach could compromise her work and her sources' safety. She needs a tool that is as fast and reliable as a system app but as secure as an encrypted vault.

### 2.2 Jobs To Be Done
- **Maintain Confidentiality:** Ensure that no one (including the app developers) can see the content of my tasks.
- **Immediate Capture:** Quickly jot down a thought or task without waiting for a server sync or login.
- **Cross-Device Continuity:** Access my tasks on my laptop and phone without sacrificing E2EE.

### 2.3 Key User Journeys

- **UJ-1: First Strike (Immediate Capture)**
  - **Persona + Context:** Priya is in a meeting and needs to note a follow-up.
  - **Entry state:** Phone locked, app not running.
  - **Path:** Priya wakes her phone, uses a Lock Screen widget or Haptic Touch to open the "Quick Add" screen. She is prompted for FaceID.
  - **Climax:** She types "Verify source X document" and hits save.
  - **Resolution:** The task is saved to the encrypted local DB immediately. She locks her phone and returns to her meeting.
  - **Edge case:** If FaceID fails twice, she must enter her device PIN to proceed; if that fails, the app remains locked and data inaccessible.

- **UJ-2: Seamless Secure Sync**
  - **Persona + Context:** Priya at her desk, wanting to see the tasks she added on her phone.
  - **Entry state:** macOS app open, authenticated. Phone nearby.
  - **Path:** She enables "Sync" in settings. She is presented with a 24-word recovery key to write down. She then scans a QR code on her phone from her laptop.
  - **Climax:** The phone and laptop establish a pair. The phone's local data is encrypted with her private key and sent via the relay.
  - **Resolution:** The laptop decrypts the data and populates her task list.
  - **Edge case:** If the relay is offline, the app shows a "Sync Pending" icon but allows her to continue working locally.

## 3. Glossary
- **Greenfield Relay** — A stateless, zero-knowledge server that facilitates the exchange of encrypted blobs between devices. It never sees the decryption keys.
- **Zero-Knowledge Sync** — A synchronization method where data is encrypted on the sender's device and decrypted only on the receiver's device.
- **Local-First** — An architecture where the primary data source is the device's local storage, and network connectivity is optional.
- **Vault** — The encrypted local database (SQLCipher) containing all user tasks and notes.

## 4. Features

### 4.1 Secure Vault (Local Storage)
**Description:** The core of Greenfield is the Vault. All user data is stored in an encrypted SQLite database using SQLCipher. Access to the app is guarded by system-level biometrics. Data is encrypted using AES-256 standards.

**Functional Requirements:**

#### FR-1: Biometric Gate
The system must require biometric authentication (FaceID/TouchID) or the device passcode before granting access to any task data. Realizes UJ-1.
**Consequences:**
- Data remains encrypted at rest even if the device is physically compromised.
- No "unlocked" state persists if the app is backgrounded for more than 30 seconds.

#### FR-2: Local CRUD
The user can create, read, update, and delete tasks without any network connection.
**Consequences:**
- Launch time to "ready-to-type" state must be < 100ms.

### 4.2 Zero-Knowledge Sync
**Description:** Multi-device sync using E2EE where users own their keys. A Rust-based relay is used for high performance and memory safety.

**Functional Requirements:**

#### FR-3: Peer Pairing
Users pair devices using a one-time QR code or manual key entry. Realizes UJ-2.
**Consequences:**
- No central "Account" or "Password" exists on the Greenfield Relay.

#### FR-4: Conflict Resolution (LWW)
In the event of simultaneous edits, the system uses "Last Write Wins" based on device-local timestamps.
**Note:** v1 implementation uses LWW; CRDTs are deferred to v2.

## 5. Non-Goals (Explicit)
- **Collaborative Lists:** We will not support shared lists in v1 to keep the encryption model simple (1:1 pairing).
- **Web App:** To maintain "Physical-Layer Security," we are not building a web version (which would require storing keys in the browser).

## 6. MVP Scope

### 6.1 In Scope
- iOS and macOS Native Apps.
- Encrypted Task CRUD.
- Tagging and Hierarchical Lists.
- E2EE Sync between 2 devices.

### 6.2 Out of Scope for MVP
- Windows/Android support.
- NLP date parsing.
- Third-party calendar integrations.

## 7. Success Metrics
- **SM-1: Zero-Plain-Text:** 100% of tasks in the database and in transit are encrypted. Validates FR-1, FR-3.
- **SM-2: Sync Reliability:** >99.9% of sync operations complete without manual intervention. Validates FR-4.
- **SM-C1: Onboarding Friction:** We will *not* optimize for "one-click" onboarding if it requires weakening the 24-word recovery key requirement.

## 8. Open Questions
1. Should we support iCloud Drive as an alternative sync transport to reduce relay costs?
2. How do we handle "forgotten recovery keys" without being able to reset them? (Finalized: We don't—users are responsible for their keys).

## 9. Assumptions Index (Confirmed)
- **AES-256:** Confirmed as the standard for the Vault.
- **Rust Relay:** Confirmed as the infrastructure for sync.
- **Apple First:** Confirmed initial platform target.

## 10. Constraints & Guardrails
- **Privacy:** No telemetry or "heartbeat" pings allowed.
- **Performance:** App binary size must be < 50MB.
- **Security:** Must pass an external pen-test before Gate 3 (Public Beta).
