# GitHub Pages Setup Instructions

## Quick Setup (Required First Time)

You need to enable GitHub Pages manually before the workflow can deploy:

1. **Go to your repository**: https://github.com/timothymasso/new-site
2. **Click "Settings"** (top menu)
3. **Click "Pages"** (left sidebar)
4. **Under "Source"**, select **"GitHub Actions"**
5. **Save** (no need to select a branch - GitHub Actions handles it)

## After Enabling

Once enabled, the workflow will automatically:
- Build your site on every push to `main`
- Deploy to GitHub Pages
- Your site will be live at: `https://timothymasso.github.io/new-site/`

## Troubleshooting

If you see "Get Pages site failed" error:
- Make sure GitHub Pages is enabled in Settings → Pages
- Make sure the source is set to "GitHub Actions" (not "Deploy from a branch")
- Wait a few minutes after enabling for GitHub to set up the Pages environment
- Check the Actions tab to see if the workflow is running

## Manual Build (Optional)

To build locally and test:

```bash
npm run build:gh-pages
```

This builds to the `docs/` folder with the correct base path.
