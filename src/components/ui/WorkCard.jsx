import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VariableProximity from './VariableProximity'

export default function WorkCard({ item, index, containerRef }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Fallback thumbnail if YouTube thumbnail fails
  const getFallbackThumbnail = () => {
    if (item.youtubeId && !imageError) {
      // Try maxresdefault as fallback
      return `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
    }
    // For Code category, use a code-themed fallback
    if (item.category === 'Code') {
      return "/assets/type.webp"
    }
    return item.thumbnail || "/assets/playing.webp"
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Link
      to={item.path}
      className="group block transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="mb-2 overflow-hidden rounded transition-transform duration-300"
        style={{
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transformOrigin: 'center center',
        }}
      >
        <img 
          src={imageError ? getFallbackThumbnail() : item.thumbnail} 
          alt={item.title}
          className="w-full h-auto object-cover transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 1
          }}
          onError={handleImageError}
        />
      </div>
      <div>
        <h3 className="text-xs md:text-sm font-light text-white mb-1 transition-colors group-hover:text-white/80">
          <VariableProximity label={item.title} containerRef={containerRef} radius={90} falloff="gaussian" className="text-xs md:text-sm font-light text-white" />
        </h3>
        <p className="text-xs text-white/90 font-light">
          <VariableProximity label={`${item.category}'${item.year.toString().slice(-2)}`} containerRef={containerRef} radius={90} falloff="gaussian" className="text-xs text-white/90 font-light" />
        </p>
      </div>
      {isHovered && (
        <div className="absolute top-2 right-2 text-white/80 text-xs">
          →
        </div>
      )}
    </Link>
  )
}
