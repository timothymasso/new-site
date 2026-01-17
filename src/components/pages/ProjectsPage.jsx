import React, { useRef } from 'react'
import Navigation from '../layout/Navigation'
import Footer from '../layout/Footer'
import WorkGrid from '../ui/WorkGrid'
import VariableProximity from '../ui/VariableProximity'

export default function ProjectsPage() {
  const containerRef = useRef(null)
  
  return (
    <div className="relative z-10 pointer-events-none min-h-screen" ref={containerRef}>
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <div className="pt-24 md:pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              <VariableProximity label="All Projects" containerRef={containerRef} radius={90} falloff="gaussian" className="text-4xl md:text-5xl font-light text-white" />
            </h1>
            <p className="text-white font-light text-lg max-w-2xl">
              <VariableProximity label="A collection of performances, data projects, and code I've worked on" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light text-lg" />
            </p>
          </div>
          <WorkGrid containerRef={containerRef} />
        </div>
        <Footer />
      </div>
    </div>
  )
}
