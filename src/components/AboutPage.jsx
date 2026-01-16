import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function AboutPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="relative z-10 pointer-events-none min-h-screen">
        <div className="pointer-events-auto">
          <Navigation />
        </div>
        <div className="pointer-events-auto min-h-screen flex items-center justify-center">
          <p className="text-white/60 font-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 pointer-events-none min-h-screen">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <div className="max-w-5xl mx-auto px-6 py-20 pt-24 md:pt-28">
          <article 
            className="about-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <style>{`
            .about-content {
              color: white;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 16px;
              line-height: 1.8;
            }
            .about-content h1 {
              font-size: 3rem;
              font-weight: 300;
              margin-bottom: 2rem;
              color: white;
            }
            .about-content h2 {
              font-size: 2rem;
              font-weight: 300;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: white;
            }
            .about-content h2:first-of-type {
              margin-top: 0;
            }
            .about-content p {
              margin-bottom: 1.5rem;
              color: rgba(255, 255, 255, 0.9);
              font-weight: 300;
            }
            .about-content ul {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            .about-content li {
              margin-bottom: 0.5rem;
              color: rgba(255, 255, 255, 0.9);
              font-weight: 300;
            }
            .about-content a {
              color: rgba(255, 255, 255, 0.8);
              text-decoration: underline;
              transition: color 0.3s;
            }
            .about-content a:hover {
              color: white;
            }
          `}</style>
        </div>
        <Footer />
      </div>
    </div>
  )
}
