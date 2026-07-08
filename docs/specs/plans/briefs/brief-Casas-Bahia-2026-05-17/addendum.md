# Addendum: Casas Bahia Technical & Compliance Context

## Technical Considerations
*   **Architecture Pattern:** Recommendation for a MACH (Microservices, API-first, Cloud-native, Headless) architecture to solve the "update difficulty" issue.
*   **Frontend Stack:** Likely candidates: Next.js for SSR/ISR to maintain SEO (critical for retail) while providing a modern DX.
*   **Security Layer:** Integration of WAF (Web Application Firewall), DDoS protection, and automated SAST/DAST in the deployment pipeline.

## Security & Compliance Deep-Dive
*   **PCI-DSS:** Critical for handling payments securely.
*   **LGPD:** Brazilian data protection law compliance must be automated within the data layer.
*   **Audit Trails:** Implementation of immutable logs for all administrative actions on the portal.

## Identified Gaps (For Discovery)
*   **Integration Points:** Need to audit all 3rd-party integrations (trackers, payment gateways, recommendation engines) to ensure they meet the new security standards.
*   **Legacy API Health:** Assess whether existing backend APIs can support a Headless frontend or if they also require a "strangler pattern" revamp.
