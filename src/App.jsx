import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ProjectPage from './components/ProjectPage'
import AboutPage from './components/AboutPage'
import ProjectsPage from './components/ProjectsPage'
import ContactPage from './components/ContactPage'

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
          <div className="col-span-12 md:col-span-4 row-start-1 row-span-2 border border-white/30 flex items-start self-start" style={{ minHeight: 0, height: 'auto' }}>
            <Hero containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-8 row-start-1 row-span-6 overflow-y-auto overflow-x-hidden border border-white/30" style={{ minHeight: 0 }}>
            <Portfolio containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-4 row-start-4 row-span-1 overflow-hidden pb-0 border border-white/30" style={{ marginBottom: 0, paddingBottom: 0, minHeight: 0 }}>
            <About containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-2 row-start-5 row-span-2 overflow-y-auto pb-0 border border-white/30" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <Contact containerRef={containerRef} />
          </div>
          <div className="col-span-12 md:col-span-2 row-start-5 row-span-2 overflow-y-auto pb-0 border border-white/30" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <SocialLinks containerRef={containerRef} />
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/performances/:slug" element={<ProjectPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/compositions/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}
