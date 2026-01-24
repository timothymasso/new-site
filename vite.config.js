import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: base = /repo-name/ when GITHUB_PAGES=true
const base = process.env.GITHUB_PAGES === 'true' ? '/new-site/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: process.env.GITHUB_PAGES === 'true' ? 'docs' : 'dist',
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
