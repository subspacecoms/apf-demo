# Addendum: Greenfield Technical Considerations

## Tech Stack Trade-off: Rust (Tauri) vs. Electron
While Electron is easier to develop for, it was rejected for Greenfield due to:
- **Binary Size:** Electron apps average 150MB+; Tauri apps average <10MB.
- **Memory Usage:** Electron's Chromium instances are resource-heavy, contradicting the "Zen/Minimalist" goal.
- **Launch Speed:** Rust-based binaries can easily hit the <150ms launch target, whereas Electron often struggles with "cold boots."

## Peer-to-Peer (P2P) Sync Research
Future versions may consider:
- **Syncthing Integration:** Allowing users to point to a local folder that they sync themselves.
- **Local WiFi Sync:** A "sync over local air" feature that never touches the public internet.

## Storage Formats
- **Option A (Markdown):** High portability, human-readable even without the app.
- **Option B (SQLite):** Faster querying for large lists, but less "transparent" to the average user.
- **V1 Decision:** Start with Markdown/JSON for ultimate transparency, move to SQLite only if performance demands it.
