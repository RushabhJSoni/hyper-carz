# Hyper-Carz

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
