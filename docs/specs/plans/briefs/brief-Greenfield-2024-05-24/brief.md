# Product Brief: Greenfield (Privacy-First Todo)

**Status:** Draft
**Created:** 2024-05-24
**Updated:** 2024-05-24

## Executive Summary
Greenfield is a local-first task management application designed for individuals who prioritize data sovereignty above all else. Unlike mainstream productivity tools that sync data to proprietary clouds, Greenfield operates under a "Zero-Cloud" mandate. It provides a robust, professional-grade todo experience while ensuring that not a single byte of user data ever leaves the physical device unless explicitly exported by the user.

## The Problem
Modern productivity tools have turned personal task lists—which often contain sensitive life details, professional secrets, and habits—into data points stored on third-party servers. Users are forced to choose between the convenience of a modern UI and the security of their personal information. For the privacy-conscious user, existing "offline modes" are often afterthoughts, and the risk of a cloud leak or company policy change is a constant concern.

## The Solution
A high-performance mobile application that stores all data in a local, encrypted database. Greenfield provides the fluid interaction of a modern todo app (gestures, reminders, subtasks) without requiring an account, an internet connection, or a cloud subscription. 

### Key Features [ASSUMPTION]
*   **Encrypted Local Database:** All tasks and notes are stored using AES-256 encryption at rest on the device.
*   **Biometric Vault:** Access to the app is protected by FaceID/TouchID or a device-level PIN.
*   **P2P Local Sync:** Syncing across multiple devices (e.g., Phone and Tablet) occurs only over a local Wi-Fi network via peer-to-peer connection, bypassing the internet entirely.
*   **Manual Air-Gapped Backups:** Users can export an encrypted "Vault File" to move data to external hardware or personal storage.
*   **Smart Reminders:** Local notifications that don't rely on server-side push services.

## What Makes This Different
Greenfield’s "unfair advantage" is its radical transparency and technical isolation. While other apps claim privacy, Greenfield proves it by having no network stack for data transmission. It isn't "Cloud-Optional"; it is "Cloud-Impossible."

## Who This Serves
The **Sovereign Individual**. This user is tech-savvy, values privacy as a human right, and is willing to manage their own backups in exchange for the absolute certainty that their "to-do" list is for their eyes only.

## Success Criteria
*   **Zero External Requests:** Network monitoring confirms the app makes no outbound connections to non-system domains.
*   **Performance:** App launch and task filtering happen in <100ms due to local-only processing.
*   **User Retention:** The user successfully manages their daily life for 30 days without feeling the "pull" to return to a cloud-based alternative.

## Scope
*   **In-Scope:** Full CRUD for tasks, subtasks, priority levels, tagging system, encrypted local storage, and P2P Wi-Fi sync.
*   **Out-of-Scope:** Web version (requires a server), third-party integrations (Slack/Email), and collaborative/shared lists.

## Vision
In 2-3 years, Greenfield becomes the core of a "Local-First" productivity suite, expanding from tasks into notes and calendar management, serving as a private digital fortress for personal information.
