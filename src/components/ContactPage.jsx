import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function ContactPage() {
  return (
    <div className="relative z-10 pointer-events-none min-h-screen">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
      <div className="pointer-events-auto">
        <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-12 text-white text-center">
              Let's Connect
            </h1>
            <div className="space-y-8 text-center">
              <div>
                <h2 className="text-2xl font-light text-white mb-4">Email</h2>
                <a 
                  href="mailto:timothy.masso@gmail.com" 
                  className="text-xl text-white/80 hover:text-white transition-colors font-light"
                >
                  timothy.masso@gmail.com
                </a>
              </div>
              <div>
                <h2 className="text-2xl font-light text-white mb-4">Social</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <a 
                    href="https://github.com/timothymasso" 
                    className="text-lg text-white/80 hover:text-white transition-colors font-light"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://www.instagram.com/timmasso_/" 
                    className="text-lg text-white/80 hover:text-white transition-colors font-light"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.cosmos.so/timothymasso" 
                    className="text-lg text-white/80 hover:text-white transition-colors font-light"
                  >
                    Cosmos
                  </a>
                </div>
              </div>
              <div className="pt-8">
                <p className="text-white/60 font-light text-lg">
                  Available for collaborations, performances, and creative projects.
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
