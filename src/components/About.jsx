import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VariableProximity from './VariableProximity'

const funFacts = [
  "I once wrote a song about a bug in my code",
  "My favorite chord is whatever sounds good",
  "I spend way too much time on side projects",
  "I'm probably listening to music right now",
  "I have strong opinions about semicolons",
]

export default function About({ containerRef }) {
  const [currentFact, setCurrentFact] = useState(0)
  const navigate = useNavigate()

  const handleTitleClick = (e) => {
    e.stopPropagation()
    navigate('/about')
  }

  const handleClick = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length)
  }

  return (
    <section id="about" className="h-full px-3 pt-3 pb-3 relative overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
      <h2 
        className="text-xl md:text-2xl font-light text-white mb-2 cursor-pointer hover:text-white/80 transition-colors"
        onClick={handleTitleClick}
      >
        <VariableProximity label="About me" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xl md:text-2xl font-light text-white" />
      </h2>
      <div className="text-xs md:text-sm text-white font-light leading-relaxed">
        <p>
          <VariableProximity label="I'm a musician who got into coding, or maybe a coder who got into music? Either way, I like making cool stuff." containerRef={containerRef} radius={60} falloff="gaussian" className="text-xs md:text-sm text-white font-light" />
        </p>
      </div>
    </section>
  )
}
