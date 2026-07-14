'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const raw = useRef({ x: -100, y: -100, movedAt: 0 })
  const targetPos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    // Touch-primary devices have no cursor to replace.
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Perf: the old handler ran querySelectorAll plus a full getBoundingClientRect
    // sweep on EVERY mousemove event (which can outpace the frame rate). Now the
    // mousemove handler only records coordinates; all DOM reads happen once per
    // frame in the ticker, and the candidate list refreshes at most every 400ms.
    let interactives: HTMLElement[] = []
    let lastQuery = 0

    const onMouseMove = (e: MouseEvent) => {
      // Reveal on first mouse move -- keeps the dot off-screen until the user has a cursor
      if (dot.style.visibility !== 'visible') {
        dot.style.visibility = 'visible'
      }
      raw.current.x = e.clientX
      raw.current.y = e.clientY
      raw.current.movedAt = performance.now()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const ticker = () => {
      const now = performance.now()

      // Magnetic pull: measure only while the pointer is actually moving.
      if (now - raw.current.movedAt < 120) {
        if (now - lastQuery > 400) {
          interactives = Array.from(
            document.querySelectorAll<HTMLElement>('a, button, [data-cursor-hover]'),
          )
          lastQuery = now
        }

        let tx = raw.current.x
        let ty = raw.current.y
        let minDist = Infinity

        for (const el of interactives) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dist = Math.hypot(raw.current.x - cx, raw.current.y - cy)
          if (dist < 60 && dist < minDist) {
            minDist = dist
            const pull = 0.3
            tx = raw.current.x + (cx - raw.current.x) * pull
            ty = raw.current.y + (cy - raw.current.y) * pull
          }
        }

        hovering.current = minDist < 60
        targetPos.current = { x: tx, y: ty }
      }

      const lerp = 0.35
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp

      const size = hovering.current ? 32 : 8
      gsap.set(dot, {
        x: currentPos.current.x - size / 2,
        y: currentPos.current.y - size / 2,
        width: size,
        height: size,
      })
    }

    gsap.ticker.add(ticker)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 rounded-full bg-cream pointer-events-none z-[9999] mix-blend-difference"
      style={{ width: 8, height: 8, visibility: 'hidden' }}
    />
  )
}
