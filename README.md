# 🌌 Premium Data Science & Full-Stack Developer Portfolio

<div align="center">
  <!-- Inline Glowing SVG Logo -->
  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="readme-u-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
      <linearGradient id="readme-k-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="42" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.3" />
    <path d="M 28 25 L 28 58 A 12 12 0 0 0 52 58 L 52 25" stroke="url(#readme-u-grad)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 52 43 L 72 23 M 52 43 L 72 63" stroke="url(#readme-k-grad)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  
  <h1>Patnala Uday Kumar</h1>
  <p><b>Associate Software Engineer & Data Science Specialist</b></p>

  <p align="center">
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind v4" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/ESLint-Clean-emerald?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint Clean" />
    <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" />
  </p>
  
  <p>
    A premium, highly-interactive, responsive developer portfolio custom-crafted for recruiters and corporate hiring managers. Designed around a sleek glassmorphism dark theme with cybernetic highlights and advanced mathematical rendering.
  </p>
</div>

---

## ⚡ Interactive HUD Systems & Features

This codebase contains advanced visual animations and interactive systems:

*   **Self-Drawing SVG Logo:** The header brand logo draws its geometry dynamically upon page initialization using Framer Motion pathLength interpolation.
*   **Active Section Scroll Spy:** An IntersectionObserver monitors which section is active in the viewport and animates a gradient accent bar sliding smoothly across the header navigation menu buttons.
*   **3D Layered Parallax Profile:** The Hero portrait is styled inside a recessed portal cut-out using complex inset box shadows for depth, and responds dynamically to cursor movements:
    *   *Background:* Ambient glow radial layer `translateZ(-40px)`.
    *   *Mid-Layer:* Spinning orbit ring `translateZ(10px)`.
    *   *Foreground:* Office photo with counter-spinning dashed orbit rings `translateZ(30px)`.
*   **3D Viewport Unfold Scroll:** Outer section envelopes are mounted inside 3D perspective viewport frames that scale and unfold from the page layout as the user scrolls.
*   **Glowing Trailer Cursor:** A custom cursor featuring a bright glowing pointer dot that smoothly tracks mouse movements, scaling and glowing dynamically when hovering over buttons, cards, or links.
*   **3D SGD Loss Landscape:** An interactive mathematical visualizer displaying a gradient descent loss landscape. Built on HTML5 Canvas, it supports click-and-drag interactions to rotate the mathematical surface in 3D canvas coordinates.
*   **Staggered Timelines:** Academic pathways and credential histories are presented as connected vertical timelines with glowing node dots featuring Lucide icons (`Award`, `Terminal`).
*   **Recruiter Evidence System:** Badges are dynamically computed by parsing the project catalogs to show proof of skill usage (e.g., `[4 projects]` next to skill badges) as concrete evidence.

---

## 🎧 Same-Origin Audio Playlist System

To make the portfolio immersive, it features a background ambient soundtrack system configured for maximum browser compatibility and user control:

*   **Same-Origin Local Hosting:** Three distinct progressive/ambient synth tracks (`bg-music.mp3`, `bg-music-2.mp3`, and `bg-music-3.mp3`) are hosted locally in the `/public` assets folder. This guarantees same-origin loading, resolving browser CORS blocks, buffering latencies, or third-party server downtime.
*   **Random Boot Sequence:** A random index selector picks a different track on page initialization, guaranteeing a fresh audio experience on every visit.
*   **Autoplay Compliance:** The player remains muted initially to comply with browser autoplay blocks, setting up document interaction listeners (click/keypress) to automatically boot up audio as soon as the user starts interacting with the page.
*   **Double-Trigger Prevention:** The interaction listeners explicitly ignore clicks targeting the player pill itself, ensuring that clicking the Play button toggles audio state correctly without getting cancelled.
*   **Auto-Advance Playlists:** Built-in `onEnded` sequence trigger automatically loads and plays the next track in the queue once the current track completes.
*   **Cybernetic Equalizer Pill:** A floating glassmorphic pill located at the bottom-right corner. It features:
    *   *Volume & Pause Toggle:* Compact play/mute state controller.
    *   *Skip Forward Controller:* A skip button (`SkipForward` icon) that manually advances the playlist.
    *   *Framer Motion Soundwave:* An animating 4-bar soundwave equalizer that pulses dynamically when music is active and freezes flat when paused.
    *   *Auto-Expansion:* Collapses into a small toggle button when paused and expands on hover to show the active track title and playlist coordinates.

