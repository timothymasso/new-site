import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useParams, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import VariableProximity from './VariableProximity'

// Map of routes to their original HTML content paths
const routeToContentMap = {
  'new-school-recital': '/_performances/new-school-recital/',
  'radiohead-ensemble': '/_performances/Radio-Head-Ensemble/',
  'improv-ensemble-fall-2023': '/_performances/improv_ensemble_fall23/',
  'mingus': '/_performances/mingus/',
  'steely-dan': '/_performances/steelydan/',
  'julius-hemphil': '/_performances/juliushemphil/',
  'afro-cuban': '/_performances/afrocuban/',
  'kennedy-dream': '/_performances/kdream/',
  'unsilent': '/_performances/unsilent/',
  'calc-project': '/_dataprojects/calcproject/',
  'prog-logic': '/_dataprojects/proglogic/',
  'internet-geographies': '/_dataprojects/internetgeo/',
  'stats-one': '/_dataprojects/statsone/',
  'milestones': '/_compositions/miles/',
}

export default function ProjectPage() {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Determine the route key
    const routeKey = slug || category
    
    // Get the original HTML path
    const originalPath = routeToContentMap[routeKey]
    
    if (originalPath) {
      // Fetch the HTML content
      fetch(originalPath)
        .then(res => res.text())
        .then(html => {
          // Extract the main content from the HTML
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          const article = doc.querySelector('article')
          const pageTitle = doc.querySelector('h1')?.textContent || doc.title
          
          if (article) {
            // Clean up the content
            const cleanArticle = article.cloneNode(true)
            
            // Remove script tags
            const scripts = cleanArticle.querySelectorAll('script')
            scripts.forEach(s => s.remove())
            
            // Process styles - keep inline styles but remove conflicting ones
            const styles = cleanArticle.querySelectorAll('style')
            styles.forEach(s => {
              const styleContent = s.textContent
              // Remove styles that conflict with our design
              if (!styleContent.includes('scrollTrack')) {
                s.remove()
              }
            })
            
            // Update image sources to use absolute paths
            const images = cleanArticle.querySelectorAll('img')
            images.forEach(img => {
              const src = img.getAttribute('src')
              if (src && !src.startsWith('http') && !src.startsWith('/')) {
                img.setAttribute('src', originalPath.replace('/index.html', '') + src)
              } else if (src && src.startsWith('http://localhost:4000')) {
                img.setAttribute('src', src.replace('http://localhost:4000', ''))
              }
            })
            
            // Update iframe sources
            const iframes = cleanArticle.querySelectorAll('iframe')
            iframes.forEach(iframe => {
              const src = iframe.getAttribute('src')
              if (src && src.startsWith('http://localhost:4000')) {
                iframe.setAttribute('src', src.replace('http://localhost:4000', ''))
              }
            })
            
            // Process text nodes to add VariableProximity data attributes
            const textElements = cleanArticle.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, a, span:not([class*="code"]):not([class*="pre"])')
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
            setTitle(pageTitle)
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
    } else {
      setContent('<p>Page not found</p>')
      setLoading(false)
    }
  }, [category, slug])

  // Apply VariableProximity to loaded content
  useEffect(() => {
    if (!content || !contentRef.current) return

    const elements = contentRef.current.querySelectorAll('[data-variable-proximity="true"]')
    
    elements.forEach(el => {
      const textContent = el.getAttribute('data-text-content')
      if (!textContent) return
      
      // Skip if already processed
      if (el.hasAttribute('data-proximity-processed')) return
      
      // Store original content and clear
      const originalHTML = el.innerHTML
      const classes = el.className
      
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
          className={classes}
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
          <p className="text-white font-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 pointer-events-none min-h-screen" ref={containerRef}>
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 pt-24 md:pt-28">
          <article 
            ref={contentRef}
            className="project-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <style>{`
            .project-content {
              color: white;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 16px;
              line-height: 1.75;
              position: relative;
            }
            
            .project-content::before {
              content: '';
              position: absolute;
              left: -2rem;
              top: 0;
              bottom: 0;
              width: 1px;
              background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
            }
            
            .project-content h1 {
              font-size: clamp(2rem, 6vw, 4rem);
              font-weight: 100;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: white;
              letter-spacing: -0.04em;
              line-height: 0.95;
              position: relative;
              text-transform: uppercase;
              font-style: italic;
            }
            
            .project-content h1:first-of-type {
              margin-top: 0;
              font-size: clamp(2.5rem, 7vw, 5rem);
              padding-bottom: 1rem;
              margin-bottom: 2rem;
              position: relative;
              transform: rotate(-0.5deg);
            }
            
            .project-content h1:first-of-type::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 60%;
              height: 2px;
              background: linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent);
              transform: rotate(-1deg);
            }
            
            .project-content h1:not(:first-of-type) {
              margin-left: -1.5rem;
              padding-left: 1.5rem;
              border-left: 3px solid transparent;
              border-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent) 1;
            }
            
            .project-content h2 {
              font-size: clamp(1.5rem, 4vw, 2.25rem);
              font-weight: 200;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              color: white;
              letter-spacing: 0.05em;
              text-transform: lowercase;
              position: relative;
              padding-left: 2.5rem;
              transform: rotate(0.3deg);
            }
            
            .project-content h2::before {
              content: '//';
              position: absolute;
              left: 0;
              top: 0;
              font-family: monospace;
              color: rgba(255, 255, 255, 0.2);
              font-size: 0.6em;
              font-weight: 300;
            }
            
            .project-content h3 {
              font-size: clamp(1.1rem, 2.5vw, 1.5rem);
              font-weight: 300;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              color: rgba(255, 255, 255, 0.95);
              letter-spacing: 0.02em;
              font-style: italic;
            }
            
            .project-content p {
              margin-bottom: 1.25rem;
              color: rgba(255, 255, 255, 0.95);
              font-weight: 300;
              max-width: 60ch;
              position: relative;
            }
            
            .project-content p:first-of-type {
              font-size: clamp(1rem, 1.8vw, 1.2rem);
              line-height: 1.75;
              color: white;
              margin-bottom: 2.5rem;
              max-width: 70ch;
              padding-left: 1.5rem;
              border-left: 2px solid rgba(255, 255, 255, 0.15);
              font-style: italic;
            }
            
            .project-content p:nth-child(even) {
              margin-left: 1.5rem;
            }
            
            .project-content img {
              max-width: 100%;
              height: auto;
              margin: 2rem 0;
              border-radius: 0;
              box-shadow: 
                15px 15px 0 rgba(255, 255, 255, 0.05),
                30px 30px 0 rgba(255, 255, 255, 0.02);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.5deg);
            }
            
            .project-content img:hover {
              transform: rotate(0deg) translateY(-6px);
              box-shadow: 
                20px 20px 0 rgba(255, 255, 255, 0.08),
                40px 40px 0 rgba(255, 255, 255, 0.03);
            }
            
            .project-content img:nth-child(even) {
              transform: rotate(0.5deg);
              margin-left: 2rem;
            }
            
            .project-content img:nth-child(even):hover {
              transform: rotate(0deg) translateY(-6px);
            }
            
            .project-content iframe {
              width: 100%;
              margin: 2rem 0;
              border: none;
              border-radius: 0;
              box-shadow: 
                12px 12px 0 rgba(255, 255, 255, 0.05),
                24px 24px 0 rgba(255, 255, 255, 0.02);
              min-height: 400px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .project-content .image-column {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              margin: 2rem 0;
              align-items: flex-start;
              padding-left: 1.5rem;
            }
            
            .project-content .image-column img {
              max-width: 75%;
              transform: rotate(-1deg);
            }
            
            .project-content .image-stageplot {
              display: flex;
              justify-content: flex-start;
              margin: 2rem 0;
              padding-left: 2rem;
            }
            
            .project-content .image-stageplot img {
              max-width: 70%;
              transform: rotate(1deg);
            }
            
            .project-content ul, .project-content ol {
              margin: 2rem 0;
              padding-left: 2.5rem;
              color: rgba(255, 255, 255, 0.95);
              list-style: none;
              position: relative;
            }
            
            .project-content ul li::before {
              content: '→';
              position: absolute;
              left: -1.5rem;
              color: rgba(255, 255, 255, 0.5);
            }
            
            .project-content li {
              margin-bottom: 0.75rem;
              line-height: 1.7;
              padding-left: 0.75rem;
            }
            
            .project-content code {
              background: rgba(255, 255, 255, 0.08);
              padding: 0.15em 0.5em;
              border-radius: 0;
              font-family: 'ui-monospace', 'SF Mono', 'Monaco', 'Consolas', monospace;
              font-size: 0.9em;
              color: rgba(255, 255, 255, 0.95);
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.2deg);
              display: inline-block;
            }
            
            .project-content pre {
              background: rgba(0, 0, 0, 0.3);
              padding: 1.5rem;
              border-radius: 0;
              overflow-x: auto;
              margin: 2rem 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-left: 4px solid rgba(255, 255, 255, 0.2);
              transform: rotate(0.3deg);
              box-shadow: 8px 8px 0 rgba(255, 255, 255, 0.03);
            }
            
            .project-content pre code {
              background: none;
              padding: 0;
              color: rgba(255, 255, 255, 0.9);
              transform: none;
              border: none;
            }
            
            .project-content table {
              width: 100%;
              margin: 2rem 0;
              border-collapse: separate;
              border-spacing: 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
              transform: rotate(-0.2deg);
            }
            
            .project-content th {
              background: rgba(255, 255, 255, 0.03);
              padding: 1rem 0.75rem;
              text-align: left;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.95);
              border-bottom: 2px solid rgba(255, 255, 255, 0.1);
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-size: 0.85em;
            }
            
            .project-content td {
              padding: 1rem 0.75rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.95);
            }
            
            .project-content tr:hover {
              background: rgba(255, 255, 255, 0.02);
            }
            
            .project-content blockquote {
              border-left: 4px solid rgba(255, 255, 255, 0.2);
              padding-left: 1.5rem;
              margin: 2rem 0;
              color: rgba(255, 255, 255, 0.9);
              font-style: italic;
              transform: rotate(0.2deg);
              margin-left: 1.5rem;
              font-size: 1.05em;
            }
            
            .project-content em {
              font-style: italic;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.95);
            }
            
            .project-content a {
              color: rgba(255, 255, 255, 0.9);
              text-decoration: none;
              border-bottom: 2px solid rgba(255, 255, 255, 0.2);
              transition: all 0.3s ease;
              position: relative;
            }
            
            .project-content a:hover {
              color: white;
              border-bottom-color: rgba(255, 255, 255, 0.6);
              transform: translateY(-1px);
            }
            
            .project-content hr {
              border: none;
              height: 1px;
              background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
              margin: 2.5rem 0;
              transform: rotate(-0.5deg);
            }
            
            @media (max-width: 768px) {
              .project-content::before {
                display: none;
              }
              
              .project-content h1:first-of-type {
                transform: none;
              }
              
              .project-content p:first-of-type {
                padding-left: 0;
                border-left: none;
                border-top: 2px solid rgba(255, 255, 255, 0.15);
                padding-top: 1rem;
              }
              
              .project-content p:nth-child(even),
              .project-content img:nth-child(even),
              .project-content blockquote {
                margin-left: 0;
              }
              
              .project-content img,
              .project-content img:nth-child(even) {
                transform: none;
              }
            }
          `}</style>
        </div>
        <Footer />
      </div>
    </div>
  )
}
