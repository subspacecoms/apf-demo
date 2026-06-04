---
title: Greenfield Privacy-Focused Todo App
status: draft
created: 2026-05-17
updated: 2026-05-17
---

# Product Brief: Greenfield Privacy Todo

## Vision
To provide a task management experience where the user—and only the user—owns their data. Greenfield aims to be the most trusted todo app for individuals who refuse to compromise their personal productivity data to cloud providers or big-tech profiling.

## The Problem
Most modern todo apps (Todoist, Any.do, etc.) store task data in plain text on their servers to facilitate sync and features. For users with high-security needs or a strong preference for data sovereignty, this represents a significant privacy risk and a lack of control.

## Target Audience
- **Privacy Enthusiasts:** Users who actively avoid centralized cloud services.
- **Security-Conscious Professionals:** Journalists, lawyers, or developers handling sensitive project names and timelines.
- `[ASSUMPTION]` **Digital Minimalists:** Users looking for a tool that doesn't track their behavior for "engagement metrics."

## Proposed Solution: Core Pillars
1. **Local-First Storage:** Data is stored on the device by default. No account creation is required to start using the app.
2. **Zero-Knowledge Sync:** `[ASSUMPTION]` Optional cloud sync uses end-to-end encryption where the user holds the keys. Greenfield servers (if any) never see the task content.
3. **Biometric/PIN Lock:** Immediate app-level security to prevent local physical access.
4. **No Analytics:** `[ASSUMPTION]` Zero third-party tracking or telemetry.

## Scope
### In-Scope
- Task CRUD (Create, Read, Update, Delete).
- Hierarchical lists and tags.
- Local notifications/reminders.
- Encrypted export/import (JSON/Markdown).
- Basic Markdown support for task notes.

### Out-of-Scope (for Initial Demo)
- Multi-user collaboration (difficult with E2EE).
- Natural Language Processing (NLP) for date parsing that requires server-side processing.
- Third-party integrations (Zapier, Slack) that would leak metadata.

## Success Metrics
- **Data Integrity:** Zero instances of unencrypted data reaching any network.
- **User Retention:** High daily active usage (DAU) among the privacy-focused niche.
- **Performance:** App launch and search speed (crucial for local-first apps).

## Open Questions
- Should we support "Secret Sync" via third-party providers like iCloud/Google Drive (encrypted) or maintain our own encrypted sync relay?
- Is there a viable path for collaborative lists without compromising the zero-knowledge foundation?
