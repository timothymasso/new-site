# Timothy Masso's Website

A modern, interactive portfolio website showcasing performances, projects, and compositions. Built with React, Three.js, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The site will be available at `http://localhost:8000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── public/                 # Static assets served as-is
│   └── content/          # Static HTML content
│       ├── _performances/
│       ├── _dataprojects/
│       └── _aboutme/
│
├── src/
│   ├── components/       # React components
│   │   ├── layout/      # Layout components (Navigation, Footer)
│   │   ├── pages/       # Page components (AboutPage, ContactPage)
│   │   ├── sections/    # Section components (Hero, About, Portfolio)
│   │   ├── ui/          # Reusable UI components
│   │   └── effects/      # Visual effects (Dither background)
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS stylesheets
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants and configuration
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Application entry point
│
├── assets/               # Legacy assets (images, PDFs, etc.)
├── docs/                 # Documentation and reference files
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

For detailed structure documentation, see [docs/STRUCTURE.md](./docs/STRUCTURE.md)

## 🛠️ Technologies

- **React 18** - UI library
- **React Router** - Client-side routing
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/postprocessing** - Post-processing effects
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## 📝 Scripts

- `npm start` / `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve with Python HTTP server

## 🎨 Features

- Interactive Three.js background effects
- Responsive design
- Smooth animations and transitions
- Performance optimized
- SEO friendly

## 📄 License

MIT

## 👤 Author

Timothy Masso - [GitHub](https://github.com/timothymasso)
