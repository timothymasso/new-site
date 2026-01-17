import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import VariableProximity from './VariableProximity'

export default function Navigation() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

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

  const handleHomeClick = (e) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const formatTime = (date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, '0')
    return `${month} ${day}, ${displayHours}:${displayMinutes} ${ampm}`
  }

  const scrollToSection = (sectionId) => {
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
  }

  const navItems = [
    { id: 'home', label: 'Home', action: () => navigate('/') },
    { id: 'about', label: 'About', action: () => navigate('/about') },
    { id: 'portfolio', label: 'Work', action: () => navigate('/projects') },
    { id: 'contact', label: 'Contact', action: () => navigate('/contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/40 backdrop-blur-lg border-b border-white/20' : 'bg-transparent'
    }`}>
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-white font-light">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="hover:opacity-70 transition-all cursor-pointer relative"
                style={{
                  transform: hoveredLink === item.id ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <VariableProximity label={item.label} containerRef={null} radius={90} falloff="gaussian" className="text-sm font-light" />
                {hoveredLink === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
          <div className="text-xs text-white/95 font-light">
            <VariableProximity label={formatTime(currentTime)} containerRef={null} radius={90} falloff="gaussian" className="text-xs text-white/95 font-light" />
          </div>
        </div>
      </div>
    </nav>
  )
}
