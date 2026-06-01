'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroTransitionBlock() {
  const [reduced] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const outerRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const textWhoRef = useRef<HTMLSpanElement>(null)
  const textPathRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const scrollToPath = () => {
    const lenis = (window as any).__lenis
    if (reduced) {
      const pathEl = document.getElementById('path-section')
      if (!pathEl) return
      if (lenis) {
        lenis.scrollTo(pathEl)
      } else {
        pathEl.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    const outer = outerRef.current
    if (!outer) return
    // Scroll to pin-end so the full animation plays via the shared ScrollTrigger
    const targetY = outer.offsetTop + outer.offsetHeight - window.innerHeight
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 2.5 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (reduced) return

    const outer = outerRef.current
    const heroContent = heroContentRef.current
    const floatEl = floatRef.current
    const textWho = textWhoRef.current
    const textPath = textPathRef.current
    const arrow = arrowRef.current
    if (!outer || !heroContent || !floatEl || !textWho || !textPath || !arrow) return

    const init = () => {
      // Measure current screen position of float element and compute travel delta
      const floatRect = floatEl.getBoundingClientRect()
      const endLeft = (window.innerWidth - floatEl.offsetWidth) / 2
      const endTop = 56
      const dx = endLeft - floatRect.left
      const dy = endTop - floatRect.top

      gsap.set(floatEl, { x: 0, y: 0 })
      gsap.set(textPath, { opacity: 0 })

      const tl = gsap.timeline()

      // 40-65%: hero name and subtitle fade out
      tl.to(heroContent, { opacity: 0, y: -24, ease: 'power2.in', duration: 0.25 }, 0.4)

      // 55-90%: float element travels from bottom-right to center-top
      tl.to(floatEl, { x: dx, y: dy, ease: 'power2.inOut', duration: 0.35 }, 0.55)

      // 63-75%: text crossfade -- "who am i?" out, "my path" in
      tl.to(textWho, { opacity: 0, duration: 0.12 }, 0.63)
      tl.to(arrow, { opacity: 0, duration: 0.12 }, 0.63)
      tl.to(textPath, { opacity: 1, duration: 0.14 }, 0.70)

      // Single ScrollTrigger -- click handler drives the same trigger via lenis.scrollTo
      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: '+=300%',
        scrub: 1.5,
        animation: tl,
      })
    }

    const raf = requestAnimationFrame(init)
    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [reduced])

  return (
    // 400vh outer gives the pin zone 300vh of scroll travel; collapses to 100vh for reduced-motion
    <div ref={outerRef} style={{ height: reduced ? '100vh' : '400vh' }}>
      <div
        className="hero-gradient"
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* subtle grain overlay */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <defs>
            <filter id="hero-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        {/* hero content: fades out during the transition */}
        <div
          ref={heroContentRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 2rem 5rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: 'var(--color-cream)',
              lineHeight: 0.92,
              fontSize: 'clamp(3rem, 11vw, 10rem)',
              letterSpacing: '-0.02em',
              margin: '0 0 1.25rem',
            }}
          >
            Siddhanth
            <br />
            Banerjee
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 'clamp(0.6rem, 1.05vw, 0.75rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.5)',
              margin: 0,
            }}
          >
            Oxford MBA, AI Builder and GTM Strategist
          </p>
        </div>

        {/* floating element: pulsing "who am i?" that travels to become "my path" heading */}
        <div
          ref={floatRef}
          role="button"
          aria-label="Scroll to my path"
          tabIndex={0}
          onClick={scrollToPath}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') scrollToPath()
          }}
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            zIndex: 10,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            userSelect: 'none',
          }}
        >
          {/* inner pulse wrapper -- CSS animation here; outer div is GSAP x/y only */}
          <div className={reduced ? undefined : 'hero-float-pulse'}>
            <div style={{ position: 'relative' }}>
              <span
                ref={textWhoRef}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,236,215,0.96)',
                  whiteSpace: 'nowrap',
                }}
              >
                who am i?
              </span>
              {/* "my path" fades in over "who am i?" during the scroll crossfade */}
              <span
                ref={textPathRef}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-cream)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                my path
              </span>
            </div>
          </div>
          <span
            ref={arrowRef}
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.6rem',
              color: 'rgba(255,236,215,0.82)',
              lineHeight: 1,
            }}
          >
            &#8595;
          </span>
        </div>

        {/* reduced-motion: static "my path" accessible label */}
        {reduced && <p className="sr-only">Scroll down for my path section</p>}
      </div>
    </div>
  )
}
