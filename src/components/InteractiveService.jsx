import React, { useState } from 'react'

export default function InteractiveService({ service, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`text-xl md:text-2xl lg:text-3xl font-light text-white transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      >
        {service}
      </div>
      {isHovered && (
        <div
          className="absolute -z-10 w-32 h-32 rounded-full bg-white/5 blur-2xl transition-opacity duration-300"
          style={{
            left: `${mousePosition.x - 64}px`,
            top: `${mousePosition.y - 64}px`,
          }}
        />
      )}
    </div>
  )
}
