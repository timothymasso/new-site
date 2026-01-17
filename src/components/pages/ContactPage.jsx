import React, { useRef, useState, useEffect } from 'react'
import Navigation from '../layout/Navigation'
import Footer from '../layout/Footer'
import ScrollProgress from '../ui/ScrollProgress'
import VariableProximity from '../ui/VariableProximity'

const casualMessages = [
  "Let's make something cool together",
  "Want to collaborate?",
  "Hit me up if you want to chat",
  "Always down to talk about music or code",
  "Let's connect!",
]

export default function ContactPage() {
  const containerRef = useRef(null)
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
    <div className="relative z-10 pointer-events-none min-h-screen" ref={containerRef}>
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-white text-center">
              <VariableProximity label="Let's Connect" containerRef={containerRef} radius={90} falloff="gaussian" className="text-5xl md:text-6xl lg:text-7xl font-light text-white" />
            </h1>
            <p className="text-lg md:text-xl text-white font-light text-center mb-12 animate-fade-in">
              <VariableProximity label={casualMessages[messageIndex]} containerRef={containerRef} radius={90} falloff="gaussian" className="text-lg md:text-xl text-white font-light" />
            </p>
            
            {/* Contact Form */}
            <div className="max-w-2xl mx-auto mb-16">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-white/10 border border-white/20 text-white placeholder-white/85 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-white/10 border border-white/20 text-white placeholder-white/85 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all rounded"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="What's up?"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 text-base bg-white/10 border border-white/20 text-white placeholder-white/85 font-light focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all resize-none rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 text-base bg-white text-black hover:bg-white/90 transition-all font-light rounded ${
                    submitted ? 'bg-green-500 text-white' : ''
                  }`}
                >
                  <VariableProximity label={submitted ? '✓ Sent!' : 'Send it'} containerRef={containerRef} radius={90} falloff="gaussian" className="text-base font-light" />
                </button>
              </form>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-8 text-center border-t border-white/10 pt-12">
              <div>
                <h2 className="text-xl font-light text-white mb-3">
                  <VariableProximity label="Email" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xl font-light text-white" />
                </h2>
                <a 
                  href="mailto:timothy.masso@gmail.com" 
                  className="text-lg text-white hover:text-white transition-colors font-light"
                >
                  <VariableProximity label="timothy.masso@gmail.com" containerRef={containerRef} radius={90} falloff="gaussian" className="text-lg font-light" />
                </a>
              </div>
              <div>
                <h2 className="text-xl font-light text-white mb-3">
                  <VariableProximity label="Social" containerRef={containerRef} radius={90} falloff="gaussian" className="text-xl font-light text-white" />
                </h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <a 
                    href="https://github.com/timothymasso" 
                    className="text-base text-white hover:text-white transition-colors font-light"
                  >
                    <VariableProximity label="GitHub" containerRef={containerRef} radius={90} falloff="gaussian" className="text-base font-light" />
                  </a>
                  <a 
                    href="https://www.instagram.com/timmasso_/" 
                    className="text-base text-white hover:text-white transition-colors font-light"
                  >
                    <VariableProximity label="Instagram" containerRef={containerRef} radius={90} falloff="gaussian" className="text-base font-light" />
                  </a>
                  <a 
                    href="https://www.cosmos.so/timothymasso" 
                    className="text-base text-white hover:text-white transition-colors font-light"
                  >
                    <VariableProximity label="Cosmos" containerRef={containerRef} radius={90} falloff="gaussian" className="text-base font-light" />
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-white/95 font-light text-sm">
                  <VariableProximity label="NYC area" containerRef={containerRef} radius={90} falloff="gaussian" className="text-sm text-white/95 font-light" />
                </p>
                <p className="text-white font-light text-base mt-4">
                  <VariableProximity label="Available for collaborations, performances, and creative projects." containerRef={containerRef} radius={90} falloff="gaussian" className="text-white font-light text-base" />
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <ScrollProgress />
    </div>
  )
}
