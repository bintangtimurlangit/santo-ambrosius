'use client'

import React, { useEffect, useState } from 'react'
import { Fraunces } from 'next/font/google'

// Same display serif used by the hero title, re-declared here so the letter
// preview reads with the same elegant voice.
const display = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

type Phase = 'sealed' | 'opening' | 'done'

/**
 * Full-screen "open the invitation" intro.
 *
 * A sealed sky/white envelope greets the visitor on every load. Tapping it
 * lifts the flap, the letter rises out, and the whole overlay fades to reveal
 * the /undangan page underneath. The tap also counts as the first user gesture,
 * so the background music (UndanganAudio) starts at the same moment.
 */
export default function EnvelopeIntro() {
  const [phase, setPhase] = useState<Phase>('sealed')
  const [mounted, setMounted] = useState(true)

  // Lock page scroll while the intro is covering the page.
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  const open = () => {
    if (phase !== 'sealed') return
    setPhase('opening')
    // Fade the overlay out after the flap + letter have animated...
    window.setTimeout(() => setPhase('done'), 1700)
    // ...then unlock scroll and remove the overlay from the DOM.
    window.setTimeout(() => {
      document.body.style.overflow = ''
      setMounted(false)
    }, 2500)
  }

  if (!mounted) return null

  return (
    <div className={`env-overlay ${phase === 'done' ? 'is-done' : ''}`} aria-hidden={phase === 'done'}>
      <button
        type="button"
        onClick={open}
        className={`env-scene ${phase !== 'sealed' ? 'is-opening' : ''}`}
        aria-label="Buka undangan"
      >
        <div className="envelope">
          {/* Back wall of the envelope */}
          <div className="env-back" />

          {/* The letter that rises out */}
          <div className="env-letter">
            <div className={`${display.className} env-letter-inner`}>
              <span className="env-kicker">Undangan</span>
              <h2 className="env-title">
                Peringatan
                <br />
                40 · 30 · 25
                <br />
                Tahun Imamat
              </h2>
              <span className="env-rule" />
              <p className="env-sub">Misa Syukur — Gereja Santo Ambrosius</p>
              <p className="env-date">Minggu, 16 Agustus 2026</p>
            </div>
          </div>

          {/* Front pocket covering the lower half */}
          <div className="env-front" />

          {/* Top flap that opens */}
          <div className="env-flap" />
        </div>

        <p className="env-hint">Ketuk untuk membuka undangan</p>
      </button>
    </div>
  )
}
