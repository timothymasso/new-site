import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ProjectPage from './components/ProjectPage'
import AboutPage from './components/AboutPage'
import ProjectsPage from './components/ProjectsPage'
import ContactPage from './components/ContactPage'

function Home() {
  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="relative z-10 pointer-events-none h-screen overflow-hidden">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto h-full pt-8 relative">
        <div className="h-full grid grid-cols-12 grid-rows-6 gap-4 pl-6 pr-6 pt-1 pb-0 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
          <div className="col-span-12 md:col-span-4 row-span-3">
            <Hero />
          </div>
          <div className="col-span-12 md:col-span-8 row-span-4 overflow-y-auto">
            <Portfolio />
          </div>
          <div className="col-span-12 md:col-span-4 row-span-2 overflow-y-auto pb-0" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <About />
          </div>
          <div className="col-span-12 md:col-span-4 row-span-2 overflow-y-auto pb-0" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <Skills />
          </div>
          <div className="col-span-12 md:col-span-4 row-span-2 overflow-y-auto pb-0 border-l border-white/10" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <Contact />
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
