'use client'

import { useEffect, useRef, useState } from 'react'

const URL_TEXT = 'siddhanthbanerjee.com'
const SESSION_KEY = 'siddhanth_loaded_v2'
// Shortened from 5000/3000: the loader is a flourish, not a gate. Front-load the site, not the wait.
const FULL_DURATION_MS = 1500
const REDUCED_DURATION_MS = 900
const TYPEWRITER_END_MS = 1000
const DISSOLVE_MS = 550

export function LoadingScreen() {
  // Lazy initializer: check sessionStorage synchronously on first client render.
  // Safe here because this component is always loaded with ssr: false.
  const [skipped] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return !!sessionStorage.getItem(SESSION_KEY)
  })

  const [svgSize, setSvgSize] = useState(200)
  const [percent, setPercent] = useState(0)
  const [typed, setTyped] = useState(0)
  const [dissolving, setDissolving] = useState(false)
  const [gone, setGone] = useState(false)

  const reducedMotion = useRef(false)

  useEffect(() => {
    if (skipped) return

    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setSvgSize(window.innerWidth < 640 ? 120 : 200)

    const duration = reducedMotion.current ? REDUCED_DURATION_MS : FULL_DURATION_MS
    const start = performance.now()
    let raf = 0
    let finished = false

    // Single completion path, shared by the natural timeout and the skip-on-interaction handlers.
    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      setPercent(100)
      setTyped(URL_TEXT.length)
      sessionStorage.setItem(SESSION_KEY, '1')
      setDissolving(true)
      window.setTimeout(() => setGone(true), DISSOLVE_MS)
    }

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      setPercent(Math.round(progress * 100))

      if (!reducedMotion.current) {
        const typeProgress = Math.min(elapsed / TYPEWRITER_END_MS, 1)
        setTyped(Math.round(typeProgress * URL_TEXT.length))
      }

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }

    raf = requestAnimationFrame(tick)

    // Any intent to engage (scroll, tap, key, click) dismisses the loader immediately.
    const onIntent = () => finish()
    window.addEventListener('wheel', onIntent, { passive: true })
    window.addEventListener('touchstart', onIntent, { passive: true })
    window.addEventListener('keydown', onIntent)
    window.addEventListener('pointerdown', onIntent)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onIntent)
      window.removeEventListener('touchstart', onIntent)
      window.removeEventListener('keydown', onIntent)
      window.removeEventListener('pointerdown', onIntent)
    }
  }, [skipped])

  if (skipped || gone) return null

  const r = svgSize * 0.4
  const cx = svgSize / 2
  const circumference = 2 * Math.PI * r
  const strokeOffset = circumference * (1 - percent / 100)
  const typedText = reducedMotion.current ? URL_TEXT : URL_TEXT.slice(0, typed)
  const stillTyping = !reducedMotion.current && typed < URL_TEXT.length

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading siddhanthbanerjee.com"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0E0B12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        opacity: dissolving ? 0 : 1,
        transition: dissolving ? `opacity ${DISSOLVE_MS}ms ease` : undefined,
        pointerEvents: dissolving ? 'none' : 'all',
      }}
    >
      {/* URL typewriter */}
      <p
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          color: '#F4EFE6',
          fontSize: 13,
          letterSpacing: '0.15em',
          margin: 0,
          minHeight: '1.4em',
        }}
      >
        {typedText}
        {stillTyping && (
          <span
            style={{
              opacity: 1,
              animation: 'blink 800ms step-end infinite',
            }}
          >
            |
          </span>
        )}
      </p>

      {/* Circular progress meter */}
      <svg
        width={svgSize}
        height={svgSize}
        aria-hidden="true"
        style={{ transform: 'rotate(-90deg)', overflow: 'visible', flexShrink: 0 }}
      >
        {/* Track ring */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="rgba(244,239,230,0.1)"
          strokeWidth={1}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#F4EFE6"
          strokeWidth={1.5}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 50ms linear' }}
        />
      </svg>

      {/* Percent counter below meter */}
      <p
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          color: 'rgba(244,239,230,0.4)',
          fontSize: 11,
          letterSpacing: '0.2em',
          margin: 0,
        }}
      >
        {percent}%
      </p>

      {/* Screen-reader-only completion announcement */}
      <span
        aria-live="assertive"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {percent === 100 ? 'Loading complete' : ''}
      </span>
    </div>
  )
}
