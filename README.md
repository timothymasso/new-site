# Timothy Masso's Website

A static website showcasing performances, projects, and compositions, enhanced with React and Three.js.

## Setup

First, install the dependencies:
```bash
npm install
```

## Running the Site

### Development Mode (Recommended)
```bash
npm run dev
```
This will start the Vite development server at http://localhost:8000 with hot module replacement.

### Building for Production
```bash
npm run build
```
This will create an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
This will serve the production build locally for testing.

### Alternative: Static Server (for production build only)
After building, you can serve the `dist/` directory using any static file server:
```bash
npm run serve
```
or
```bash
python -m http.server 8000
```

## Structure

- `index.html` - Main homepage
- `src/` - React source files
  - `Dither.jsx` - Three.js dithering wave effect component
  - `main.jsx` - React entry point
- `assets/` - All site assets (images, CSS, etc.)
- `_performances/` - Performance pages
- `_dataprojects/` - Data science projects
- `_compositions/` - Composition pages
- `_typewriters/` - Typewriter project pages
- `_aboutme/` - About me page

## Technologies

- React 18
- Three.js
- @react-three/fiber
- @react-three/postprocessing
- Vite (build tool)
