import React from 'react'
import { useFPS } from '../../hooks/useFPS'

export default function Footer() {
  const fps = useFPS()

  return (
    <footer className="absolute bottom-0 left-0 right-0 px-6 py-2 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xs text-white/95 font-light">
          © {new Date().getFullYear()} made with ☕ and 🎵
        </div>
        <div className="text-xs text-white/95 font-light absolute left-1/2 transform -translate-x-1/2">
          {fps} FPS
        </div>
        <div className="text-xs text-white/95 font-light">
          always open to cool projects
        </div>
      </div>
    </footer>
  )
}
