import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const percent = (scrollTop / scrollHeight) * 100
      setScrollPercent(percent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-1/2 right-8 transform -translate-y-1/2 w-1 h-64 bg-white/5 z-[9998] pointer-events-none rounded-full"
      id="scrollTrack"
    >
      <div
        className="absolute top-0 left-0 w-full bg-[#5bff32] z-[9999] transition-all duration-150 rounded-full"
        style={{ height: `${scrollPercent}%` }}
        id="verticalScrollProgress"
      />
    </div>
  )
}
