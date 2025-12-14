'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Snowflake {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  drift: number
}

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    // Only generate snowflakes on client side to avoid hydration mismatch
    setIsMounted(true)
    
    const flakes: Snowflake[] = []
    const flakeCount = 50 // Number of snowflakes

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position (0-100%)
        delay: Math.random() * 10, // Random delay (0-10s)
        duration: 10 + Math.random() * 20, // Random fall duration (10-30s)
        size: 6 + Math.random() * 4, // Random size (6-10px)
        drift: (Math.random() - 0.5) * 80, // Random horizontal drift (-40 to 40px)
      })
    }

    setSnowflakes(flakes)

    // Create dynamic keyframes for each snowflake with drift
    if (typeof document !== 'undefined' && !styleRef.current) {
      const style = document.createElement('style')
      style.id = 'snow-effect-styles'
      flakes.forEach((flake) => {
        style.textContent += `
          @keyframes snowfall-${flake.id} {
            0% {
              transform: translateY(-100vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: translateY(50vh) translateX(${flake.drift}px);
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(${flake.drift}px);
              opacity: 0;
            }
          }
        `
      })
      document.head.appendChild(style)
      styleRef.current = style
    }

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current)
      }
    }
  }, [])

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snowfall-${flake.id} ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default SnowEffect

