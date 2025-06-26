'use client'

import React from 'react'
import { PiStarFourFill } from 'react-icons/pi'

const YubileumRibbon = () => {
  // Generate random rotations and positions for dynamic layout
  const lightRibbonRotation = 0.3 * 10 - 5 // -5 to 5 degrees
  const darkRibbonRotation = 0.5 * 10 - 5 // -5 to 5 degrees
  const darkRibbonOffset = 1 * 15 + 30 // 30-45px from top (dark ribbon first)
  const lightRibbonOffset = 1.2 * 15 + 70 // 50-65px from top (light ribbon second)

  return (
    <div className="relative w-full h-64 md:h-48 overflow-hidden z-10">
      {/* Light Blue Ribbon */}
      <div
        className="absolute w-[calc(100%+200px)] h-20 bg-sky-200 overflow-hidden -left-24"
        style={{
          transform: `rotate(${lightRibbonRotation}deg)`,
          top: `${lightRibbonOffset}px`,
          zIndex: 1,
        }}
      >
        <div className="flex items-center justify-center w-full h-full gap-12 whitespace-nowrap translate-x-16">
          <span
            className="text-slate-700 font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-slate-700 font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-slate-700 font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-slate-700 font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
        </div>
      </div>

      {/* Dark Blue Ribbon */}
      <div
        className="absolute w-[calc(100%+200px)] h-20 bg-slate-700 overflow-hidden -left-24"
        style={{
          transform: `rotate(${darkRibbonRotation}deg)`,
          top: `${darkRibbonOffset}px`,
          zIndex: 10,
        }}
      >
        <div className="flex items-center justify-center w-full h-full gap-12 whitespace-nowrap -translate-x-12">
          <span
            className="text-white font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-white font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-white font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
          <span
            className="text-white font-light text-7xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Tahun Yubileum
          </span>
          <span>
            <PiStarFourFill size={30} color="white" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default YubileumRibbon
