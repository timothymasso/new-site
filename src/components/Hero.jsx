import React, { useState } from 'react'
import VariableProximity from './VariableProximity'

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
    <section id="home" className="flex items-start justify-start px-3 pt-3 pb-3 relative">
      <div className="w-full flex flex-col justify-start">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight cursor-pointer transition-transform hover:scale-105"
          onClick={handleGreetingClick}
        >
          <VariableProximity label={greeting} containerRef={containerRef} radius={90} falloff="gaussian" className="text-5xl md:text-6xl lg:text-7xl font-light text-white" />
          <br />
          <VariableProximity label="I'm Timothy." containerRef={containerRef} radius={90} falloff="gaussian" className="text-5xl md:text-6xl lg:text-7xl font-light text-white" />
        </h1>
        <p className="text-lg md:text-xl text-white font-light mt-2">
          <VariableProximity label="I make sounds, code stuff, and sometimes both at the same time" containerRef={containerRef} radius={90} falloff="gaussian" className="text-lg md:text-xl text-white font-light" />
        </p>
        <div className="mt-3 flex gap-3 flex-wrap">
          <span className="text-sm text-white/85 font-light">
            <VariableProximity label="currently:" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white/85 font-light" />
          </span>
          <span className="text-sm text-white font-light animate-pulse">
            <VariableProximity label="making music" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white font-light" />
          </span>
          <span className="text-sm text-white/85 font-light">•</span>
          <span className="text-sm text-white font-light animate-pulse" style={{ animationDelay: '1s' }}>
            <VariableProximity label="coding things" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white font-light" />
          </span>
          <span className="text-sm text-white/85 font-light">•</span>
          <span className="text-sm text-white font-light animate-pulse" style={{ animationDelay: '2s' }}>
            <VariableProximity label="vibing" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white font-light" />
          </span>
        </div>
      </div>
    </section>
  )
}
