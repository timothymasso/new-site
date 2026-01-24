# GitHub Pages Setup

This project is configured to deploy to GitHub Pages automatically.

## Configuration

- **Build output**: `docs/` folder
- **Base path**: `/new-site/` (matches repository name)
- **Deployment**: Automatic via GitHub Actions on push to `main` branch

## Manual Build for GitHub Pages

To build locally for GitHub Pages:

```bash
npm run build:gh-pages
```

This will build the site to the `docs/` folder with the correct base path.

## GitHub Pages Settings

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set **Source** to: **Deploy from a branch**
4. Set **Branch** to: **gh-pages** (if using branch) OR use **GitHub Actions** (recommended)

If using GitHub Actions (recommended):
- The workflow will automatically deploy on every push to `main`
- No additional configuration needed

## Local Development

For local development, use:

```bash
npm run dev
```

This uses the default base path `/` for localhost.

## Important Notes

- The `.nojekyll` file in `docs/` prevents Jekyll processing
- All static assets are copied to `docs/` during build
- The site will be available at: `https://timothymasso.github.io/new-site/`
