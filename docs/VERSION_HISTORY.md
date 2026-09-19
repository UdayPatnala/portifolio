# Portfolio Version History

This document maintains the permanent, complete, chronological version history of Patnala Uday Kumar's portfolio repository (`UdayPatnala/portifolio`). It records every release milestone, architectural transformation, design pivot, and engineering revision.

---

## Versioning Framework

The portfolio follows Semantic Versioning (`MAJOR.MINOR.PATCH`):
- **MAJOR (`vX.0.0`)**: Comprehensive architectural migrations (e.g., V1 single-page to V2 modular hash routing).
- **MINOR (`vx.Y.0`)**: Major functional additions, compliance frameworks, SEO engines, or UX overhauls.
- **PATCH (`vx.y.Z`)**: Bug fixes, asset synchronization, copy updates, and performance tweaks.

---

## Release Milestones & Chronological Record

### [v2.3.0] — 2026-09-11
**Production Foundation, Anti-Vibe-Code UX Refinement, Performance Splitting & Hiring Audit**
- **Starting Commit**: `c1f6895`
- **Resulting Commit**: `4452dbd`
- **Objective**: Execute P1 (Production Foundation), P2 (SEO & Discoverability), P3 (Professional UX Anti-Vibe Refinement), and P4 (Performance & Hiring Readiness).
- **Key Changes**:
  - Code-split routes with `React.lazy` and `Suspense` terminal skeletons to shrink initial bundle from >522 kB to optimized vendor/page chunks.
  - Eliminated generic AI template language ("Production Matrix", "Technical Arsenal", "Verified Arsenal Component", exaggerated "Architect/Specialist" labels).
  - Grounded landing hero copy to authentic B.Tech graduate credentials in Java Backend and Data Science.
  - Replaced duplicate "View Live" buttons on non-web projects (CLI, desktop Swing, data pipelines) with clean "CLI / Backend" / "Source Only" badges.
  - Added empty and error states for project filtering and dynamic routes.
  - Added Webmaster verification tags readiness (Google Search Console & Bing Webmaster Tools).
  - Hardened accessibility (WCAG AA contrast, alt tags, aria-labels, semantic landmarks).
  - Established permanent version-control and execution-history documentation protocol under `docs/`.

### [v2.2.0] — 2026-09-11
**Theme Switcher (System/Light/Dark), DPDP Act 2023 Compliance & P3 SEO Engine**
- **Commits / Staged Tree**: Staged changes on `c1f6895`
- **Key Changes**:
  - Fixed reversed theme icon (Sun ☀ for Light, Moon ☾ for Dark).
  - Implemented 3rd theme option (`SYSTEM`) with live `prefers-color-scheme` listener.
  - Injected anti-flash initializer script in `<head>`.
  - Built comprehensive DPDP Act 2023 & Rules 2025 compliance flow: minimized contact form (Name, Email, Message only), standalone pre-submission notice, unchecked consent checkbox, frictionless consent withdrawal, and interactive data rights mailto console.
  - Rewrote `/privacy` with authentic 90-day retention schedule, FormSubmit.co and Google Fonts disclosures, zero tracking cookies.
  - Generated valid `robots.txt`, `sitemap.xml` (12 canonical routes), and `llms.txt` (AI crawler standard).
  - Added Schema.org JSON-LD graph (`WebSite`, `ProfilePage`, `Person`, `ItemList`).

### [v2.1.0] — 2026-09-08 to 2026-09-11
**Automated Resume Synchronization, Viewport Router & Academic Alignment**
- **Key Commits**:
  - `c1f6895`: Automate resume synchronization on prebuild, dev watch, and git commit.
  - `63fe375`: Update resume PDF file from resume directory.
  - `18c67ed`: Synchronize exact user resume PDF and match portfolio skill categories to resume.
  - `ca0b2ab`: Update portfolio skill inventory and project tags according to whitelist and removal rules.
  - `336b115`: Update resume PDF with cleaned skill list.
  - `d8aae84`: Update skills with Testing & QA category and sync updated resume PDF.
  - `c154cab`: Fix lint error in NextPageButton and setup IntersectionObserver mock for Vitest suite.
  - `12ea00a`: Update resume PDF sync and resolve CI testing library dependency for React 19.
  - `5f60ddc`: Update resume sync, skill levels (40-70% range), and projects section.
  - `19b6c2e`: Fix syntax error in Landing.jsx causing vercel build failure.
  - `f989769`: Merge about details into contact page.
  - `e496daa`: Remove About section and update graduation status.
  - `b2d318e`: Remove vercel references and inject sequential page navigation.
  - `257b01d`: Make version routing viewport-responsive (V1 on mobile, V2 on larger viewports).

### [v2.0.0] — 2026-09-01
**Architecture Evolution: Portfolio V2 Modular Hash Routing & CMS Ingestion**
- **Key Commits**:
  - `1fc0d04`: Implement portfolio V2 architecture, CMS, routing, and switcher.
  - `6389ab8`: Resolve switcher buttons, brand UDAY logo text, and add links to achievements with V1 publication sync.
  - `145323a`: Add research publication, automate routing switcher, and adjust card border visibility in dark theme.
  - `956e96b`: Save publication certificate locally and link it in both V1 and V2.
  - `05a59fc`: Replace SSC achievement with Udemy certification in V2, update publication certificate to point to PDF file, and remove pps folder.
  - `fb357ca`: Purge all markdown and documentation folders.

### [v1.8.0] — 2026-08-28
**Command Palette, Audio Decommissioning & Visual Refinements**
- **Key Commits**:
  - `d8e9a88`: Complete Google-tier overhaul with metadata, command palette, and branding.
  - `b88f1b9`: Update cursor, move resume to folder, adjust skills, and remove audio as requested.
  - `cff83a8`: Simplify audio toggler, set default autoplay ambient pad track at 40% volume, automate resume copying to public folder.
  - `399e157`: Optimize canvas loops with squared distance checks and reduce cursor particle count to eliminate cursor stutter and input latency.
  - `edd64d7`: Optimize timeline dot offsets for mathematical alignment and increase py padding of ShowcaseItem for premium spacing.

### [v1.5.0] — 2026-08-20
**Interactive Timelines, Capstone Database & Real Asset Ingestion**
- **Key Commits**:
  - `f720f31`: Introduce dynamic projects-skills count link badges, interactive timelines for Education/Training, and a prominent Resume CV download action on Hero Section.
  - `d912bfa`: Refactor: resolve all ESLint problems, optimize project filtering, and clean up Tailwind style class typos.
  - `9b3e9b8`: Implement recessed circular portal hole profile effect, add read-only presentation copy guard, fix header z-index, clean up handlePhotoChange dead code, add vercel.json security headers.
  - `7b5c602`: Clickable cert cards with real links - NPTEL, AWS Credly, Udemy.
  - `8af64ec`: Main profile pic in contact, no-image+github-banner for show-more cards.
  - `fbb3ffa`: Add remaining 8 workspace projects to PROJECT_DATA, showing only under expander.
  - `a66c78e`: Integrate real project screenshots, add Nebula project, and upgrade README.

### [v1.0.0] — 2026-08-15
**Initial Interactive Portfolio Deployment**
- **Key Commits**:
  - `38f587e`: Complete interactive data science developer portfolio.
  - `592ea0f`: Implement color-inverting custom cursor pointer.
  - `1850e82`: Design custom UK logo and integrate at browser tab bar favicon and navbar header, add advanced 3D scroll unfolding triggers, active nav underline layouts, micro-interactive tags, and skill bars.
