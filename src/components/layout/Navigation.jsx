import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VariableProximity from '../ui/VariableProximity'

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function Navigation() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHomeClick = useCallback((e) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isHomePage])

  const scrollToSection = useCallback((sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        // Add visual highlight effect with border
        const originalBorder = element.style.border
        const originalBoxShadow = element.style.boxShadow
        const originalTransition = element.style.transition
        
        element.style.transition = 'all 0.4s ease'
        element.style.border = '2px solid rgba(255, 255, 255, 0.3)'
        element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)'
        element.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
        
        // Scroll internal scrollable containers to top
        const scrollableContainers = element.querySelectorAll('[class*="overflow-y-auto"]')
        scrollableContainers.forEach(container => {
          container.scrollTo({ top: 0, behavior: 'smooth' })
        })
        
        // Remove highlight after animation
        setTimeout(() => {
          element.style.border = originalBorder
          element.style.boxShadow = originalBoxShadow
          element.style.backgroundColor = 'transparent'
          setTimeout(() => {
            element.style.transition = originalTransition
          }, 400)
        }, 1000)
      }
    } else {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.style.transition = 'all 0.4s ease'
          element.style.border = '2px solid rgba(255, 255, 255, 0.3)'
          element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)'
          element.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          
          setTimeout(() => {
            element.style.border = ''
            element.style.boxShadow = ''
            element.style.backgroundColor = 'transparent'
          }, 1000)
        }
      }, 200)
    }
  }, [isHomePage, navigate])

  const navItems = useMemo(() => [
    { id: 'home', label: 'Home', action: () => navigate('/') },
    { id: 'about', label: 'About', action: () => navigate('/about') },
    { id: 'portfolio', label: 'Work', action: () => navigate('/projects') },
    { id: 'music', label: 'Music', action: () => navigate('/music') },
  ], [navigate])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/40 backdrop-blur-lg border-b border-white/20' : 'bg-transparent'
    }`}>
      <div className="w-full" style={{ 
        paddingLeft: 'clamp(1rem, 3vw, 2rem)',
        paddingRight: 'clamp(1rem, 3vw, 2rem)',
        paddingTop: 'clamp(0.75rem, 2vh, 1.5rem)',
        paddingBottom: 'clamp(0.75rem, 2vh, 1.5rem)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white font-light" style={{ 
            gap: 'clamp(1rem, 3vw, 2rem)',
            fontSize: 'clamp(0.75rem, 1.75vw, 0.875rem)'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="hover:opacity-70 transition-all cursor-pointer relative"
                style={{
                  transform: hoveredLink === item.id ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.2s ease',
                  fontSize: 'clamp(0.75rem, 1.75vw, 0.875rem)'
                }}
              >
                <VariableProximity label={item.label} containerRef={null} radius={90} falloff="gaussian" className="font-light" style={{ fontSize: 'clamp(0.75rem, 1.75vw, 0.875rem)' }} />
                {hoveredLink === item.id && (
                  <span className="absolute left-0 right-0 bg-white animate-pulse" style={{ 
                    bottom: '-0.125rem',
                    height: 'clamp(1px, 0.1vh, 2px)'
                  }} />
                )}
              </button>
            ))}
          </div>
          <div className="text-white/95 font-light flex items-center" style={{ 
            gap: 'clamp(0.375rem, 1vw, 0.75rem)',
            fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)'
          }}>
            <VariableProximity label={formatDate(currentTime)} containerRef={null} radius={90} falloff="gaussian" className="text-white/95 font-light" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }} />
            <VariableProximity label={formatTime(currentTime)} containerRef={null} radius={90} falloff="gaussian" className="text-white/95 font-light" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }} />
          </div>
        </div>
      </div>
    </nav>
  )
}
