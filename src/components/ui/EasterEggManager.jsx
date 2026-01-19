import React, { useEffect, useState, useCallback } from 'react'
import './EasterEggManager.css'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

const CLICK_SEQUENCE = ['click', 'click', 'click', 'click', 'click'] // 5 clicks
const CLICK_TIMEOUT = 2000 // 2 seconds between clicks

export default function EasterEggManager() {
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [clickSequence, setClickSequence] = useState([])
  const [lastClickTime, setLastClickTime] = useState(0)
  const [activeEggs, setActiveEggs] = useState(new Set())
  const [confettiActive, setConfettiActive] = useState(false)
  const [scrollPattern, setScrollPattern] = useState([])
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [titleClickCount, setTitleClickCount] = useState(0)

  // Helper functions defined first
  const showMessage = useCallback((title, message, duration = 4000) => {
    const messageEl = document.createElement('div')
    messageEl.className = 'easter-egg-message'
    messageEl.innerHTML = `
      <div class="easter-egg-content">
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
    `
    document.body.appendChild(messageEl)

    setTimeout(() => {
      messageEl.classList.add('show')
    }, 10)

    setTimeout(() => {
      messageEl.classList.remove('show')
      setTimeout(() => {
        if (document.body.contains(messageEl)) {
          document.body.removeChild(messageEl)
        }
      }, 300)
    }, duration)
  }, [])

  const createFloatingEmojis = useCallback((emojis) => {
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
        const emojiEl = document.createElement('div')
        emojiEl.className = 'floating-emoji'
        emojiEl.textContent = emoji
        emojiEl.style.left = `${Math.random() * 100}%`
        emojiEl.style.top = `${Math.random() * 100}%`
        document.body.appendChild(emojiEl)

        setTimeout(() => {
          emojiEl.classList.add('float')
        }, 10)

        setTimeout(() => {
          emojiEl.classList.remove('float')
          setTimeout(() => {
            if (document.body.contains(emojiEl)) {
              document.body.removeChild(emojiEl)
            }
          }, 1000)
        }, 2000)
      }, index * 100)
    })
  }, [])

  const triggerKonamiEgg = useCallback(() => {
    setConfettiActive(true)
    showMessage('🎮 Konami Code Activated! 🎮', 'You found the secret!')
    
    // Add rainbow effect
    document.body.style.animation = 'rainbow 3s linear infinite'
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
    document.body.style.backgroundSize = '400% 400%'
    
    setTimeout(() => {
      document.body.style.animation = ''
      document.body.style.background = ''
      document.body.style.backgroundSize = ''
      setConfettiActive(false)
    }, 5000)
  }, [showMessage])

  const triggerClickSequenceEgg = useCallback(() => {
    showMessage('👆 Click Master! 👆', 'You clicked 5 times!')
    createFloatingEmojis(['🎉', '✨', '🌟', '💫', '⭐'])
  }, [showMessage, createFloatingEmojis])

  const triggerHelpEgg = useCallback(() => {
    const helpText = `
      🎮 Easter Egg Help 🎮
      
      Try these secrets:
      • Konami Code: ↑↑↓↓←→←→BA
      • Click 5 times quickly anywhere
      • Click title 7 times
      • Scroll up/down rapidly 6 times
      • Shift+R: Rainbow mode
      • Shift+D: Disco mode
      • Shift+M: Matrix mode
      • Press '?' for this help
    `
    showMessage('Easter Egg Help', helpText, 10000)
  }, [showMessage])

  const triggerRainbowEgg = useCallback((isActive) => {
    if (isActive) {
      document.body.classList.remove('rainbow-mode')
      showMessage('Rainbow Mode', 'Deactivated')
    } else {
      document.body.classList.add('rainbow-mode')
      showMessage('🌈 Rainbow Mode Activated! 🌈', 'Everything is colorful now!')
    }
  }, [showMessage])

  const triggerDiscoEgg = useCallback((isActive) => {
    if (isActive) {
      document.body.classList.remove('disco-mode')
      showMessage('Disco Mode', 'Deactivated')
    } else {
      document.body.classList.add('disco-mode')
      showMessage('🕺 Disco Mode Activated! 🕺', 'Get ready to dance!')
    }
  }, [showMessage])

  const createMatrixEffect = useCallback(() => {
    const overlay = document.createElement('div')
    overlay.id = 'matrix-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.15;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #00ff00;
      overflow: hidden;
    `
    
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    overlay.appendChild(canvas)
    document.body.appendChild(overlay)

    const ctx = canvas.getContext('2d')
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px JetBrains Mono`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    overlay.dataset.interval = interval

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    overlay.dataset.cleanup = 'true'
  }, [])

  const triggerMatrixEgg = useCallback((isActive) => {
    if (isActive) {
      const matrixOverlay = document.getElementById('matrix-overlay')
      if (matrixOverlay) {
        const interval = matrixOverlay.dataset.interval
        if (interval) clearInterval(parseInt(interval))
        const canvas = matrixOverlay.querySelector('canvas')
        if (canvas) {
          window.removeEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
          })
        }
        matrixOverlay.remove()
      }
      showMessage('Matrix Mode', 'Deactivated')
    } else {
      createMatrixEffect()
      showMessage('💊 Matrix Mode Activated! 💊', 'Welcome to the Matrix...')
    }
  }, [showMessage, createMatrixEffect])

  const triggerScrollPatternEgg = useCallback(() => {
    showMessage('📜 Scroll Master! 📜', 'You scrolled like a pro!')
    createFloatingEmojis(['🎊', '🎈', '🎁', '🎀', '🎉'])
    
    // Add a fun scroll effect
    const originalScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Bounce scroll
    let scrollCount = 0
    const bounceScroll = () => {
      if (scrollCount < 3) {
        window.scrollTo({ top: scrollCount % 2 === 0 ? 100 : 0, behavior: 'smooth' })
        scrollCount++
        setTimeout(bounceScroll, 500)
      } else {
        document.documentElement.style.scrollBehavior = originalScrollBehavior
      }
    }
    bounceScroll()
  }, [showMessage, createFloatingEmojis])

  const triggerTitleClickEgg = useCallback(() => {
    showMessage('👑 Title Clicker! 👑', 'You clicked the title 7 times!')
    createFloatingEmojis(['👑', '⭐', '🌟', '💎', '✨'])
    
    // Add a crown effect to all h1 elements
    const h1Elements = document.querySelectorAll('h1')
    h1Elements.forEach(h1 => {
      h1.style.textShadow = '0 0 20px gold, 0 0 40px gold, 0 0 60px gold'
      h1.style.transition = 'all 0.3s ease'
      
      setTimeout(() => {
        h1.style.textShadow = ''
      }, 3000)
    })
  }, [showMessage, createFloatingEmojis])

  // Konami Code Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (KONAMI_CODE[konamiIndex] === e.code) {
        const newIndex = konamiIndex + 1
        setKonamiIndex(newIndex)
        
        if (newIndex === KONAMI_CODE.length) {
          activateEasterEgg('konami')
          setKonamiIndex(0)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex, activateEasterEgg])

  // Click Sequence Handler
  const handleClick = useCallback(() => {
    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime

    if (timeSinceLastClick > CLICK_TIMEOUT) {
      setClickSequence([1])
    } else {
      setClickSequence(prev => [...prev, 1])
    }

    setLastClickTime(now)

    setTimeout(() => {
      setClickSequence(prev => {
        if (prev.length === CLICK_SEQUENCE.length) {
          activateEasterEgg('clickSequence')
          return []
        }
        return prev
      })
    }, CLICK_TIMEOUT)
  }, [lastClickTime])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Press '?' for help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        activateEasterEgg('help')
      }
      
      // Press 'r' for rainbow mode
      if (e.key === 'r' && e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        activateEasterEgg('rainbow')
      }
      
      // Press 'd' for disco mode
      if (e.key === 'd' && e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        activateEasterEgg('disco')
      }
      
      // Press 'm' for matrix mode
      if (e.key === 'm' && e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        activateEasterEgg('matrix')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [activeEggs, activateEasterEgg])

  // Scroll pattern detection (scroll up and down rapidly)
  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollDirection = null

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime

      if (timeSinceLastScroll > 500) {
        setScrollPattern([])
      }

      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection) {
        setScrollPattern(prev => {
          const newPattern = [...prev, direction]
          if (newPattern.length >= 6) {
            // Check for up-down-up-down pattern
            const pattern = newPattern.slice(-6).join('')
            if (pattern === 'updownupdownupdown' || pattern === 'downupdownupdownup') {
              activateEasterEgg('scrollPattern')
              return []
            }
            return newPattern.slice(-5)
          }
          return newPattern
        })
        scrollDirection = direction
      }

      lastScrollY = currentScrollY
      setLastScrollTime(now)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollTime, activateEasterEgg])

  // Title click handler (for clicking on h1 elements)
  useEffect(() => {
    const handleTitleClick = (e) => {
      const target = e.target.closest('h1')
      if (target) {
        setTitleClickCount(prev => {
          const newCount = prev + 1
          if (newCount >= 7) {
            activateEasterEgg('titleClick')
            return 0
          }
          return newCount
        })
        
        // Reset after 3 seconds
        setTimeout(() => {
          setTitleClickCount(0)
        }, 3000)
      }
    }

    document.addEventListener('click', handleTitleClick)
    return () => document.removeEventListener('click', handleTitleClick)
  }, [activateEasterEgg])

  const activateEasterEgg = useCallback((eggType) => {
    setActiveEggs(prev => {
      const newSet = new Set(prev)
      switch (eggType) {
        case 'konami':
          triggerKonamiEgg()
          break
        case 'clickSequence':
          triggerClickSequenceEgg()
          break
        case 'help':
          triggerHelpEgg()
          break
        case 'rainbow':
          triggerRainbowEgg(newSet.has('rainbow'))
          if (!newSet.has('rainbow')) newSet.add('rainbow')
          else newSet.delete('rainbow')
          break
        case 'disco':
          triggerDiscoEgg(newSet.has('disco'))
          if (!newSet.has('disco')) newSet.add('disco')
          else newSet.delete('disco')
          break
        case 'matrix':
          triggerMatrixEgg(newSet.has('matrix'))
          if (!newSet.has('matrix')) newSet.add('matrix')
          else newSet.delete('matrix')
          break
        case 'scrollPattern':
          triggerScrollPatternEgg()
          break
        case 'titleClick':
          triggerTitleClickEgg()
          break
        default:
          newSet.add(eggType)
      }
      return newSet
    })
  }, [triggerKonamiEgg, triggerClickSequenceEgg, triggerHelpEgg, triggerRainbowEgg, triggerDiscoEgg, triggerMatrixEgg, triggerScrollPatternEgg, triggerTitleClickEgg])


  // Attach click handler to document
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  // Confetti effect
  useEffect(() => {
    if (!confettiActive) return

    const createConfetti = () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      const confettiCount = 50

      for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div')
          confetti.className = 'confetti-piece'
          confetti.style.left = `${Math.random() * 100}%`
          confetti.style.top = '-10px'
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
          confetti.style.width = `${Math.random() * 10 + 5}px`
          confetti.style.height = `${Math.random() * 10 + 5}px`
          confetti.style.position = 'fixed'
          confetti.style.zIndex = '9999'
          confetti.style.pointerEvents = 'none'
          confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'
          
          const rotation = Math.random() * 360
          const duration = Math.random() * 3 + 2
          const delay = Math.random() * 0.5
          
          confetti.style.transform = `rotate(${rotation}deg)`
          confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`
          
          document.body.appendChild(confetti)

          setTimeout(() => {
            if (document.body.contains(confetti)) {
              document.body.removeChild(confetti)
            }
          }, (duration + delay) * 1000)
        }, i * 20)
      }
    }

    createConfetti()
  }, [confettiActive])

  return null
}