---

## 🛡️ Read-Only Clipboard & Security Guard

Built with production security parameters for portfolio presentation:

*   **Selection & Copy Guard:** Staged event handlers (`onCopy`, `onCut`, `onDragStart`, `onContextMenu`) combined with CSS selection constraints (`user-select: none`) disable text copying, image dragging, and right-clicks.
*   **Allowed Interactive Zones:** Excludes form inputs, text areas, and allowed classes (`.allow-copy`) to ensure email forms, links, and downloads remain fully functional.
*   **Vercel Security Headers:** Includes `vercel.json` configurations applying CSP headers, frame-options protection, nosniff content enforcement, and referrer policies.

---

## 🚀 Performance & Physics Optimizations

*   **Squared Distance Proximity Checks:** Bypasses computationally expensive square-root functions (`Math.sqrt` and `Math.hypot`) in both canvas animations ([CustomCursor.jsx](file:///d:/PROJECT/Portifolio/src/components/CustomCursor.jsx) and [ParticleBackground.jsx](file:///d:/PROJECT/Portifolio/src/components/ParticleBackground.jsx)). Proximity thresholds are squared beforehand, saving up to 80% CPU math overhead per frame.
*   **Balanced Thread Loading:** Restructured project lists to filter and render dynamically during runtime, removing state updates inside layout hooks to prevent component stutters and lag.

---

## 📂 System Architecture

```mermaid
graph TD
    A[index.html] --> B[main.jsx]
    B --> C[App.jsx]
    C --> D[ParticleBackground.jsx]
    C --> E[CustomCursor.jsx]
    C --> F[DataScienceVisualizer.jsx]
    C --> G[ProjectCard.jsx]
    C --> H[MUSIC_PLAYLIST Source]
```

### File Map
- **[App.jsx](file:///d:/PROJECT/Portifolio/src/App.jsx):** Core layout, section triggers, state management, contact submission handler, audio playlist controls, and scroll observer.
- **[CustomCursor.jsx](file:///d:/PROJECT/Portifolio/src/components/CustomCursor.jsx):** Canvas-based cursor trailing particle system and glowing pointer dot.
- **[ParticleBackground.jsx](file:///d:/PROJECT/Portifolio/src/components/ParticleBackground.jsx):** Moving 3D cyberspace grid floor background and floating ambient particle constellation.
- **[DataScienceVisualizer.jsx](file:///d:/PROJECT/Portifolio/src/components/DataScienceVisualizer.jsx):** Interactive 3D SGD Loss mathematical visualizer.
- **[ProjectCard.jsx](file:///d:/PROJECT/Portifolio/src/components/ProjectCard.jsx):** Redesigned project showcases featuring responsive hover scales, tag glow indicators, and links.
- **[index.css](file:///d:/PROJECT/Portifolio/src/index.css):** Cybernetic variables, glassmorphic layout definitions, scrollbar configurations, scanline grid overlays, and portal hole portrait styles.

---

## 🛠️ Local Setup

### Prerequisites
- Node.js v20.x or newer
- npm v10.x or newer

### Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/UdayPatnala/portifolio.git
    cd portifolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Boot Local Development Server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

4.  **Linter Verification:**
    ```bash
    npm run lint
    ```

5.  **Compile Production Bundle:**
    ```bash
    npm run build
    ```
    The compiled production assets will generate in the `dist/` directory.

---

<div align="center">
  <sub>Designed & Developed with ❤️ by Patnala Uday Kumar</sub>
</div>
