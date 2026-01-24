import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VariableProximity from './VariableProximity'

const base = import.meta.env.BASE_URL || '/'
const toAsset = (path) => {
  if (!path || path.startsWith('http')) return path
  const p = path.startsWith('/') ? path.slice(1) : path
  return base + p
}

export default function WorkCard({ item, index, containerRef }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Fallback thumbnail if YouTube thumbnail fails
  const getFallbackThumbnail = () => {
    if (item.youtubeId && !imageError) {
      return `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
    }
    if (item.category === 'Code') {
      return toAsset('/assets/type.webp')
    }
    return toAsset(item.thumbnail || '/assets/playing.webp')
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Link
      to={item.path}
      className="group block transition-all duration-300 relative"
      style={{ minWidth: 0, maxWidth: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="mb-2 overflow-hidden rounded transition-transform duration-300"
        style={{
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transformOrigin: 'center center',
          minWidth: 0,
          maxWidth: '100%',
          aspectRatio: '16 / 9',
          position: 'relative'
        }}
      >
        <img 
          src={imageError ? getFallbackThumbnail() : toAsset(item.thumbnail)} 
          alt={item.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 1,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={handleImageError}
        />
      </div>
      <div style={{ minWidth: 0, maxWidth: '100%', overflowWrap: 'break-word' }}>
        <h3 className="font-light text-white transition-colors group-hover:text-white/80" style={{ 
          fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)',
          marginBottom: 'clamp(0.125rem, 0.5vh, 0.5rem)'
        }}>
          <VariableProximity label={item.title} containerRef={containerRef} radius={90} falloff="gaussian" className="font-light text-white" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }} />
        </h3>
        <p className="text-white/90 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}>
          <VariableProximity label={`${item.category}'${item.year.toString().slice(-2)}`} containerRef={containerRef} radius={90} falloff="gaussian" className="text-white/90 font-light" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }} />
        </p>
      </div>
      {isHovered && (
        <div className="absolute text-white/80" style={{ 
          top: 'clamp(0.25rem, 1vw, 0.5rem)',
          right: 'clamp(0.25rem, 1vw, 0.5rem)',
          fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)'
        }}>
          →
        </div>
      )}
    </Link>
  )
}
