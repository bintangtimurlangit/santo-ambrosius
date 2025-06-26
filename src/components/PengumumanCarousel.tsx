'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PengumumanCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2) // Start with middle image active
  const [isClient, setIsClient] = useState(false) // Track if we're on client side
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const totalImages = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  const handleUserInteraction = (action: () => void) => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Execute the action
    action()

    // Restart the auto-advance timer
    startAutoAdvance()
  }

  const startAutoAdvance = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      nextSlide()
      startAutoAdvance() // Restart timer for next advance
    }, 8000) // 8 seconds
  }, [])

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
    startAutoAdvance()

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [startAutoAdvance])

  // Restart timer when currentIndex changes (including auto-advance)
  useEffect(() => {
    if (isClient) {
      startAutoAdvance()
    }
  }, [currentIndex, isClient, startAutoAdvance])

  const getCardStyle = (index: number) => {
    let diff = index - currentIndex

    // Handle wrapping for circular effect
    if (diff > 2) {
      diff = diff - totalImages
    } else if (diff < -2) {
      diff = diff + totalImages
    }

    // Check screen size - only on client side to prevent hydration mismatch
    const isMobile = isClient && window.innerWidth <= 640 // sm breakpoint
    const isTablet = isClient && window.innerWidth <= 768 && window.innerWidth > 640 // md breakpoint

    // Adjust spacing and visibility based on screen size
    let baseSpacing = 160 // default for lg+
    let maxVisibleCards = 2 // show center + 2 on each side for lg+

    if (isMobile) {
      baseSpacing = 70 // even tighter spacing for mobile to prevent overflow
      maxVisibleCards = 1 // only show center + 1 on each side for mobile
    } else if (isTablet) {
      baseSpacing = 120 // medium spacing for tablet
      maxVisibleCards = 1 // show center + 1 on each side for tablet
    }

    // Calculate position and scale based on distance from center
    let translateX = 0
    let scale = 1
    let zIndex = 1
    let opacity = 0

    if (diff === 0) {
      // Center card
      translateX = 0
      scale = isMobile ? 1 : 1.1
      zIndex = 5
      opacity = 1
    } else if (Math.abs(diff) === 1 && Math.abs(diff) <= maxVisibleCards) {
      // Adjacent cards - close to center
      translateX = diff * baseSpacing
      scale = isMobile ? 0.85 : 0.95
      zIndex = 4
      opacity = 1
    } else if (Math.abs(diff) === 2 && Math.abs(diff) <= maxVisibleCards) {
      // Outer cards - only show on larger screens
      translateX = diff * baseSpacing * 1
      scale = 0.88
      zIndex = 3
      opacity = 1
    } else {
      // Hidden cards - completely hide on mobile/tablet, keep far on desktop
      if (isMobile || isTablet) {
        opacity = 0
        translateX = diff * baseSpacing * 2
        scale = 0.7
        zIndex = 1
      } else {
        translateX = diff * baseSpacing * 1.4
        scale = 0.8
        zIndex = 2
        opacity = 0.8
      }
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.5s ease',
    }
  }

  // Render a loading state on server side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex justify-center items-center relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px] mt-8 overflow-hidden">
        <div className="w-[250px] h-[353px] sm:w-[280px] sm:h-[396px] md:w-[300px] md:h-[424px] lg:w-[400px] lg:h-[565px] bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <span className="text-gray-400 text-sm sm:text-base font-medium">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px] mt-8 overflow-hidden">
      {Array.from({ length: totalImages }, (_, index) => (
        <div
          key={index}
          className="absolute w-[250px] h-[353px] sm:w-[280px] sm:h-[396px] md:w-[300px] md:h-[424px] lg:w-[400px] lg:h-[565px] transition-all duration-500 ease-in-out cursor-pointer hover:z-10"
          style={getCardStyle(index)}
          onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
        >
          <div className="w-full h-full bg-white border border-gray-300 rounded-lg flex items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-400 hover:shadow-[0_0_30px_rgba(50,70,90,0.6),0_4px_20px_rgba(0,0,0,0.15)] hover:border-slate-700/30">
            <span className="text-gray-400 text-sm sm:text-base font-medium">
              A4 Document {index + 1}
            </span>
          </div>
        </div>
      ))}

      {/* Left Navigation */}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 lg:left-4 xl:left-6 bg-white/95 text-slate-700 border-2 border-slate-700/30 rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center cursor-pointer text-sm sm:text-base lg:text-base transition-all duration-300 z-40 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-slate-700 hover:text-white hover:border-slate-700 hover:scale-110 hover:shadow-[0_8px_25px_rgba(50,70,90,0.3)]"
        onClick={() => handleUserInteraction(prevSlide)}
      >
        <FaChevronLeft />
      </button>

      {/* Right Navigation */}
      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-6 lg:right-4 xl:right-6 bg-white/95 text-slate-700 border-2 border-slate-700/30 rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center cursor-pointer text-sm sm:text-base lg:text-base transition-all duration-300 z-40 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-slate-700 hover:text-white hover:border-slate-700 hover:scale-110 hover:shadow-[0_8px_25px_rgba(50,70,90,0.3)]"
        onClick={() => handleUserInteraction(nextSlide)}
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default PengumumanCarousel
