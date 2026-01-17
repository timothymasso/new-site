import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import Navigation from './Navigation'
import Footer from './Footer'
import VariableProximity from './VariableProximity'

export default function AboutPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    fetch('/_aboutme/aboutme/index.html')
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const article = doc.querySelector('article') || doc.querySelector('main')
        
        if (article) {
          const cleanArticle = article.cloneNode(true)
          const scripts = cleanArticle.querySelectorAll('script')
          const styles = cleanArticle.querySelectorAll('style')
          scripts.forEach(s => s.remove())
          styles.forEach(s => s.remove())
          
          // Remove home links - check all links
          const allLinks = cleanArticle.querySelectorAll('a')
          allLinks.forEach(link => {
            const href = link.getAttribute('href')
            const text = link.textContent.trim().toLowerCase()
            // Remove links that point to home or have "home" text
            if ((href === '/' || href === '#') && text === 'home') {
              link.remove()
            }
          })
          
          // Mark text elements for VariableProximity
          const textElements = cleanArticle.querySelectorAll('h2, p, li, a, span:not([class*="code"]):not([class*="pre"])')
          textElements.forEach(el => {
            // Skip if element contains code or pre elements
            if (el.querySelector('code, pre')) return
            
            // Skip if element is empty or only whitespace
            if (!el.textContent || !el.textContent.trim()) return
            
            // Add data attribute to mark for VariableProximity
            el.setAttribute('data-variable-proximity', 'true')
            el.setAttribute('data-text-content', el.textContent.trim())
          })
          
          setContent(cleanArticle.innerHTML)
        } else {
          setContent('<p>Content not found</p>')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading content:', err)
        setContent('<p>Error loading content</p>')
        setLoading(false)
      })
  }, [])

  // Apply VariableProximity to loaded content
  useEffect(() => {
    if (!content || !contentRef.current) return

    const elements = contentRef.current.querySelectorAll('[data-variable-proximity="true"]')
    
    elements.forEach(el => {
      const textContent = el.getAttribute('data-text-content')
      if (!textContent) return
      
      // Skip if already processed
      if (el.hasAttribute('data-proximity-processed')) return
      
      // Create a container for the VariableProximity component
      const container = document.createElement('span')
      container.style.display = 'inline'
      
      // Create root and render VariableProximity
      const root = createRoot(container)
      root.render(
        <VariableProximity 
          label={textContent} 
          containerRef={containerRef} 
          radius={90} 
          falloff="gaussian" 
          className={el.className}
        />
      )
      
      // Replace element's content
      el.innerHTML = ''
      el.appendChild(container)
      el.setAttribute('data-proximity-processed', 'true')
    })
  }, [content])

  if (loading) {
    return (
      <div className="relative z-10 pointer-events-none min-h-screen">
        <div className="pointer-events-auto">
          <Navigation />
        </div>
        <div className="pointer-events-auto min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mb-4" />
            <p className="text-white font-light">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 pointer-events-none min-h-screen">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto relative" ref={containerRef}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16 py-20 pt-24 md:pt-32">
            
          {/* Hero Section - Minimal */}
          <div className="mb-16 md:mb-20">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <VariableProximity label="About Me" containerRef={containerRef} radius={90} falloff="gaussian" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white" />
            </h1>
            <p 
              className="text-lg md:text-xl text-white font-light leading-relaxed" 
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <VariableProximity label="A journey through sound, code, and everything in between" containerRef={containerRef} radius={90} falloff="gaussian" className="text-lg md:text-xl text-white font-light" />
            </p>
          </div>

          {/* Content - Minimal */}
          <article 
            ref={contentRef}
            className="about-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <style>{`
            .about-content {
              color: white;
              font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 16px;
              line-height: 1.7;
              font-weight: 300;
            }
            
            
            .about-content h1 {
              display: none;
            }
            
            .about-content h2 {
              font-family: 'Outfit', sans-serif;
              font-size: 1.75rem;
              font-weight: 600;
              margin-top: 3rem;
              margin-bottom: 1rem;
              color: white;
              line-height: 1.3;
            }
            
            .about-content h2:first-of-type {
              margin-top: 0;
            }
            
            
            .about-content p {
              margin-bottom: 1.25rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              font-size: 1rem;
              line-height: 1.7;
              max-width: 65ch;
            }
            
            .about-content p:first-of-type {
              font-size: 1.05rem;
              margin-bottom: 1.5rem;
            }
            
            
            .about-content ul {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            
            .about-content li {
              margin-bottom: 0.5rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              line-height: 1.6;
            }
            
            
            .about-content a {
              color: rgba(255, 255, 255, 0.9);
              text-decoration: underline;
              text-decoration-color: rgba(255, 255, 255, 0.4);
            }
            
            .about-content a:hover {
              color: white;
            }
            
            .about-content h2 + p {
              margin-top: 0.5rem;
            }
            
            .about-content ::selection {
              background: rgba(255, 255, 255, 0.2);
            }
          `}</style>
        </div>
        <Footer />
      </div>
    </div>
  )
}
