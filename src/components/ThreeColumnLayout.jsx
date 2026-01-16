import React from 'react'

export default function ThreeColumnLayout({ left, center, right }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto px-6">
      <div className="col-span-1">
        {left}
      </div>
      <div className="col-span-1">
        {center}
      </div>
      <div className="col-span-1">
        {right}
      </div>
    </div>
  )
}
