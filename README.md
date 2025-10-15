# Hyper-Carz

Hyper-Carz is an editorial-grade Koenigsegg showcase paired with a track strategy simulator. The site highlights the current
lineup with long-form visuals, dives into the brand’s aero philosophy, and challenges visitors to dispatch the right car for
realistic record attempts.

## Highlights

- **Immersive hero experience** featuring professional photography, layered gradients, and refined typography inspired by
  Koenigsegg’s visual language.
- **Spec-driven storytelling** with responsive cards covering the Jesko Absolut, Regera, and Gemera alongside key aero and
  engineering callouts.
- **Track strategy simulator** that places you in the performance director’s seat—log your call sign, study real-world runways,
  and deploy the Koenigsegg best equipped to hit the target speed under changing conditions.

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

- `index.html` – Semantic layout for the hero, lineup, aero lab, and simulator sections.
- `style.css` – Dark-mode visual system, typography, responsive grid utilities, and simulator styling.
- `app.js` – Navigation toggle, simulator state machine, and mission log generation.

## Development notes

- JavaScript relies on modern DOM APIs; no build step or framework is required.
- Simulator copy and speed targets are based on publicly shared manufacturer goals and test data.
- The layout is fully responsive, supporting large-format displays down to mobile breakpoints.

Feel free to adapt the copy, imagery, or scenarios to feature additional hypercars or bespoke challenges.
