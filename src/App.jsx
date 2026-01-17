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
      <div className="pointer-events-auto h-full pt-8 relative">
        <div className="h-full grid grid-cols-12 gap-[min(1rem,2vw)] pl-[min(1.5rem,3vw)] pr-[min(1.5rem,3vw)] pt-[min(1rem,2vh)] pb-0 overflow-hidden" style={{ 
          height: 'calc(100vh - 4rem)',
          gridTemplateRows: 'repeat(6, minmax(0, 1fr))'
        }}>
          <div className="col-span-12 md:col-span-4 row-start-1 row-span-2 border border-white/30 overflow-y-auto overflow-x-hidden" style={{ minHeight: 0 }}>
            <Hero containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-8 row-start-1 row-span-6 overflow-y-auto overflow-x-hidden border border-white/30" style={{ minHeight: 0 }}>
            <Portfolio containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-4 row-start-3 row-span-2 overflow-y-auto pb-0 border border-white/30" style={{ marginBottom: 0, paddingBottom: 0, minHeight: 0 }}>
            <About containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-4 row-start-5 row-span-2 overflow-y-auto pb-0 border border-white/30" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <Contact containerRef={containerRef} />
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
          <Route path="/performances/:slug" element={<ProjectPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/compositions/:slug" element={<ProjectPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
