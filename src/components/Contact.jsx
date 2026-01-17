import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import VariableProximity from './VariableProximity'

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
      
      const width = canvas.width
      const height = canvas.height
      
      if (width === 0 || height === 0) {
        canvas.width = 75
        canvas.height = 80
        return
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
      
      const width = canvas.width
      const height = canvas.height
      
      if (width === 0 || height === 0) {
        canvas.width = 120
        canvas.height = 100
        return
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
      
      const width = canvas.width
      const height = canvas.height
      
      if (width === 0 || height === 0) {
        canvas.width = 120
        canvas.height = 100
        return
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

  const playNote = useCallback(async (x, y) => {
    if (!audioContextRef.current || !analyserRef.current) {
      await initAudioContext()
      // Wait a bit for analyser to be ready
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    if (!audioContextRef.current || !analyserRef.current) return

    const key = `${x},${y}`
    
    // Stop existing oscillator at this position
    if (oscillatorsRef.current[key]) {
      oscillatorsRef.current[key].oscillator.stop()
      oscillatorsRef.current[key].gainNode.disconnect()
    }

    const container = document.getElementById('contact-visualizer')
    if (!container) return
    
    const normalizedX = x / container.offsetWidth
    const normalizedY = y / container.offsetHeight
    
    // Map position to frequency (musical scale) - favoring higher frequencies
    // Use exponential curve to favor highs: y^2 maps more of the range to higher freqs
    const normalizedYHigh = normalizedY * normalizedY
    const baseFreq = 220 // A3 (higher starting point)
    const semitones = Math.floor(normalizedYHigh * 36) // 3 octaves, favoring highs
    const frequency = baseFreq * Math.pow(2, semitones / 12)
    
    // Map X position to wave type
    const waveTypes = ['sine', 'square', 'sawtooth', 'triangle']
    const waveType = waveTypes[Math.floor(normalizedX * waveTypes.length)]
    
    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator.type = waveType
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.8)
    
    // Connect through analyser
    oscillator.connect(gainNode)
    gainNode.connect(analyserRef.current)
    
    // Make sure analyser is connected to destination (only once)
    if (!analyserRef.current._connected) {
      analyserRef.current.connect(audioContextRef.current.destination)
      analyserRef.current._connected = true
    }
    
    oscillator.start()
    oscillator.stop(audioContextRef.current.currentTime + 0.8)
    
    oscillatorsRef.current[key] = {
      oscillator,
      gainNode,
      startTime: Date.now()
    }
    
    setTimeout(() => {
      delete oscillatorsRef.current[key]
    }, 800)
  }, [])

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
    playNote(pos.x, pos.y)
  }, [getContainerPosition])

  const handleMouseMove = useCallback((e) => {
    const pos = getContainerPosition(e)
    setMousePos(pos)
    if (isMouseDown) {
      playNote(pos.x, pos.y)
    }
  }, [getContainerPosition, isMouseDown])

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  useEffect(() => {
    const updateCanvasSize = () => {
      if (freqCanvasRef.current) {
        const canvas = freqCanvasRef.current
        canvas.width = 75
        canvas.height = 80
      }
      if (waveformCanvasRef.current) {
        const canvas = waveformCanvasRef.current
        canvas.width = 120
        canvas.height = 100
      }
      if (eqCanvasRef.current) {
        const canvas = eqCanvasRef.current
        canvas.width = 120
        canvas.height = 100
      }
    }

    // Initial setup
    const timer = setTimeout(updateCanvasSize, 100)
    updateCanvasSize()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section 
      id="contact" 
      className="h-full px-4 pt-2 pb-4 flex flex-col relative overflow-hidden"
    >
      <div 
        id="contact-visualizer"
        className="flex-1 relative cursor-crosshair min-h-0 h-full" 
        onClick={initAudioContext}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }}>
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
          style={{ top: '8px', left: '8px', width: '75px', height: '80px' }}
        />
        
        {/* Waveform - Top Right */}
        <canvas
          ref={waveformCanvasRef}
          className="absolute pointer-events-none z-10"
          style={{ top: '8px', right: '8px', width: '120px', height: '100px' }}
        />
        
        {/* EQ Bars - Bottom Right */}
        <canvas
          ref={eqCanvasRef}
          className="absolute pointer-events-none z-10"
          style={{ bottom: '8px', right: '8px', width: '120px', height: '100px' }}
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
        <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
          <p className="text-xs text-white font-light">
            click & drag to play
          </p>
        </div>
      </div>
    </section>
  )
}
