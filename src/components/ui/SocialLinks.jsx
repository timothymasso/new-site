import React from 'react'
import GradientText from './GradientText'
import VariableProximity from './VariableProximity'

export default function SocialLinks({ containerRef }) {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/timothymasso', colors: ['#5227FF', '#FF9FFC', '#B19EEF'] },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/timothymasso', colors: ['#0077B5', '#00A0DC', '#0077B5'] },
    { name: 'Instagram', url: 'https://instagram.com/timothymasso', colors: ['#E4405F', '#F56040', '#FCAF45'] },
    { name: 'Twitter', url: 'https://twitter.com/timothymasso', colors: ['#1DA1F2', '#14171A', '#1DA1F2'] },
  ]

  return (
    <section id="socials" className="h-full px-3 pt-3 pb-3 flex flex-col">
      <h2 className="text-xl md:text-2xl font-light text-white mb-3">
        <VariableProximity label="Find me" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xl md:text-2xl font-light text-white" />
      </h2>
      <div className="space-y-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GradientText
              animationSpeed={10.5}
              colors={link.colors}
              pauseOnHover={false}
              className="text-sm font-light"
            >
              <VariableProximity label={link.name} containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm font-light" />
            </GradientText>
          </a>
        ))}
      </div>
    </section>
  )
}
