import React, { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Portfolio from './components/sections/Portfolio'
import Contact from './components/sections/Contact'
import SocialLinks from './components/ui/SocialLinks'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'

// Lazy load route components for code splitting
const ProjectPage = lazy(() => import('./components/pages/ProjectPage'))
const AboutPage = lazy(() => import('./components/pages/AboutPage'))
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'))
const MusicPage = lazy(() => import('./components/pages/MusicPage'))

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-white font-light">Loading...</p>
  </div>
)

function Home() {
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
        <div className="flex-1 grid grid-cols-12 overflow-hidden" style={{ 
          gridTemplateRows: '1.2fr 2fr',
          gap: 'clamp(0.625rem, 1.75vw, 1rem)',
          paddingLeft: 'clamp(1rem, 2.5vw, 1.75rem)',
          paddingRight: 'clamp(1rem, 2.5vw, 1.75rem)',
          paddingTop: 'clamp(0.75rem, 2vh, 1.25rem)',
          paddingBottom: 'clamp(0.75rem, 2vh, 1.25rem)',
          minWidth: 0,
          minHeight: 0
        }}>
          <div className="col-span-12 md:col-span-4 row-start-1 row-span-1 border border-white/30 overflow-hidden flex" style={{ minHeight: 0, minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
            <Hero containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-8 row-start-1 row-span-3 overflow-y-auto overflow-x-hidden border border-white/30" style={{ minHeight: 0, minWidth: 0, maxWidth: '100%', marginRight: 'calc(-1 * clamp(1rem, 2.5vw, 1.75rem))', paddingRight: 0 }}>
            <Portfolio containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-4 row-start-2 row-span-2 overflow-hidden border border-white/30 flex" style={{ minHeight: 0, minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
            <About containerRef={containerRef} />
          </div>
        </div>
        <Footer />
      </div>
      <ScrollProgress />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/performances/:slug" element={<ProjectPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/compositions/:slug" element={<ProjectPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
