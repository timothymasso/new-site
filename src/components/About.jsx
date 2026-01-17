import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VariableProximity from './VariableProximity'
import GradientText from './GradientText'

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

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/timothymasso', colors: ['#A78BFA', '#F472B6', '#22D3EE'] },
    { name: 'Cosmos', url: 'https://www.cosmos.so/timothymasso', colors: ['#8B5CF6', '#EC4899', '#06B6D4'] },
    { name: 'Instagram', url: 'https://instagram.com/timothymasso', colors: ['#FB7185', '#FB923C', '#FCD34D'] },
  ]

  const handleTitleClick = (e) => {
    e.stopPropagation()
    navigate('/about')
  }

  const handleClick = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length)
  }

  return (
    <section id="about" className="h-full px-3 pt-3 pb-3 relative overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
      <div className="mb-12">
        <h2 
          className="text-xl md:text-2xl font-light text-white mb-3 cursor-pointer hover:text-white/80 transition-colors"
          onClick={handleTitleClick}
        >
          <VariableProximity label="About me" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xl md:text-2xl font-light text-white" />
        </h2>
        <div className="text-xs md:text-sm text-white font-light leading-relaxed">
          <p>
            <VariableProximity label="Sonic architect and computer guy. I make music, write code, build things, and usually mix it all together." containerRef={containerRef} radius={60} falloff="gaussian" className="text-xs md:text-sm text-white font-light" />
          </p>
        </div>
      </div>
      <div className="text-xs md:text-sm text-white font-light">
        <p className="mb-2">
          <VariableProximity label="timothy.masso@gmail.com" containerRef={containerRef} radius={60} falloff="gaussian" className="text-xs md:text-sm text-white font-light" />
        </p>
        <p className="mb-3">
          <VariableProximity label="NYC & Cleveland area" containerRef={containerRef} radius={60} falloff="gaussian" className="text-xs md:text-sm text-white font-light" />
        </p>
        <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <GradientText
              animationSpeed={10.5}
              colors={link.colors}
              pauseOnHover={false}
              className="text-sm font-light"
            >
              <VariableProximity label={link.name} containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm font-light" />
            </GradientText>
          </a>
        ))}
        </div>
      </div>
    </section>
  )
}
