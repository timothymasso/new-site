import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './DrumPatternMaker.css';

const DRUM_SOUNDS = {
  kick: { name: 'Kick', color: 'rgba(100, 150, 255, 1)', glowColor: 'rgba(100, 150, 255, 0.6)' },
  snare: { name: 'Snare', color: 'rgba(255, 120, 120, 1)', glowColor: 'rgba(255, 120, 120, 0.6)' },
  hihat: { name: 'Hi-Hat', color: 'rgba(120, 255, 150, 1)', glowColor: 'rgba(120, 255, 150, 0.6)' }
};

const STEPS = 16; // 16 steps for a 4/4 pattern
const BPM = 120;

export default function DrumPatternMaker({ audioContext, volume = 0.5 }) {
  const [pattern, setPattern] = useState({
    kick: new Array(STEPS).fill(false),
    snare: new Array(STEPS).fill(false),
    hihat: new Array(STEPS).fill(false)
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const intervalRef = useRef(null);
  const stepIntervalRef = useRef(null);
  const localAudioContextRef = useRef(null);
  const stepsContainerRef = useRef(null);

  // Initialize audio context if not provided
  useEffect(() => {
    if (!audioContext && !localAudioContextRef.current) {
      try {
        localAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.error('Error initializing audio context:', error);
      }
    }
  }, [audioContext]);

  const getAudioContext = () => {
    return audioContext || localAudioContextRef.current;
  };

  // Generate drum sounds using Web Audio API
  const playDrumSound = useCallback((drumType) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (drumType) {
      case 'kick':
        // Kick drum: layered low frequency with pitch envelope
        const kickOsc1 = ctx.createOscillator();
        const kickOsc2 = ctx.createOscillator();
        const kickGain = ctx.createGain();
        const kickFilter = ctx.createBiquadFilter();
        
        kickOsc1.type = 'sine';
        kickOsc1.frequency.setValueAtTime(80, now);
        kickOsc1.frequency.exponentialRampToValueAtTime(40, now + 0.05);
        
        kickOsc2.type = 'sine';
        kickOsc2.frequency.setValueAtTime(60, now);
        kickOsc2.frequency.exponentialRampToValueAtTime(30, now + 0.08);
        
        kickFilter.type = 'lowpass';
        kickFilter.frequency.setValueAtTime(200, now);
        kickFilter.Q.setValueAtTime(1, now);
        
        kickGain.gain.setValueAtTime(volume * 0.9, now);
        kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        kickOsc1.connect(kickFilter);
        kickOsc2.connect(kickFilter);
        kickFilter.connect(kickGain);
        kickGain.connect(ctx.destination);
        
        kickOsc1.start(now);
        kickOsc1.stop(now + 0.4);
        kickOsc2.start(now);
        kickOsc2.stop(now + 0.4);
        break;

      case 'snare':
        // Snare: white noise with sharp attack and body tone
        const bufferSize = ctx.sampleRate * 0.1;
        const snareBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const snareOutput = snareBuffer.getChannelData(0);
        
        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
          snareOutput[i] = Math.random() * 2 - 1;
        }
        
        const snareNoise = ctx.createBufferSource();
        snareNoise.buffer = snareBuffer;
        
        const snareTone = ctx.createOscillator();
        snareTone.type = 'triangle';
        snareTone.frequency.setValueAtTime(180, now);
        
        const snareFilter = ctx.createBiquadFilter();
        snareFilter.type = 'bandpass';
        snareFilter.frequency.setValueAtTime(2000, now);
        snareFilter.Q.setValueAtTime(0.5, now);
        
        const snareGain = ctx.createGain();
        snareGain.gain.setValueAtTime(volume * 0.7, now);
        snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        const snareToneGain = ctx.createGain();
        snareToneGain.gain.setValueAtTime(volume * 0.3, now);
        snareToneGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        
        snareNoise.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareTone.connect(snareToneGain);
        snareGain.connect(ctx.destination);
        snareToneGain.connect(ctx.destination);
        
        snareNoise.start(now);
        snareNoise.stop(now + 0.15);
        snareTone.start(now);
        snareTone.stop(now + 0.08);
        break;

      case 'hihat':
        // Hi-hat: filtered noise with sharp attack
        const hihatBufferSize = ctx.sampleRate * 0.05;
        const hihatBuffer = ctx.createBuffer(1, hihatBufferSize, ctx.sampleRate);
        const hihatOutput = hihatBuffer.getChannelData(0);
        
        // Generate filtered noise
        for (let i = 0; i < hihatBufferSize; i++) {
          hihatOutput[i] = (Math.random() * 2 - 1) * 0.5;
        }
        
        const hihatNoise = ctx.createBufferSource();
        hihatNoise.buffer = hihatBuffer;
        
        const hihatFilter = ctx.createBiquadFilter();
        hihatFilter.type = 'highpass';
        hihatFilter.frequency.setValueAtTime(8000, now);
        hihatFilter.Q.setValueAtTime(1, now);
        
        const hihatGain = ctx.createGain();
        hihatGain.gain.setValueAtTime(volume * 0.5, now);
        hihatGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        
        hihatNoise.connect(hihatFilter);
        hihatFilter.connect(hihatGain);
        hihatGain.connect(ctx.destination);
        
        hihatNoise.start(now);
        hihatNoise.stop(now + 0.08);
        break;
    }
  }, [volume]);

  const toggleStep = (drumType, stepIndex) => {
    setPattern(prev => ({
      ...prev,
      [drumType]: prev[drumType].map((active, idx) =>
        idx === stepIndex ? !active : active
      )
    }));
  };

  const handleStepMouseDown = (drumType, stepIndex, e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ drumType, stepIndex });
    setDragEnd({ drumType, stepIndex });
    // Toggle the initial step
    toggleStep(drumType, stepIndex);
  };

  const handleStepMouseEnter = (drumType, stepIndex) => {
    if (isDragging && dragStart) {
      setDragEnd({ drumType, stepIndex });
      // Update pattern based on drag range
      setPattern(prev => {
        const newPattern = { ...prev };
        const startIdx = Math.min(dragStart.stepIndex, stepIndex);
        const endIdx = Math.max(dragStart.stepIndex, stepIndex);
        const targetValue = !prev[drumType][dragStart.stepIndex];
        
        newPattern[drumType] = prev[drumType].map((active, idx) => {
          if (idx >= startIdx && idx <= endIdx) {
            return targetValue;
          }
          return active;
        });
        return newPattern;
      });
    }
  };

  const handleStepMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setDragStart(null);
      setDragEnd(null);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  const clearPattern = () => {
    setPattern({
      kick: new Array(STEPS).fill(false),
      snare: new Array(STEPS).fill(false),
      hihat: new Array(STEPS).fill(false)
    });
  };

  const startPlayback = useCallback(() => {
    if (!audioContext || isPlaying) return;

    setIsPlaying(true);
    setCurrentStep(0);

    const stepDuration = (60 / BPM / 4) * 1000; // 16th notes

    stepIntervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % STEPS;

        // Play sounds for current step
        Object.keys(pattern).forEach(drumType => {
          if (pattern[drumType][prev]) {
            playDrumSound(drumType);
          }
        });

        return nextStep;
      });
    }, stepDuration);
  }, [pattern, playDrumSound, isPlaying]);

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
      }
    };
  }, []);

  // Update bar marker positions based on actual step positions
  useEffect(() => {
    if (!stepsContainerRef.current) return;

    const updateBarPositions = () => {
      const stepsContainer = stepsContainerRef.current;
      const gridContainer = stepsContainer.closest('.drum-grid');
      if (!stepsContainer || !gridContainer) return;

      const steps = stepsContainer.querySelectorAll('.drum-step');
      if (steps.length < 16) return;

      // Get position of step 4, 8, and 12 (0-indexed: steps 3, 7, 11)
      const step4Rect = steps[3]?.getBoundingClientRect();
      const step8Rect = steps[7]?.getBoundingClientRect();
      const step12Rect = steps[11]?.getBoundingClientRect();
      const gridRect = gridContainer.getBoundingClientRect();
      const stepsRect = stepsContainer.getBoundingClientRect();

      if (step4Rect && step8Rect && step12Rect) {
        // Position markers after each step (right edge), relative to grid
        const markers = gridContainer.querySelectorAll('.drum-bar-marker');
        if (markers.length >= 3) {
          // Calculate position relative to grid: label width + gap + step position
          const labelWidth = 60;
          const gap = 8; // 0.5rem ≈ 8px
          
          markers[0].style.left = `${step4Rect.right - gridRect.left}px`;
          markers[1].style.left = `${step8Rect.right - gridRect.left}px`;
          markers[2].style.left = `${step12Rect.right - gridRect.left}px`;
        }
      }
    };

    // Use setTimeout to ensure DOM is rendered
    const timer = setTimeout(updateBarPositions, 0);
    window.addEventListener('resize', updateBarPositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateBarPositions);
    };
  }, [pattern]);

  return (
    <div className="drum-pattern-maker">
      <div className="drum-header">
        <h3 className="drum-title">Drum Pattern</h3>
        <div className="drum-controls">
          <button
            onClick={isPlaying ? stopPlayback : startPlayback}
            className="drum-play-button"
          >
            {isPlaying ? '⏸ Stop' : '▶ Play'}
          </button>
          <button onClick={clearPattern} className="drum-clear-button">
            Clear
          </button>
        </div>
      </div>

      <div className="drum-grid">
        {/* Bar markers - single vertical lines spanning all rows, every 4 steps */}
        {/* Markers appear after steps 4, 8, and 12 (dividing into 4 bars of 4 steps each) */}
        {[4, 8, 12].map((barPosition) => (
          <div
            key={`bar-${barPosition}`}
            className="drum-bar-marker"
            data-position={barPosition}
          />
        ))}
        {Object.keys(DRUM_SOUNDS).map((drumType, rowIndex) => (
          <div key={drumType} className="drum-row">
            <div className="drum-label" style={{ color: DRUM_SOUNDS[drumType].color }}>
              {DRUM_SOUNDS[drumType].name}
            </div>
            <div className="drum-steps" ref={rowIndex === 0 ? stepsContainerRef : null}>
              {pattern[drumType].map((active, stepIndex) => (
                <motion.button
                  key={stepIndex}
                  className={`drum-step ${active ? 'active' : ''} ${
                    isPlaying && currentStep === stepIndex ? 'playing' : ''
                  }`}
                  style={{
                    backgroundColor: active
                      ? DRUM_SOUNDS[drumType].color
                      : 'rgba(255, 255, 255, 0.05)',
                    borderColor: active 
                      ? DRUM_SOUNDS[drumType].color 
                      : DRUM_SOUNDS[drumType].glowColor,
                    boxShadow: active 
                      ? `0 0 12px ${DRUM_SOUNDS[drumType].glowColor}, inset 0 0 8px rgba(255, 255, 255, 0.2)` 
                      : 'none'
                  }}
                  onMouseDown={(e) => handleStepMouseDown(drumType, stepIndex, e)}
                  onMouseEnter={() => handleStepMouseEnter(drumType, stepIndex)}
                  onMouseUp={handleStepMouseUp}
                  whileHover={{ scale: isDragging ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => {
                    if (!active && !isDragging) {
                      playDrumSound(drumType);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
