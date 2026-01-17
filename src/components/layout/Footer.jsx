import React from 'react'
import { useFPS } from '../../hooks/useFPS'

export default function Footer() {
  const fps = useFPS()

  return (
    <footer className="absolute bottom-0 left-0 right-0 px-6 py-2 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-xs text-white/95 font-light">
          {fps} FPS
        </div>
      </div>
    </footer>
  )
}
