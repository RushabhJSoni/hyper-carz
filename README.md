# Hyper-Carz

Hyper-Carz is an editorial-grade Koenigsegg showcase paired with a proving-ground simulator. The site spotlights the brand’s
aero intelligence, presents a curated vehicle lineup, and challenges visitors to manage real-world conditions across three
missions.

## Highlights

- **Cinematic landing experience** with layered lighting effects, dark luxury palette, and high-resolution photography sourced
  from Unsplash for the hero and lineup features.
- **Engineering intelligence briefing** that explains adaptive aero, thermal strategy, and surface dynamics before you enter the
  simulator.
- **Multi-factor strategy simulator** where you log a call sign, select chassis, aero trim, tire compound, and hybrid
  deployment, then receive telemetry-driven feedback based on stability, reliability, and thermal modelling.

## Previewing the site

Everything runs client-side, so any static web server works for local previewing or hosting.

### Local preview

1. Clone the repository and move into the project directory.
2. Start a static file server from the repository root. For example:
   ```bash
   python3 -m http.server 8000
   ```
3. Navigate to [http://localhost:8000](http://localhost:8000) in your browser.

### GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, select the branch (usually `main`) and the root folder (`/`).
3. Save your changes—GitHub Pages will deploy automatically.

_Remote photography is sourced from Unsplash and loads directly from their CDN, so no additional asset configuration is
required._

## Project structure

- `index.html` – Semantic layout for the hero, intelligence brief, lineup, aero lab, and simulator.
- `style.css` – Premium dark-mode visual system, responsive grid utilities, and simulator interface styling.
- `app.js` – Navigation toggle logic, simulator state machine, strategy evaluation model, and mission log generation.

## Development notes

- JavaScript relies on modern DOM APIs; no build step or framework is required.
- Simulator copy and speed targets are inspired by publicly shared manufacturer goals, proving-ground data, and aero
  modelling.
- The layout is fully responsive, supporting ultrawide displays down to mobile breakpoints.

Feel free to adapt the copy, imagery, or scenarios to feature additional hypercars or bespoke challenges.
