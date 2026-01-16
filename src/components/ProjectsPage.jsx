import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import WorkGrid from './WorkGrid'

export default function ProjectsPage() {
  return (
    <div className="relative z-10 pointer-events-none min-h-screen">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <div className="pt-24 md:pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              All Projects
            </h1>
            <p className="text-white/60 font-light text-lg max-w-2xl">
              A collection of performances, data projects, and code I've worked on
            </p>
          </div>
          <WorkGrid />
        </div>
        <Footer />
      </div>
    </div>
  )
}
