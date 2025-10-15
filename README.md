# Hyper-Carz

Hyper-Carz is a Koenigsegg performance programme microsite. The rebuild delivers a restrained, studio-grade presentation with
high-contrast editorial layouts and a telemetry-driven mission console that mirrors the factory validation workflow.

## Highlights

- **Professional landing experience** built around cinematic Unsplash photography, a refined dark palette, and responsive
  typography that scales from desktop dashboards to mobile devices.
- **Engineering dossier & innovation threads** that frame the core pillars—active control, thermal management, surface
  intelligence—and show how R&D inputs inform every slider in the console.
- **Mission console overhaul** with call-sign authentication, configuration cards, risk tolerance controls, reconnaissance
  options, telemetry sector logging, and an automated summary of every proving ground deployment.

_Remote imagery is sourced from Unsplash and streamed via their CDN so no asset pipeline is required._

## Previewing the site

The site is fully static; any file server is sufficient for local previewing or hosting.

### Local preview

1. Clone the repository and move into the project directory.
2. Start a static file server from the repository root. For example:
   ```bash
   python3 -m http.server 8000
   ```
3. Open [http://localhost:8000](http://localhost:8000) in your browser.

### GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, select the branch (commonly `main`) and the root folder (`/`).
3. Save the configuration—GitHub Pages will publish automatically.

## Project structure

- `index.html` – Semantic layout for the hero, briefing dossier, innovation highlights, and mission console.
- `style.css` – Visual system with layered lighting treatments, responsive grid utilities, and console UI styling.
- `app.js` – Navigation logic, simulator state machine, telemetry modelling, and mission summary rendering.

## Development notes

- JavaScript targets evergreen browsers and uses native modules—no build tooling is required.
- Simulator calculations combine configuration stats, recon modifiers, and per-scenario variability to model stability,
  reliability, thermal peaks, and terminal velocity.
- The layout is responsive down to small-screen breakpoints; navigation collapses into an accessible overlay menu.

Adapt the copy, imagery, or scenarios as needed to highlight additional programmes or bespoke proving grounds.
