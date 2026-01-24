import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: base should match your repository name
// Change '/new-site/' to match your actual repo name if different
// Set GITHUB_PAGES=true when building for GitHub Pages
const base = process.env.GITHUB_PAGES === 'true' ? '/new-site/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'docs',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber'],
          'motion-vendor': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 8000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three', '@react-three/fiber']
  }
})
