import React, { useState } from 'react'
import VariableProximity from '../ui/VariableProximity'

const casualGreetings = [
  "Hey there!",
  "What's up?",
  "Yo!",
  "Hi!",
  "Hello!",
  "Hey!",
]

export default function Hero({ containerRef }) {
  const [greeting, setGreeting] = useState("Hello!")

  const handleGreetingClick = () => {
    const randomGreeting = casualGreetings[Math.floor(Math.random() * casualGreetings.length)]
    setGreeting(randomGreeting)
  }

  return (
    <section id="home" className="flex items-start justify-start relative h-full" style={{ 
      padding: 'clamp(0.75rem, 2vw, 1.5rem)',
      paddingTop: 'clamp(0.75rem, 2vh, 1.5rem)',
      paddingBottom: 'clamp(0.75rem, 2vh, 1.5rem)',
      minWidth: 0,
      maxWidth: '100%',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div className="w-full flex flex-col justify-start" style={{ minWidth: 0, maxWidth: '100%', height: '100%' }}>
        <h1 
          className="font-light text-white leading-[1.1] tracking-tight cursor-pointer transition-transform hover:scale-105"
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 4.5rem)',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            maxWidth: '100%',
            lineHeight: '1.1'
          }}
          onClick={handleGreetingClick}
        >
          <VariableProximity label={greeting} containerRef={containerRef} radius={90} falloff="gaussian" className="font-light text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)' }} />
          <br />
          <VariableProximity label="I'm Timothy." containerRef={containerRef} radius={90} falloff="gaussian" className="font-light text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)' }} />
        </h1>
        <p className="text-white font-light" style={{ 
          fontSize: 'clamp(0.75rem, 1.75vw, 1.25rem)',
          marginTop: 'clamp(0.375rem, 1vh, 1rem)',
          lineHeight: '1.4'
        }}>
          <VariableProximity label="I make sounds, code stuff, and sometimes both at the same time" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.75rem, 1.75vw, 1.25rem)' }} />
        </p>
        <div className="flex flex-wrap" style={{ 
          marginTop: 'clamp(0.5rem, 1.5vh, 1.5rem)',
          gap: 'clamp(0.375rem, 1vw, 1rem)'
        }}>
          <span className="text-white/85 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>
            <VariableProximity label="currently:" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white/85 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }} />
          </span>
          <span className="text-white font-light animate-pulse" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>
            <VariableProximity label="making music" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }} />
          </span>
          <span className="text-white/85 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>•</span>
          <span className="text-white font-light animate-pulse" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)', animationDelay: '1s' }}>
            <VariableProximity label="coding things" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }} />
          </span>
          <span className="text-white/85 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>•</span>
          <span className="text-white font-light animate-pulse" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)', animationDelay: '2s' }}>
            <VariableProximity label="vibing" containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }} />
          </span>
        </div>
      </div>
    </section>
  )
}
