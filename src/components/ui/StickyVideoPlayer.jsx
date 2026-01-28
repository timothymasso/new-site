import React, { useEffect, useRef } from 'react'

/**
 * StickyVideoPlayer - A robust React video component
 * Uses native iframe for maximum reliability
 */
export default function StickyVideoPlayer({
  videoUrl,
  className = ''
}) {
  const videoContainerRef = useRef(null)

  // Apply layout fixes on mount
  useEffect(() => {
    const container = document.querySelector('.project-container')
    if (container) {
      container.style.width = '45vw'
      container.style.marginLeft = '0'
      container.style.marginRight = 'auto'
      container.style.maxWidth = 'none'
    }

    // Cleanup on unmount
    return () => {
      if (container) {
        container.style.width = ''
        container.style.marginLeft = ''
        container.style.marginRight = ''
        container.style.maxWidth = ''
      }
    }
  }, [])

  // Smart URL parser: Converts any YouTube link to a valid Embed URL
  const getEmbedUrl = (url) => {
    try {
      if (!url) return ''

      const urlObj = new URL(url)
      let videoId = ''

      // Handle short URLs (youtu.be/ID)
      if (url.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
      // Handle embed URLs (youtube.com/embed/ID)
      else if (url.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1]
      }
      // Handle watch URLs (youtube.com/watch?v=ID)
      else if (url.includes('watch') && urlObj.searchParams.has('v')) {
        videoId = urlObj.searchParams.get('v')
      }

      if (videoId) {
        // Clean ID of any trailing params
        const cleanId = videoId.split('&')[0].split('?')[0]
        return `https://www.youtube.com/embed/${cleanId}?autoplay=1&modestbranding=1&rel=0`
      }

      return url
    } catch (e) {
      console.warn('URL parsing failed', e)
      return url
    }
  }

  const embedUrl = getEmbedUrl(videoUrl)

  if (!videoUrl) return null

  return (
    <>
      <div
        ref={videoContainerRef}
        className={`video-container video-fixed ${className}`}
      >
        <iframe
          className="video-iframe"
          src={embedUrl}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <style>{`
        .video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin: 2rem 0;
          background: #000;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* Fixed positioning styles */
        .video-fixed {
          position: fixed !important;
          top: 100px !important;
          right: 20px !important;
          width: 45vw !important;
          max-width: 800px !important;
          aspect-ratio: 16 / 9 !important;
          height: auto !important;
          padding-bottom: 0 !important;
          z-index: 10000 !important;
          margin: 0 !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          background: #000 !important;
          box-sizing: content-box !important;
        }
        
        .video-fixed .video-iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        @media (max-width: 768px) {
          .video-fixed {
            position: relative !important;
            width: 100% !important;
            max-width: none !important;
            top: 0 !important;
            right: 0 !important;
            aspect-ratio: 16 / 9 !important;
          }
        }

        @media (max-width: 1200px) and (min-width: 769px) {
          .video-fixed {
            width: 40vw !important;
          }
        }
      `}</style>
    </>
  )
}
