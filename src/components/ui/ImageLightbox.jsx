import React, { useState, useEffect, useCallback } from 'react'

/**
 * ImageLightbox - Click to expand images in a modal overlay
 */
export default function ImageLightbox() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const setupImageListeners = () => {
      // Find all images in the project-content and make them clickable
      const images = document.querySelectorAll('.project-content img')

      console.log('Setting up image listeners for', images.length, 'images')

      const handleImageClick = (e) => {
        const img = e.currentTarget
        console.log('Image clicked:', img.src)
        setSelectedImage({
          src: img.src,
          alt: img.alt || 'Image'
        })
      }

      images.forEach(img => {
        // Remove any existing listeners first
        img.removeEventListener('click', handleImageClick)

        img.style.cursor = 'pointer'
        img.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
        img.addEventListener('click', handleImageClick)

        // Add hover effect
        const handleMouseEnter = () => {
          img.style.transform = 'scale(1.02)'
          img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
        }

        const handleMouseLeave = () => {
          img.style.transform = 'scale(1)'
          img.style.boxShadow = 'none'
        }

        img.addEventListener('mouseenter', handleMouseEnter)
        img.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Initial setup with a small delay to ensure content is loaded
    const timer = setTimeout(setupImageListeners, 100)

    // Also watch for DOM changes
    const observer = new MutationObserver(() => {
      setupImageListeners()
    })

    const contentElement = document.querySelector('.project-content')
    if (contentElement) {
      observer.observe(contentElement, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const closeLightbox = useCallback(() => {
    console.log('Closing lightbox')
    setSelectedImage(null)
  }, [])

  const handleOverlayClick = useCallback((e) => {
    console.log('Overlay clicked', e.target.className)
    if (e.target.classList.contains('lightbox-overlay')) {
      closeLightbox()
    }
  }, [closeLightbox])

  const handleCloseClick = useCallback((e) => {
    console.log('Close button clicked')
    e.stopPropagation()
    closeLightbox()
  }, [closeLightbox])

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        console.log('Escape pressed')
        closeLightbox()
      }
    }

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage, closeLightbox])

  if (!selectedImage) return null

  return (
    <div
      className="lightbox-overlay"
      onClick={handleOverlayClick}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={handleCloseClick}>×</button>
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="lightbox-image"
        />
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          cursor: pointer;
          pointer-events: auto !important;
          animation: overlayFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes overlayFadeIn {
          from { 
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1;
            backdrop-filter: blur(10px);
          }
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          cursor: default;
          pointer-events: auto !important;
          animation: imagePopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes imagePopIn {
          0% {
            transform: scale(0.3) rotate(-5deg);
            opacity: 0;
            filter: blur(10px);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        .lightbox-image {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          pointer-events: none !important;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 0 80px rgba(100, 200, 255, 0.3),
            0 0 120px rgba(100, 200, 255, 0.2);
          animation: imagePulse 3s ease-in-out infinite;
        }

        @keyframes imagePulse {
          0%, 100% {
            box-shadow: 
              0 0 0 1px rgba(255, 255, 255, 0.1),
              0 20px 60px rgba(0, 0, 0, 0.8),
              0 0 80px rgba(100, 200, 255, 0.3),
              0 0 120px rgba(100, 200, 255, 0.2);
          }
          50% {
            box-shadow: 
              0 0 0 1px rgba(255, 255, 255, 0.2),
              0 25px 70px rgba(0, 0, 0, 0.9),
              0 0 100px rgba(100, 200, 255, 0.5),
              0 0 150px rgba(100, 200, 255, 0.3);
          }
        }

        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          font-size: 40px;
          cursor: pointer !important;
          pointer-events: auto !important;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100001 !important;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: closeButtonFloat 2s ease-in-out infinite;
        }

        @keyframes closeButtonFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .lightbox-close:hover {
          transform: scale(1.2) rotate(90deg);
          background: rgba(255, 100, 100, 0.3);
          box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
        }

        @media (max-width: 768px) {
          .lightbox-close {
            top: -60px;
            right: 10px;
            font-size: 50px;
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  )
}
