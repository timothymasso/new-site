# Timothy Masso's Website

A modern, interactive portfolio website showcasing performances, projects, and compositions. Built with React, Three.js, and Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This site is configured for automatic deployment to GitHub Pages via GitHub Actions.

- **Build output**: `docs/` folder
- **Base path**: `/new-site/` (update in `vite.config.js` if your repo name differs)
- **Deployment**: Automatic on push to `main` branch

### Manual Deployment

To build for GitHub Pages locally:

```bash
npm run build:gh-pages
```

Then commit and push the `docs/` folder.

### Setup Instructions

1. Ensure GitHub Pages is enabled in repository settings
2. Set source to **GitHub Actions** (recommended) or **Deploy from a branch** → `main` → `/docs`
3. The site will be available at: `https://timothymasso.github.io/new-site/`

See [project-docs/GITHUB_PAGES_SETUP.md](./project-docs/GITHUB_PAGES_SETUP.md) for detailed setup instructions.

MIT

