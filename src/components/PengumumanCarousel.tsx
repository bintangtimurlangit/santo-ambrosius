'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import { getMediaURL } from '@/lib/getHomepageData'
import type { Media } from '@/payload-types'

interface CarouselImage {
  title: string
  image: string | Media
  alt?: string | null | undefined
  link?: string | null | undefined
  id?: string | null | undefined
}

interface PengumumanCarouselProps {
  images?: CarouselImage[] | null | undefined
}

const PengumumanCarousel = ({ images }: PengumumanCarouselProps) => {
  const carouselImages = images || []
  const totalImages = carouselImages.length
  const [currentIndex, setCurrentIndex] = useState(Math.floor(totalImages / 2)) // Start with middle image active
  const [isClient, setIsClient] = useState(false) // Track if we're on client side
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }, [totalImages])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }, [totalImages])

  const startAutoAdvance = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      nextSlide()
      startAutoAdvance() // Restart timer for next advance
    }, 8000) // 8 seconds
  }, [nextSlide])

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
    // Check screen size - only on client side to prevent hydration mismatch
    const isMobile = isClient && window.innerWidth <= 640 // sm breakpoint
    const isTablet = isClient && window.innerWidth <= 768 && window.innerWidth > 640 // md breakpoint

    // Adjust spacing based on screen size
    let baseSpacing = 180 // default spacing for lg+

    if (isMobile) {
      baseSpacing = 100 // tighter spacing for mobile
    } else if (isTablet) {
      baseSpacing = 140 // medium spacing for tablet
    }

    // For different numbers of images, adjust spacing
    if (totalImages === 1) {
      baseSpacing = 0
    } else if (totalImages === 2) {
      baseSpacing = isMobile ? 120 : isTablet ? 160 : 200
    } else if (totalImages === 3) {
      baseSpacing = isMobile ? 100 : isTablet ? 140 : 180
    }

    // Calculate the rotated position based on currentIndex
    // This creates the rotating effect: 1-2-3 → 3-1-2 → 2-3-1
    const rotatedIndex = (index - currentIndex + totalImages) % totalImages

    // Calculate position relative to center
    const centerPosition = Math.floor(totalImages / 2)
    const diff = rotatedIndex - centerPosition

    const translateX = diff * baseSpacing
    let scale = 1
    let zIndex = 5
    const opacity = 1

    // Center image (middle position after rotation) gets special styling
    if (rotatedIndex === centerPosition) {
      scale = isMobile ? 1 : 1.1
      zIndex = 10
    } else {
      scale = isMobile ? 0.9 : 0.95
      zIndex = 5 - Math.abs(diff)
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
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

  // Don't render carousel if no images
  if (totalImages === 0) {
    return (
      <div className="flex justify-center items-center relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px] mt-8">
        <div className="text-gray-400 text-lg">No announcements available</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px] mt-8 overflow-hidden">
      {Array.from({ length: totalImages }, (_, index) => {
        const imageData = carouselImages[index]
        const imageUrl = imageData ? getMediaURL(imageData.image) : ''

        return (
          <div
            key={index}
            className="absolute w-[250px] h-[353px] sm:w-[280px] sm:h-[396px] md:w-[300px] md:h-[424px] lg:w-[400px] lg:h-[565px] transition-all duration-500 ease-in-out cursor-pointer hover:z-10"
            style={getCardStyle(index)}
            onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
          >
            <div className="w-full h-full bg-white border border-gray-300 rounded-lg overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-400 hover:shadow-[0_0_30px_rgba(50,70,90,0.6),0_4px_20px_rgba(0,0,0,0.15)] hover:border-slate-700/30">
              {imageData && imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageData.alt || imageData.title || `Pengumuman ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 280px, (max-width: 1024px) 300px, 400px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm sm:text-base font-medium">
                    A4 Document {index + 1}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Navigation buttons - only show if more than 1 image */}
      {totalImages > 1 && (
        <>
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
        </>
      )}
    </div>
  )
}

export default PengumumanCarousel
