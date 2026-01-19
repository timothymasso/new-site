import React, { useRef, useEffect } from 'react'
import Navigation from '../layout/Navigation'
import Footer from '../layout/Footer'
import ScrollProgress from '../ui/ScrollProgress'
import Contact from '../sections/Contact'

export default function MusicPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="relative z-10 pointer-events-none h-screen overflow-hidden" ref={containerRef}>
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto h-full relative flex flex-col" style={{ paddingTop: 'clamp(2rem, 4vh, 4rem)' }}>
        <div className="flex-1 overflow-hidden" style={{ 
          paddingLeft: 'clamp(1rem, 2.5vw, 1.75rem)',
          paddingRight: 'clamp(1rem, 2.5vw, 1.75rem)',
          paddingTop: 'clamp(0.75rem, 2vh, 1.25rem)',
          paddingBottom: 'clamp(0.75rem, 2vh, 1.25rem)',
          minWidth: 0,
          minHeight: 0
        }}>
          <div className="h-full border border-white/30 overflow-hidden">
            <Contact containerRef={containerRef} />
          </div>
        </div>
        <Footer />
      </div>
      <ScrollProgress />
    </div>
  )
}
