'use client'

import { useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HeroShader = dynamic(
  () => import('./HeroShader').then((m) => ({ default: m.HeroShader })),
  { ssr: false }
)

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    st.to(text, { y: '-20%' }, 0)

    const lines = text.querySelectorAll('[data-hero-line]')
    const subtitle = text.querySelector('[data-hero-subtitle]')
    const meta = text.querySelector('[data-hero-meta]')

    gsap.fromTo(
      lines,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.3,
      }
    )
    gsap.fromTo(
      [subtitle, meta],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.7,
      }
    )

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-ink"
    >
      <Suspense fallback={<div className="absolute inset-0 bg-ink" />}>
        <HeroShader />
      </Suspense>

      <div className="absolute inset-0 bg-ink/50 z-10" />

      <div ref={textRef} className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12">
        <div data-hero-meta className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">SBC</span>
          <span className="font-mono text-[11px] text-cream-muted">|</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">OXFORD</span>
          <span className="font-mono text-[11px] text-cream-muted">|</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">2026</span>
          <span className="font-mono text-[11px] text-cream-muted">|</span>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">
            <span
              className="inline-block w-2 h-2 rounded-full bg-gold"
              style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
            />
            AVAILABLE
          </span>
        </div>

        <div className="flex flex-col">
          <h1
            data-hero-line
            className="font-display font-light text-cream leading-[0.9]"
            style={{ fontSize: '12vw' }}
          >
            SIDDHANTH
          </h1>
          <h1
            data-hero-line
            className="font-display font-light text-cream leading-[0.9] self-end"
            style={{ fontSize: '12vw', marginRight: '-2vw' }}
          >
            BANERJEE
          </h1>
        </div>

        <div className="flex items-end justify-between">
          <p
            data-hero-subtitle
            className="font-sans text-[18px] text-cream-dim max-w-md"
          >
            Brand operator at Zomato. Now building AI products at Oxford.
          </p>

          <div style={{ animation: 'bob 2s ease-in-out infinite' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-cream-dim"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
