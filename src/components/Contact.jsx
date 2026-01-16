import React, { useState, useEffect } from 'react'
import VariableProximity from './VariableProximity'

const casualMessages = [
  "Let's make something cool together",
  "Want to collaborate?",
  "Hit me up if you want to chat",
  "Always down to talk about music or code",
  "Let's connect!",
]

export default function Contact({ containerRef }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [messageIndex, setMessageIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % casualMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="contact" className="h-full px-4 pt-4 pb-0 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
        <VariableProximity label="Say hi" containerRef={containerRef} radius={90} falloff="gaussian" className="text-2xl md:text-3xl font-light text-white" />
      </h2>
      <p className="text-sm text-white/60 mb-4 animate-fade-in">
        <VariableProximity label={casualMessages[messageIndex]} containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white/60" />
      </p>
      <div className="space-y-2 mb-4">
        <a 
          href="mailto:timothy.masso@gmail.com" 
          className="text-white/70 hover:text-white transition-colors font-light text-sm block hover:translate-x-1 transition-transform"
        >
          <VariableProximity label="timothy.masso@gmail.com" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm font-light" />
        </a>
        <p className="text-white/50 font-light text-xs">
          <VariableProximity label="NYC area" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xs text-white/50 font-light" />
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all rounded"
          required
        />
        <textarea
          name="message"
          placeholder="What's up?"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all resize-none rounded"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 text-sm bg-white text-black hover:bg-white/90 transition-all font-light w-full rounded ${
            submitted ? 'bg-green-500 text-white' : ''
          }`}
        >
          <VariableProximity label={submitted ? '✓ Sent!' : 'Send it'} containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm font-light" />
        </button>
      </form>
    </section>
  )
}
