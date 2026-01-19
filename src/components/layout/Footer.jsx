import React from 'react'
import { useFPS } from '../../hooks/useFPS'

export default function Footer() {
  const fps = useFPS()

  return (
    <footer className="border-t border-white/10 flex-shrink-0" style={{ 
      paddingLeft: 'clamp(1rem, 3vw, 2rem)',
      paddingRight: 'clamp(1rem, 3vw, 2rem)',
      paddingTop: 'clamp(0.375rem, 1vh, 0.75rem)',
      paddingBottom: 'clamp(0.375rem, 1vh, 0.75rem)',
      minHeight: 'clamp(2rem, 4vh, 3rem)'
    }}>
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-white/95 font-light" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
          {fps} FPS
        </div>
      </div>
    </footer>
  )
}
