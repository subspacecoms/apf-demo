# Addendum: Greenfield

This document captures additional depth, rejected alternatives, and technical considerations for the Greenfield product brief.

## Rejected Alternatives
- **End-to-End Encryption (E2EE) Sync:** While E2EE provides privacy, it still requires a cloud infrastructure and introduces complexity in key management. We rejected this to keep the "Minimalist" pillar absolute—zero network is simpler than "secure network."
- **CLI-only Interface:** While popular with the open-source community, we want Greenfield to be accessible to privacy-conscious non-developers, necessitating a clean GUI.

## Technical Considerations
- **Storage Format:** Standard JSON or SQLite. Using a human-readable format (like Markdown or JSON) allows users to manipulate their data even if the app isn't running.
- **Framework:** Investigating Rust/Tauri for a smaller footprint and better performance than Electron.
