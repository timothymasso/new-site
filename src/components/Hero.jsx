import React, { useState, useEffect, useRef } from 'react'

const casualGreetings = [
  "Hey there!",
  "What's up?",
  "Yo!",
  "Hi!",
  "Hello!",
  "Hey!",
]

export default function Hero() {
  const [greeting, setGreeting] = useState("Hello!")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos(mousePosRef.current)
          rafRef.current = null
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleGreetingClick = () => {
    const randomGreeting = casualGreetings[Math.floor(Math.random() * casualGreetings.length)]
    setGreeting(randomGreeting)
  }

  return (
    <section id="home" className="h-full flex items-center justify-center px-4 relative">
      <div className="w-full">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight cursor-pointer transition-transform hover:scale-105"
          onClick={handleGreetingClick}
        >
          {greeting}<br />
          I'm Timothy.
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-light mt-4">
          I make sounds, code stuff, and sometimes both at the same time 🎵
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <span className="text-sm text-white/50 font-light">currently:</span>
          <span className="text-sm text-white/70 font-light animate-pulse">making music</span>
          <span className="text-sm text-white/50 font-light">•</span>
          <span className="text-sm text-white/70 font-light animate-pulse" style={{ animationDelay: '1s' }}>coding things</span>
          <span className="text-sm text-white/50 font-light">•</span>
          <span className="text-sm text-white/70 font-light animate-pulse" style={{ animationDelay: '2s' }}>vibing</span>
        </div>
      </div>
      <div 
        className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: `${mousePos.x - 128}px`,
          top: `${mousePos.y - 128}px`,
        }}
      />
    </section>
  )
}
