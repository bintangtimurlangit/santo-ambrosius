'use client'

import React from 'react'
import { PiStarFourFill } from 'react-icons/pi'

const DEFAULT_TEXT = 'Kita Berempati, Kita Peduli, Lestari Bumi Ini'

interface RibbonProps {
  /** Text repeated across the light (top) ribbon */
  lightText?: string
  /** Text repeated across the dark (bottom) ribbon */
  darkText?: string
}

const REPEAT = 4

const Ribbon = ({ lightText = DEFAULT_TEXT, darkText = DEFAULT_TEXT }: RibbonProps) => {
  const lightRibbonRotation = 0.3 * 10 - 5
  const darkRibbonRotation = 0.5 * 10 - 5
  const darkRibbonOffset = 1 * 15 + 30
  const lightRibbonOffset = 1.2 * 15 + 70

  return (
    <div className="relative w-full h-44 sm:h-56 md:h-48 overflow-hidden z-10">
      {/* Light Blue Ribbon */}
      <div
        className="absolute w-[calc(100%+200px)] h-14 sm:h-20 bg-sky-200 overflow-hidden -left-24"
        style={{
          transform: `rotate(${lightRibbonRotation}deg)`,
          top: `${lightRibbonOffset}px`,
          zIndex: 1,
        }}
      >
        <div className="flex items-center justify-center w-full h-full gap-12 whitespace-nowrap translate-x-16">
          {Array.from({ length: REPEAT }).map((_, i) => (
            <React.Fragment key={i}>
              <span
                className="text-slate-700 font-light text-2xl sm:text-4xl md:text-5xl"
                style={{ letterSpacing: '-0.04em' }}
              >
                {lightText}
              </span>
              <span>
                <PiStarFourFill size={30} color="#334155" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dark Blue Ribbon */}
      <div
        className="absolute w-[calc(100%+200px)] h-14 sm:h-20 bg-slate-700 overflow-hidden -left-24"
        style={{
          transform: `rotate(${darkRibbonRotation}deg)`,
          top: `${darkRibbonOffset}px`,
          zIndex: 10,
        }}
      >
        <div className="flex items-center justify-center w-full h-full gap-12 whitespace-nowrap -translate-x-12">
          {Array.from({ length: REPEAT }).map((_, i) => (
            <React.Fragment key={i}>
              <span
                className="text-white font-light text-2xl sm:text-4xl md:text-5xl"
                style={{ letterSpacing: '-0.04em' }}
              >
                {darkText}
              </span>
              <span>
                <PiStarFourFill size={30} color="white" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ribbon
