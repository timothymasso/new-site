import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VariableProximity from '../ui/VariableProximity'
import GradientText from '../ui/GradientText'

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
    <section id="about" className="h-full relative overflow-hidden flex flex-col" style={{ 
      minHeight: 0,
      minWidth: 0,
      maxWidth: '100%',
      padding: 'clamp(0.75rem, 2vw, 1.5rem)',
      paddingTop: 'clamp(0.75rem, 2vh, 1.5rem)',
      paddingBottom: 'clamp(0.75rem, 2vh, 1.5rem)',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
        <h2 
          className="font-light text-white cursor-pointer hover:text-white/80 transition-colors"
          style={{ 
            fontSize: 'clamp(0.875rem, 2vw, 1.5rem)',
            marginBottom: 'clamp(0.375rem, 1vh, 0.75rem)',
            lineHeight: '1.2'
          }}
          onClick={handleTitleClick}
        >
          <VariableProximity label="About me" containerRef={containerRef} radius={90} falloff="gaussian" className="font-light text-white" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' }} />
        </h2>
        <div className="text-white font-light leading-relaxed" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)', lineHeight: '1.4' }}>
          <p>
            <VariableProximity label="Sonic architect and computer guy. I make music, write code, build things, and usually mix it all together." containerRef={containerRef} radius={60} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)' }} />
          </p>
        </div>
      </div>
      <div className="text-white font-light" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)', lineHeight: '1.4' }}>
        <p style={{ marginBottom: 'clamp(0.25rem, 0.75vh, 0.5rem)' }}>
          <VariableProximity label="timothy.masso@gmail.com" containerRef={containerRef} radius={60} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)' }} />
        </p>
        <p style={{ marginBottom: 'clamp(0.375rem, 1vh, 0.75rem)' }}>
          <VariableProximity label="NYC & Cleveland area" containerRef={containerRef} radius={60} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)' }} />
        </p>
        <div className="flex flex-wrap" style={{ gap: 'clamp(0.375rem, 1vw, 0.75rem)' }}>
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
              className="font-light"
              style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}
            >
              <VariableProximity label={link.name} containerRef={containerRef} radius={90} falloff="gaussian" className="font-light" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }} />
            </GradientText>
          </a>
        ))}
        </div>
      </div>
    </section>
  )
}
