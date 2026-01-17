# Project Structure

This document describes the professional folder structure of the website.

## Directory Structure

```
/
├── public/                    # Static assets served as-is by Vite
│   └── content/              # Static HTML content
│       ├── _performances/    # Performance pages
│       ├── _dataprojects/    # Data project pages
│       └── _aboutme/         # About me content
│
├── src/
│   ├── components/           # React components
│   │   ├── layout/           # Layout components (Navigation, Footer, Header)
│   │   ├── pages/            # Page-level components (AboutPage, ContactPage, etc.)
│   │   ├── sections/        # Section components (Hero, About, Contact, Portfolio)
│   │   ├── ui/               # Reusable UI components
│   │   └── effects/          # Visual effects (Dither, etc.)
│   │
│   ├── hooks/                # Custom React hooks
│   ├── styles/                # CSS files
│   ├── utils/                # Utility functions
│   ├── constants/            # Constants and configuration
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Application entry point
│
├── assets/                   # Legacy assets (images, PDFs, etc.)
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## Component Organization

### Layout Components (`src/components/layout/`)
- **Navigation.jsx** - Main navigation bar
- **Footer.jsx** - Site footer
- **Header.jsx** - Site header (legacy)

### Page Components (`src/components/pages/`)
- **AboutPage.jsx** - About page
- **ContactPage.jsx** - Contact page
- **ProjectsPage.jsx** - Projects listing page
- **ProjectPage.jsx** - Individual project/performance page

### Section Components (`src/components/sections/`)
- **Hero.jsx** - Hero section for homepage
- **About.jsx** - About section for homepage
- **Contact.jsx** - Contact section for homepage
- **Portfolio.jsx** - Portfolio section for homepage

### UI Components (`src/components/ui/`)
Reusable UI components including:
- GradientText
- VariableProximity
- ScrollProgress
- WorkCard, WorkGrid
- PerformanceList, ProjectList
- And more...

### Effects (`src/components/effects/`)
- **Dither.jsx** - Three.js dithering wave background effect

## Import Patterns

### Using Index Files
You can import from index files for cleaner imports:
```javascript
import { Navigation, Footer } from './components/layout'
import { Hero, About } from './components/sections'
import { GradientText, VariableProximity } from './components/ui'
```

### Direct Imports
Or import directly:
```javascript
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
```

## Styles

All CSS files are located in `src/styles/`:
- `index.css` - Main stylesheet
- `Dither.css` - Dither effect styles
- `GradientText.css` - Gradient text styles
- `VariableProximity.css` - Variable proximity styles

## Static Content

Static HTML content is served from `public/content/`:
- Accessible at `/content/_performances/...`
- Accessible at `/content/_dataprojects/...`
- Accessible at `/content/_aboutme/...`

## Best Practices

1. **Component Organization**: Keep components in their appropriate folders
2. **Import Paths**: Use relative paths for imports within the same directory level
3. **Styles**: Keep component-specific styles in `src/styles/` and import them in components
4. **Static Assets**: Place static files in `public/` for direct access
5. **Hooks**: Custom hooks go in `src/hooks/`
6. **Utils**: Utility functions go in `src/utils/`
