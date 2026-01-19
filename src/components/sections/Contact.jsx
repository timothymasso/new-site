import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import VariableProximity from '../ui/VariableProximity'
import ElasticSlider from '../ui/ElasticSlider'
import DrumPatternMaker from '../ui/DrumPatternMaker'

function CircularSoundReactor({ frequencies }) {
  const groupRef = useRef()
  const timeRef = useRef(0)
  
  const bars = useMemo(() => {
    // Create circular arrangement of bars
    const numBars = 32
    const barsArray = []
    for (let i = 0; i < numBars; i++) {
      const angle = (i / numBars) * Math.PI * 2
      barsArray.push({
        angle,
        radius: 1.2,
        baseHeight: 0.1
      })
    }
    return barsArray
  }, [])

  useFrame((state, delta) => {
    timeRef.current += delta
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Original */}
      <group>
        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial 
            color={new THREE.Color(0.2, 0.3, 1)} 
            emissive={new THREE.Color(0.1, 0.15, 0.5)}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Circular frequency bars */}
        {bars.map((bar, i) => {
          const freqIndex = Math.floor((i / bars.length) * frequencies.length)
          const intensity = frequencies[freqIndex] / 255 || 0
          const height = bar.baseHeight + intensity * 1.5
          const x = Math.cos(bar.angle) * bar.radius
          const z = Math.sin(bar.angle) * bar.radius
          
          return (
            <mesh key={i} position={[x, height / 2, z]} rotation={[0, bar.angle, 0]}>
              <boxGeometry args={[0.05, height, 0.05]} />
              <meshStandardMaterial 
                color={new THREE.Color(0.2 + intensity * 0.1, 0.3 + intensity * 0.1, 1)}
                emissive={new THREE.Color(0.1 + intensity * 0.05, 0.15 + intensity * 0.05, 0.5 + intensity * 0.2)}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Mirrored (flipped vertically) */}
      <group scale={[1, -1, 1]}>
        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial 
            color={new THREE.Color(0.2, 0.3, 1)} 
            emissive={new THREE.Color(0.1, 0.15, 0.5)}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Circular frequency bars */}
        {bars.map((bar, i) => {
          const freqIndex = Math.floor((i / bars.length) * frequencies.length)
          const intensity = frequencies[freqIndex] / 255 || 0
          const height = bar.baseHeight + intensity * 1.5
          const x = Math.cos(bar.angle) * bar.radius
          const z = Math.sin(bar.angle) * bar.radius
          
          return (
            <mesh key={`mirror-${i}`} position={[x, height / 2, z]} rotation={[0, bar.angle, 0]}>
              <boxGeometry args={[0.05, height, 0.05]} />
              <meshStandardMaterial 
                color={new THREE.Color(0.2 + intensity * 0.1, 0.3 + intensity * 0.1, 1)}
                emissive={new THREE.Color(0.1 + intensity * 0.05, 0.15 + intensity * 0.05, 0.5 + intensity * 0.2)}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export default function Contact({ containerRef }) {
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const oscillatorsRef = useRef({})
  const [isActive, setIsActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [frequencies, setFrequencies] = useState(new Uint8Array(32))
  const [waveform, setWaveform] = useState(new Uint8Array(32))
  const [volume, setVolume] = useState(0.5) // Volume control (0-1), slider uses 0-100
  const freqCanvasRef = useRef(null)
  const waveformCanvasRef = useRef(null)
  const eqCanvasRef = useRef(null)


  // Throttle canvas drawing to reduce CPU usage
  const lastDrawTime = useRef(0)
  const DRAW_THROTTLE = 16 // ~60fps

  useEffect(() => {
    let animationFrameId = null
    
    const drawFrequencyChart = () => {
      const canvas = freqCanvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      let width = canvas.width
      let height = canvas.height
      
      if (width === 0 || height === 0) {
        const vw = window.innerWidth / 100
        const vh = window.innerHeight / 100
        width = Math.max(50, Math.min(75, 8 * vw))
        height = Math.max(60, Math.min(80, 8 * vh))
        canvas.width = width
        canvas.height = height
      }
      
      ctx.clearRect(0, 0, width, height)
      
      if (frequencies.length === 0) return
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      const sliceWidth = width / frequencies.length
      let x = 0
      
      for (let i = 0; i < frequencies.length; i++) {
        const v = frequencies[i] / 255.0
        const y = height - (v * height)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        
        x += sliceWidth
      }
      
      ctx.stroke()
    }

    const drawWaveform = () => {
      const canvas = waveformCanvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      let width = canvas.width
      let height = canvas.height
      
      if (width === 0 || height === 0) {
        const vw = window.innerWidth / 100
        const vh = window.innerHeight / 100
        width = Math.max(80, Math.min(120, 12 * vw))
        height = Math.max(70, Math.min(100, 10 * vh))
        canvas.width = width
        canvas.height = height
      }
      
      ctx.clearRect(0, 0, width, height)
      
      if (waveform.length === 0) return
      
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.beginPath()
      
      const sliceWidth = width / waveform.length
      let x = 0
      const centerY = height / 2
      
      for (let i = 0; i < waveform.length; i++) {
        const v = (waveform[i] - 128) / 128.0
        const y = centerY + (v * centerY)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        
        x += sliceWidth
      }
      
      ctx.stroke()
    }

    const drawEQ = () => {
      const canvas = eqCanvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      let width = canvas.width
      let height = canvas.height
      
      if (width === 0 || height === 0) {
        const vw = window.innerWidth / 100
        const vh = window.innerHeight / 100
        width = Math.max(80, Math.min(120, 12 * vw))
        height = Math.max(70, Math.min(100, 10 * vh))
        canvas.width = width
        canvas.height = height
      }
      
      ctx.clearRect(0, 0, width, height)
      
      if (frequencies.length === 0) return
      
      const numBars = 32
      const barWidth = width / numBars
      const gap = barWidth * 0.1
      
      for (let i = 0; i < numBars; i++) {
        const freqIndex = Math.floor((i / numBars) * frequencies.length)
        const intensity = frequencies[freqIndex] / 255
        const barHeight = intensity * height
        
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(
          i * barWidth + gap,
          height - barHeight,
          barWidth - gap * 2,
          barHeight
        )
      }
    }

    const animate = (currentTime) => {
      // Throttle drawing - use performance.now() if currentTime not provided
      const now = currentTime || performance.now()
      if (now - lastDrawTime.current >= DRAW_THROTTLE) {
        drawFrequencyChart()
        drawWaveform()
        drawEQ()
        lastDrawTime.current = now
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [frequencies, waveform])

  const initAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContextRef.current.createAnalyser()
        analyser.fftSize = 256
        analyserRef.current = analyser
        setIsActive(true)
        
        // Start analyzing audio with throttling
        let lastUpdateTime = 0
        const UPDATE_THROTTLE = 16 // ~60fps
        
        const updateAnalysis = (currentTime) => {
          if (!analyserRef.current) return
          
          // Throttle updates to reduce state changes
          if (currentTime - lastUpdateTime >= UPDATE_THROTTLE) {
            const freqData = new Uint8Array(analyser.frequencyBinCount)
            const waveData = new Uint8Array(analyser.frequencyBinCount)
            
            analyser.getByteFrequencyData(freqData)
            analyser.getByteTimeDomainData(waveData)
            
            setFrequencies(freqData)
            setWaveform(waveData)
            
            lastUpdateTime = currentTime
          }
          
          requestAnimationFrame(updateAnalysis)
        }
        requestAnimationFrame(updateAnalysis)
      } catch (error) {
        console.error('Error initializing audio:', error)
      }
    }
  }, [])

  const playNote = useCallback(async (x, y, shouldHold = false) => {
    if (!audioContextRef.current || !analyserRef.current) {
      await initAudioContext()
      // Wait a bit for analyser to be ready
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    if (!audioContextRef.current || !analyserRef.current) return

    const container = document.getElementById('contact-visualizer')
    if (!container) return
    
    const normalizedX = x / container.offsetWidth
    const normalizedY = y / container.offsetHeight
    
    // Map position to frequency (musical scale) - favoring higher frequencies
    // Use exponential curve to favor highs: y^2 maps more of the range to higher freqs
    const normalizedYHigh = normalizedY * normalizedY
    const baseFreq = 220 // A3 (higher starting point)
    const semitones = Math.floor(normalizedYHigh * 36) // 3 octaves, favoring highs
    
    const rootFreq = baseFreq * Math.pow(2, semitones / 12)
    
    // Map X position to chord type (divide into 8 regions)
    const chordTypeIndex = Math.floor(normalizedX * 8)
    let frequencies = []
    
    // Calculate frequencies based on chord type
    switch (chordTypeIndex) {
      case 0: // Major triad
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 4 / 12),  // Major third
          rootFreq * Math.pow(2, 7 / 12)   // Perfect fifth
        ]
        break
      case 1: // Minor triad
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 3 / 12),  // Minor third
          rootFreq * Math.pow(2, 7 / 12)   // Perfect fifth
        ]
        break
      case 2: // Dominant 7th
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 4 / 12),  // Major third
          rootFreq * Math.pow(2, 7 / 12), // Perfect fifth
          rootFreq * Math.pow(2, 10 / 12)  // Minor seventh
        ]
        break
      case 3: // Major 7th
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 4 / 12),  // Major third
          rootFreq * Math.pow(2, 7 / 12),  // Perfect fifth
          rootFreq * Math.pow(2, 11 / 12)  // Major seventh
        ]
        break
      case 4: // Minor 7th
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 3 / 12),  // Minor third
          rootFreq * Math.pow(2, 7 / 12),  // Perfect fifth
          rootFreq * Math.pow(2, 10 / 12)  // Minor seventh
        ]
        break
      case 5: // Suspended 4th (sus4)
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 5 / 12),  // Perfect fourth
          rootFreq * Math.pow(2, 7 / 12)   // Perfect fifth
        ]
        break
      case 6: // Diminished triad
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 3 / 12),  // Minor third
          rootFreq * Math.pow(2, 6 / 12)   // Diminished fifth
        ]
        break
      case 7: // Augmented triad
        frequencies = [
          rootFreq,
          rootFreq * Math.pow(2, 4 / 12),  // Major third
          rootFreq * Math.pow(2, 8 / 12)   // Augmented fifth
        ]
        break
      default:
        frequencies = [rootFreq]
    }
    
    // Map X position to wave type
    const waveTypes = ['sine', 'square', 'sawtooth', 'triangle']
    const waveType = waveTypes[Math.floor(normalizedX * waveTypes.length)]
    
    // Use a single key for the active note when holding
    const key = shouldHold ? 'active' : `${x},${y}`
    
    // If holding and oscillators exist, update frequencies and wave type
    if (shouldHold && oscillatorsRef.current[key]) {
      const { oscillators, gainNodes } = oscillatorsRef.current[key]
      // If number of frequencies changed, recreate oscillators
      if (oscillators.length !== frequencies.length) {
        // Stop old oscillators
        oscillators.forEach(osc => osc.stop())
        gainNodes.forEach(gain => gain.disconnect())
        // Will fall through to create new ones
      } else {
        // Update frequencies and volume for all oscillators
        frequencies.forEach((freq, index) => {
          oscillators[index].frequency.setValueAtTime(freq, audioContextRef.current.currentTime)
          const baseVolume = index === 0 ? 0.2 : 0.13
          const adjustedVolume = baseVolume * volume
          gainNodes[index].gain.setValueAtTime(adjustedVolume, audioContextRef.current.currentTime)
        })
        oscillators.forEach(osc => {
          osc.type = waveType
        })
        return
      }
    }
    
    // Stop existing oscillators at this position
    if (oscillatorsRef.current[key]) {
      const { oscillators, gainNodes } = oscillatorsRef.current[key]
      oscillators.forEach(osc => osc.stop())
      gainNodes.forEach(gain => gain.disconnect())
    }
    
    // Create oscillators for the chord (number depends on chord type)
    const oscillators = []
    const gainNodes = []
    
    frequencies.forEach((frequency, index) => {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.type = waveType
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      
      // Balance volumes: root loudest, others slightly quieter
      const baseVolume = index === 0 ? 0.2 : 0.13
      const adjustedVolume = baseVolume * volume
      
      if (shouldHold) {
        // Keep note playing while held
        gainNode.gain.setValueAtTime(adjustedVolume, audioContextRef.current.currentTime)
      } else {
        // Fade out for click
        gainNode.gain.setValueAtTime(adjustedVolume, audioContextRef.current.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.8)
      }
      
      // Connect through analyser
      oscillator.connect(gainNode)
      gainNode.connect(analyserRef.current)
      
      oscillators.push(oscillator)
      gainNodes.push(gainNode)
    })
    
    // Make sure analyser is connected to destination (only once)
    if (!analyserRef.current._connected) {
      analyserRef.current.connect(audioContextRef.current.destination)
      analyserRef.current._connected = true
    }
    
    // Start all oscillators
    oscillators.forEach(osc => osc.start())
    
    if (!shouldHold) {
      oscillators.forEach(osc => {
        osc.stop(audioContextRef.current.currentTime + 0.8)
      })
      setTimeout(() => {
        delete oscillatorsRef.current[key]
      }, 800)
    }
    
    oscillatorsRef.current[key] = {
      oscillators,
      gainNodes,
      startTime: Date.now()
    }
  }, [initAudioContext, volume])

  const getContainerPosition = useCallback((e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return { x, y }
  }, [])

  const handleMouseDown = useCallback((e) => {
    setIsMouseDown(true)
    const pos = getContainerPosition(e)
    setMousePos(pos)
    playNote(pos.x, pos.y, true)
  }, [getContainerPosition, playNote])

  const handleMouseMove = useCallback((e) => {
    const pos = getContainerPosition(e)
    setMousePos(pos)
    if (isMouseDown) {
      playNote(pos.x, pos.y, true)
    }
  }, [getContainerPosition, isMouseDown, playNote])

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false)
    // Stop the active note when mouse is released
    if (oscillatorsRef.current['active'] && audioContextRef.current) {
      const { oscillators, gainNodes } = oscillatorsRef.current['active']
      oscillators.forEach((oscillator, index) => {
        gainNodes[index].gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1)
        oscillator.stop(audioContextRef.current.currentTime + 0.1)
        gainNodes[index].disconnect()
      })
      delete oscillatorsRef.current['active']
    }
  }, [])

  // Update volume for all active oscillators when volume changes
  useEffect(() => {
    if (!audioContextRef.current) return
    
    Object.values(oscillatorsRef.current).forEach(({ oscillators, gainNodes }) => {
      oscillators.forEach((osc, index) => {
        if (osc && gainNodes[index]) {
          const baseVolume = index === 0 ? 0.2 : 0.13
          const adjustedVolume = baseVolume * volume
          gainNodes[index].gain.setValueAtTime(adjustedVolume, audioContextRef.current.currentTime)
        }
      })
    })
  }, [volume])

  useEffect(() => {
    const updateCanvasSize = () => {
      const vw = window.innerWidth / 100
      const vh = window.innerHeight / 100
      
      if (freqCanvasRef.current) {
        const canvas = freqCanvasRef.current
        const width = Math.max(50, Math.min(75, 8 * vw))
        const height = Math.max(60, Math.min(80, 8 * vh))
        canvas.width = width
        canvas.height = height
      }
      if (waveformCanvasRef.current) {
        const canvas = waveformCanvasRef.current
        const width = Math.max(80, Math.min(120, 12 * vw))
        const height = Math.max(70, Math.min(100, 10 * vh))
        canvas.width = width
        canvas.height = height
      }
      if (eqCanvasRef.current) {
        const canvas = eqCanvasRef.current
        const width = Math.max(80, Math.min(120, 12 * vw))
        const height = Math.max(70, Math.min(100, 10 * vh))
        canvas.width = width
        canvas.height = height
      }
    }

    // Initial setup
    const timer = setTimeout(updateCanvasSize, 100)
    updateCanvasSize()
    
    // Update on resize with debouncing
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateCanvasSize()
      }, 16) // ~60fps
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section 
      id="contact" 
      className="h-full flex flex-col relative overflow-hidden"
      style={{ 
        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
        paddingTop: 'clamp(0.5rem, 1.5vh, 1rem)',
        paddingBottom: 'clamp(0.5rem, 1.5vh, 1rem)',
        minWidth: 0,
        maxWidth: '100%',
        minHeight: 0
      }}
    >
      <div 
        id="contact-visualizer"
        className="flex-1 relative cursor-crosshair min-h-0 h-full w-full" 
        onClick={initAudioContext}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: '100%', height: '100%' }}
      >
        <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={1} />
          <pointLight position={[-3, -3, -3]} intensity={0.5} />
          <directionalLight position={[0, 5, 0]} intensity={0.3} />
          <CircularSoundReactor frequencies={frequencies} />
        </Canvas>
        
        {/* 2D Visualizations */}
        {/* Frequency Chart - Top Left */}
        <canvas
          ref={freqCanvasRef}
          className="absolute pointer-events-none z-10"
          style={{ 
            top: 'clamp(4px, 1vh, 8px)', 
            left: 'clamp(4px, 1vw, 8px)', 
            width: 'clamp(50px, 8vw, 75px)', 
            height: 'clamp(60px, 8vh, 80px)' 
          }}
        />
        
        {/* Waveform - Top Right */}
        <canvas
          ref={waveformCanvasRef}
          className="absolute pointer-events-none z-10"
          style={{ 
            top: 'clamp(4px, 1vh, 8px)', 
            right: 'clamp(4px, 1vw, 8px)', 
            width: 'clamp(80px, 12vw, 120px)', 
            height: 'clamp(70px, 10vh, 100px)' 
          }}
        />
        
        {/* EQ Bars - Bottom Right */}
        <canvas
          ref={eqCanvasRef}
          className="absolute pointer-events-none z-10"
          style={{ 
            bottom: 'clamp(4px, 1vh, 8px)', 
            right: 'clamp(4px, 1vw, 8px)', 
            width: 'clamp(80px, 12vw, 120px)', 
            height: 'clamp(70px, 10vh, 100px)' 
          }}
        />
        
        {mousePos && (
          <div 
            className="absolute pointer-events-none z-20"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
              width: isMouseDown ? '16px' : '12px',
              height: isMouseDown ? '16px' : '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(51, 77, 255, 0.8)',
              boxShadow: '0 0 10px rgba(51, 77, 255, 0.8)',
              transition: 'width 0.1s, height 0.1s'
            }}
          />
        )}
        <div className="absolute z-10 pointer-events-none" style={{ 
          bottom: 'clamp(0.25rem, 1vh, 0.5rem)',
          left: 'clamp(0.25rem, 1vw, 0.5rem)'
        }}>
          <p className="text-white font-light" style={{ 
            fontSize: 'clamp(0.5rem, 1.25vw, 0.75rem)',
            marginBottom: 'clamp(0.125rem, 0.5vh, 0.25rem)',
            lineHeight: '1.2'
          }}>
            click & drag to play
          </p>
        </div>
      </div>
      
      {/* Volume Slider - Outside play area */}
      <div className="absolute z-30 pointer-events-auto" style={{ 
        bottom: 'clamp(0.75rem, 2vh, 1.5rem)',
        left: 'clamp(0.75rem, 2vw, 1.5rem)'
      }}>
        <ElasticSlider
          defaultValue={50}
          startingValue={0}
          maxValue={100}
          isStepped={false}
          stepSize={1}
          onChange={(value) => setVolume(value / 100)}
          className="volume-slider"
        />
      </div>

      {/* Drum Pattern Maker - Outside play area */}
      <div className="absolute z-30 pointer-events-auto" style={{ 
        bottom: 'clamp(0.75rem, 2vh, 1.5rem)',
        right: 'clamp(0.75rem, 2vw, 1.5rem)'
      }}>
        <DrumPatternMaker
          audioContext={audioContextRef.current}
          volume={volume}
        />
      </div>
    </section>
  )
}
