'use client'

import React, { useEffect, useRef, useState } from 'react'

type Variant = 'up' | 'left' | 'right' | 'scale'

/**
 * Reveals its children the first time they scroll into view, with a gentle,
 * tasteful motion. Uses IntersectionObserver so it is cheap and dependency-free.
 *
 * - `variant` picks the entrance direction (fade + rise / slide / soft zoom).
 * - `delay` (ms) staggers neighbouring items.
 */
export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
