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
Hyper-Carz is a single-page showcase of Koenigsegg's latest megacars with an interactive top-speed challenge. The experience now runs entirely in the browser without relying on disruptive pop-up prompts, making it ideal for sharing or hosting on GitHub Pages.

## Previewing the site

You can view the site locally or publish it using GitHub Pages.

### Local preview

1. Clone the repository.
2. Start a static file server from the project root:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit [http://localhost:8000](http://localhost:8000) in your browser.

Any static server (such as `npx serve`) will work—the site is entirely client-side.

### GitHub Pages

To publish with GitHub Pages:

1. Push the repository to GitHub.
2. Open **Settings → Pages** and choose either the `main` branch or a dedicated `gh-pages` branch.
3. Select the root directory (`/`) as the site folder and save.

GitHub Pages will build and serve the site automatically. Assets use relative paths, so no additional configuration is required.

## Project structure

- `index.html` – Landing page markup and layout.
- `style.css` – Styling for the hero, car features, and challenge components.
- `app.js` – Interactive workflow for the challenge (name capture, budget confirmation, and guessing game).
- `*.jpg` – Koenigsegg imagery used throughout the site.

## Development notes

- JavaScript uses modern DOM APIs without external dependencies.
- The interactive challenge supports keyboard navigation and provides inline validation feedback.
- Styling is responsive down to small-screen devices.

Feel free to fork the project and tailor the content or imagery to your own hypercar collection.
