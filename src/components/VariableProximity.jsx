import { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { manager } from './VariableProximityManager';
import './VariableProximity.css';

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = ev => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings = "'wght' 300",
    toFontVariationSettings = "'wght' 700",
    containerRef,
    radius = 90,
    falloff = 'gaussian',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance, useFastFalloff = false) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    // For long text, use linear falloff (much faster than gaussian)
    if (useFastFalloff) {
      return norm;
    }
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  const instanceRef = useRef({});
  const containerRectRef = useRef(null);
  const letterPositionsRef = useRef([]);
  const positionsCachedRef = useRef(false);
  const lastCacheTimeRef = useRef(0);
  const needsPositionUpdateRef = useRef(true);
  
  // Mark instance as long text for manager optimization
  useEffect(() => {
    instanceRef.current.isLongText = label.length > 50;
  }, [label]);

  // Cache letter positions immediately when they're available
  const cacheLetterPositions = useRef(() => {
    if (!containerRef?.current) return;
    
    if (!containerRectRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
    const containerRect = containerRectRef.current;

    // Batch all getBoundingClientRect calls together - this is expensive but necessary
    // We do it all at once to minimize layout thrashing
    const rects = letterRefs.current.map(ref => ref?.getBoundingClientRect());
    
    letterPositionsRef.current = rects.map((rect) => {
      if (!rect) return null;
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    });
    
    positionsCachedRef.current = true;
    lastCacheTimeRef.current = performance.now();
  }).current;

  // Update function that will be called by the shared manager
  instanceRef.current.update = () => {
    if (!containerRef?.current) return;
    
    const { x, y } = mousePositionRef.current;
    
    // Skip if mouse hasn't moved
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    // Update container rect only when needed (every 60 frames ~1 second)
    const now = performance.now();
    if (!containerRectRef.current || now - lastCacheTimeRef.current > 1000) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
    const containerRect = containerRectRef.current;

    // Cache positions if not cached or if enough time has passed (every 500ms)
    if (!positionsCachedRef.current || now - lastCacheTimeRef.current > 500) {
      cacheLetterPositions();
    }

    const mouseX = x;
    const mouseY = y;
    const radiusSquared = radius * radius;
    const letterCount = letterRefs.current.length;
    const isLongText = letterCount > 50;
    
    // For long text, use much more aggressive optimizations
    const effectiveRadius = isLongText ? radius * 0.8 : radius; // Smaller radius for long text
    const effectiveRadiusSquared = effectiveRadius * effectiveRadius;
    const checkRadiusSquared = radiusSquared * 1.5; // Early exit radius
    
    // Pre-calculate interpolation values for faster string building
    const fromValues = parsedSettings.map(s => s.fromValue);
    const toValues = parsedSettings.map(s => s.toValue);
    const deltas = parsedSettings.map(s => s.toValue - s.fromValue);
    const axisNames = parsedSettings.map(s => s.axis);

    // For long text, process fewer letters per frame using frame skipping
    const processAll = !isLongText;
    const skipFactor = isLongText ? Math.max(1, Math.floor(letterCount / 30)) : 1;
    let processedCount = 0;
    const maxProcessPerFrame = isLongText ? 20 : Infinity;

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      
      // Skip letters for long text to maintain 60fps
      if (!processAll && index % skipFactor !== 0 && processedCount >= maxProcessPerFrame) {
        return;
      }

      const pos = letterPositionsRef.current[index];
      if (!pos) {
        if (needsPositionUpdateRef.current) {
          cacheLetterPositions();
          needsPositionUpdateRef.current = false;
        }
        return;
      }

      // Fast distance squared check (avoid sqrt when possible)
      const dx = mouseX - pos.x;
      const dy = mouseY - pos.y;
      const distanceSquared = dx * dx + dy * dy;

      // Aggressive early exit for letters far from mouse
      if (distanceSquared >= checkRadiusSquared) {
        const currentSettings = letterRef.style.fontVariationSettings;
        if (currentSettings !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
        }
        return;
      }

      // Only calculate sqrt when needed (inside effective radius)
      if (distanceSquared >= effectiveRadiusSquared) {
        // Outside effective radius but inside check radius - set to default
        const currentSettings = letterRef.style.fontVariationSettings;
        if (currentSettings !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
        }
        return;
      }
      
      processedCount++;
      
      // Only calculate sqrt for letters inside effective radius
      const distance = Math.sqrt(distanceSquared);
      
      // Use fast linear falloff for long text
      const falloffValue = calculateFalloff(distance, isLongText);
      
      // Fast interpolation - optimized string building
      let newSettings = '';
      for (let i = 0; i < parsedSettings.length; i++) {
        const interpolatedValue = fromValues[i] + deltas[i] * falloffValue;
        if (i > 0) newSettings += ', ';
        newSettings += `'${axisNames[i]}' ${interpolatedValue}`;
      }

      // Only update if changed
      const currentSettings = interpolatedSettingsRef.current[index];
      if (currentSettings !== newSettings) {
        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      }
    });
  };

  useEffect(() => {
    manager.register(instanceRef.current);
    
    // Cache positions after a short delay to ensure all letters are mounted
    const timeoutId = setTimeout(() => {
      cacheLetterPositions();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      manager.unregister(instanceRef.current);
    };
  }, []);
  
  // Re-cache positions when letters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (letterRefs.current.length > 0) {
        cacheLetterPositions();
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [label]);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
