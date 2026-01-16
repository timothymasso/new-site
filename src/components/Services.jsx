import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const services = [
  'Music Performance',
  'Composition',
  'Data Projects',
  'Creative Coding'
]

export default function Services() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, once: true })

  return (
    <section id="info" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={ref}
          className={`flex flex-nowrap justify-center items-center gap-10 md:gap-14 lg:gap-20 xl:gap-24 overflow-x-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {services.map((service, index) => (
            <div 
              key={index}
              className="text-xl md:text-2xl lg:text-3xl font-light text-white hover:opacity-70 transition-opacity cursor-default whitespace-nowrap flex-shrink-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
