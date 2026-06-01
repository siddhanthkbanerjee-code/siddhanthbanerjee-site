'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const targetPos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const onMouseMove = (e: MouseEvent) => {
      // Reveal on first mouse move -- keeps the dot off-screen until the user has a cursor
      if (dot.style.visibility !== 'visible') {
        dot.style.visibility = 'visible'
      }
      let tx = e.clientX
      let ty = e.clientY

      const interactives = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor-hover]'
      )
      let minDist = Infinity

      interactives.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        if (dist < 60 && dist < minDist) {
          minDist = dist
          const pull = 0.3
          tx = e.clientX + (cx - e.clientX) * pull
          ty = e.clientY + (cy - e.clientY) * pull
        }
      })

      hovering.current = minDist < 60
      targetPos.current = { x: tx, y: ty }
    }

    window.addEventListener('mousemove', onMouseMove)

    const ticker = () => {
      const lerp = 0.15
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
