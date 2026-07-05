'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

// Scroll-into-view reveal. Two modes: fade-and-rise (default) and 'mask' (a clip reveal
// where the content slides up from behind an overflow-hidden edge, used for big headings).
// Honors prefers-reduced-motion by showing content immediately with no transform.
export function Reveal({
  children,
  delay = 0,
  y = 26,
  mask = false,
  once = true,
  style,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  mask?: boolean
  once?: boolean
  style?: CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  if (mask) {
    return (
      <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
        <div
          style={{
            transform: shown || reduced ? 'translateY(0)' : 'translateY(115%)',
            transition: reduced ? undefined : `transform 850ms ${ease} ${delay}ms`,
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown || reduced ? 1 : 0,
        transform: shown || reduced ? 'none' : `translateY(${y}px)`,
        transition: reduced ? undefined : `opacity 760ms ${ease} ${delay}ms, transform 760ms ${ease} ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
