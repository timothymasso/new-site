import React, { useState } from 'react'

const skills = [
  {
    category: 'Music stuff',
    items: ['Playing instruments', 'Writing songs', 'Making noise']
  },
  {
    category: 'Code stuff',
    items: ['Building websites', 'Visualizing data', 'Breaking things']
  },
  {
    category: 'Tools I use',
    items: ['React', 'JavaScript', 'Python', 'Max/MSP', 'Ableton']
  }
]

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section id="skills" className="h-full px-4 pt-4 pb-0 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
        Things I do
      </h2>
      <div className="space-y-4">
        {skills.map((skillGroup, index) => (
          <div key={index}>
            <h3 className="text-base md:text-lg font-light text-white mb-2">
              {skillGroup.category}
            </h3>
            <ul className="space-y-1">
              {skillGroup.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex}
                  className="text-white/70 font-light text-sm cursor-default transition-all hover:text-white hover:translate-x-2 hover:scale-105"
                  onMouseEnter={() => setHoveredSkill(`${index}-${itemIndex}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    transform: hoveredSkill === `${index}-${itemIndex}` ? 'translateX(8px) scale(1.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
