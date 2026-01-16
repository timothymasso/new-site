import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const funFacts = [
  "I once wrote a song about a bug in my code",
  "My favorite chord is whatever sounds good",
  "I spend way too much time on side projects",
  "I'm probably listening to music right now",
  "I have strong opinions about semicolons",
]

export default function About() {
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
    <section id="about" className="h-full px-4 pt-4 pb-0 relative overflow-hidden flex flex-col">
      <h2 
        className="text-2xl md:text-3xl font-light text-white mb-4 cursor-pointer hover:text-white/80 transition-colors"
        onClick={handleTitleClick}
      >
        About me
      </h2>
      <div className="space-y-3 text-sm md:text-base text-white/80 font-light leading-relaxed">
        <p>
          I'm a musician who got into coding, or maybe a coder who got into music? Either way, I like making cool stuff.
        </p>
        <p className="text-white/60 italic">
          {funFacts[currentFact]}
        </p>
        <p className="text-xs text-white/40 mt-4">
          (click the title to read more)
        </p>
      </div>
    </section>
  )
}
