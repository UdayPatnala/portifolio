# 01 - Project Audit Report

## 1. Current Architecture & Folder Structure
- **Core Framework**: React 19.2.6, Vite 8.0.12, Tailwind CSS v4.3.0 (CSS-first configuration).
- **Directory Structure**:
  - `src/App.jsx` - Monolithic 1900-line file containing the entire V1 landing page, project/experience data, form handling, and audio control.
  - `src/index.css` - Custom styles including glassmorphism, portrait effects, scanlines, and tailwind imports.
  - `src/components/` - Includes `CustomCursor`, `ParticleBackground`, `ProjectCard`, `CommandPalette`, and `DataScienceVisualizer`.
- **Routing**: Currently none. All content is rendered on a single landing page with scroll-spy navigation.

## 2. Technical Debt in V1
- **Monolithic App.jsx**: Combining layout, state, sub-components, dataset, and page logic makes maintenance and scalability difficult.
- **Tailwind v4 Integration**: Vite configuration uses `@tailwindcss/vite` plugin. Tailwind v4 uses CSS variables for theme customization instead of a `tailwind.config.js` file.

## 3. Architecture for V2
To preserve V1 pixel-perfect and build V2 independently:
1. **Isolate V1**: Copy `src/App.jsx` and V1 components/styles to a dedicated `src/v1/` directory.
2. **Version Controller**: Create a top-level Router or version switcher in `src/App.jsx` that loads either V1 or V2 based on route or local storage preference.
3. **Data Layer**: Create `src/v2/data/` as a centralized content management system (CMS) so that pages consume schema-validated JSON data.
4. **V2 Routing**: Use a simple client-side hash or state router to switch routes (Landing, About, Skills, etc.) or support independent tabs.

## 4. Risks & Mitigations
- **CSS Conflicts**: V1 and V2 could conflict if global CSS changes are made.
  - *Mitigation*: Scope V2 styles or use Tailwind v4 scoped classes to ensure V1 layout remains pixel-perfect.
- **Resource Overhead**: Multiple heavy canvas components (e.g., custom cursor, particles) active at the same time.
  - *Mitigation*: Ensure canvas elements are unmounted when switching between versions or routes.
