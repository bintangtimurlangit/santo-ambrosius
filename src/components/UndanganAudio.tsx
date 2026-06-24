'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaMusic, FaPause } from 'react-icons/fa'

/**
 * Floating background-music player for the digital invitation.
 *
 * Browsers block autoplay with sound until the user interacts with the page,
 * so we attempt to play immediately and, if that's rejected, start playback on
 * the first user gesture (pointer/keydown/scroll). A toggle button lets the
 * visitor pause/resume at any time.
 */
export default function UndanganAudio({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.25

    const startPlayback = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    // Try immediately (works if the browser allows it)...
    startPlayback()

    // ...otherwise begin on the first user interaction.
    const onFirstInteraction = () => {
      if (audio.paused) startPlayback()
      removeListeners()
    }
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    const removeListeners = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction))
    }
    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { once: false, passive: true }),
    )

    return removeListeners
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:scale-105"
      >
        {isPlaying ? (
          <FaPause size={16} />
        ) : (
          <FaMusic size={16} className="animate-pulse" />
        )}
      </button>
    </>
  )
}
