'use client'

import { useEffect, useRef } from 'react'

// Upward velocity threshold in px/ms. 0.8 catches deliberate fast swipes toward
// the browser chrome (address bar, back button) without false-firing on slow drifts.
const VELOCITY_THRESHOLD = 0.8
const COOLDOWN_MS = 4000
const LABEL_VISIBLE_MS = 800
const RING_SIZE = 8 // ~133ms of history at 60fps

type Sample = { x: number; y: number; t: number }

export function ComeBackCursor() {
  const labelRef = useRef<HTMLDivElement>(null)
  const ring = useRef<Sample[]>([])
  const lastTrigger = useRef(0)
  const rafPending = useRef(false)
  const latestPos = useRef<{ x: number; y: number } | null>(null)
  const labelVisible = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // No-op on touch-primary devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onPointerMove = (e: PointerEvent) => {
      latestPos.current = { x: e.clientX, y: e.clientY }
      if (!rafPending.current) {
        rafPending.current = true
        requestAnimationFrame(processFrame)
      }
    }

    const processFrame = () => {
      rafPending.current = false
      const pos = latestPos.current
      if (!pos) return

      const now = performance.now()

      // Update label position while it is visible
      const label = labelRef.current
      if (labelVisible.current && label) {
        label.style.left = `${pos.x + 18}px`
        label.style.top = `${pos.y - 12}px`
      }

      // Maintain ring buffer
      ring.current.push({ x: pos.x, y: pos.y, t: now })
      if (ring.current.length > RING_SIZE) ring.current.shift()

      // Gate: cursor must be above y=80 to potentially trigger
      if (pos.y >= 80) return

      // Gate: cooldown
      if (now - lastTrigger.current < COOLDOWN_MS) return

      // Need at least 2 samples to compute velocity
      if (ring.current.length < 2) return

      // Velocity = upward displacement / time across the ring window
      const oldest = ring.current[0]
      const newest = ring.current[ring.current.length - 1]
      const dt = newest.t - oldest.t
      if (dt <= 0) return

      // Positive dy_up means the cursor moved upward (y decreased)
      const dyUp = oldest.y - newest.y
      const velocity = dyUp / dt

      if (velocity < VELOCITY_THRESHOLD) return

      // Fire
      lastTrigger.current = now
      triggerLabel(pos.x, pos.y, label)
    }

    const triggerLabel = (
      x: number,
      y: number,
      label: HTMLDivElement | null,
    ) => {
      if (!label) return

      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
        hideTimer.current = null
      }

      label.style.left = `${x + 18}px`
      label.style.top = `${y - 12}px`
      label.style.opacity = '1'
      label.style.transform = 'translateY(0)'
      label.style.transition = 'opacity 200ms ease, transform 200ms ease'
      labelVisible.current = true

      hideTimer.current = setTimeout(() => {
        if (labelRef.current) {
          labelRef.current.style.transition =
            'opacity 350ms ease, transform 350ms ease'
          labelRef.current.style.opacity = '0'
          labelRef.current.style.transform = 'translateY(-6px)'
        }
        labelVisible.current = false
        hideTimer.current = null
      }, LABEL_VISIBLE_MS)
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <div
      ref={labelRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10000,
        opacity: 0,
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 11,
        letterSpacing: '0.08em',
        color: '#FF6B35',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      come back ✨
    </div>
  )
}
