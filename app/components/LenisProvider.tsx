'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Disable native browser scroll restoration so it does not fight Lenis on
    // back/forward navigation. Every route lands at the top; see pathname effect below.
    history.scrollRestoration = 'manual'

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis
    // Exposed so click handlers in child components can call lenis.scrollTo
    ;(window as any).__lenis = lenis

    lenis.on('scroll', () => ScrollTrigger.update())

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  // Reset scroll to top on every route change so incoming page ScrollTriggers
  // always initialise from a clean zero position. immediate: true means no
  // animation — the reset is instant and does not itself trigger GSAP scrubs.
  // prefers-reduced-motion is satisfied because immediate bypasses Lenis easing.
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    lenis.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
