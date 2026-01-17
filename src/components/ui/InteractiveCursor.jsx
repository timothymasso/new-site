import React, { useEffect, useState, useRef } from 'react'

export default function InteractiveCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursor = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(positionRef.current)
          rafRef.current = null
        })
      }
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
        willChange: 'transform',
      }}
    >
      <div className={`w-4 h-4 rounded-full border border-white/30 transition-all ${
        isHovering ? 'bg-white/20' : 'bg-transparent'
      }`} />
    </div>
  )
}
