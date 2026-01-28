import React, { useState } from 'react'

/**
 * InteractiveImage - A clickable image that pops out with a cool effect
 */
export default function InteractiveImage({ src, alt, className, style }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} ${isExpanded ? 'image-expanded' : ''}`}
        style={{
          ...style,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.2)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      />

      <style>{`
        .image-expanded {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) scale(1.3) !important;
          z-index: 100000 !important;
          max-width: 90vw !important;
          max-height: 90vh !important;
          object-fit: contain !important;
          box-shadow: 0 20px 80px rgba(255, 255, 255, 0.3), 
                      0 0 100px rgba(100, 200, 255, 0.4),
                      0 0 0 2px rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          animation: popOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        @keyframes popOut {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.35);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
          }
        }

        /* Add a subtle backdrop when image is expanded */
        body:has(.image-expanded)::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 99999;
          pointer-events: none;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}
