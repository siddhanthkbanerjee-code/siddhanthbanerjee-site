'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pathThesis, pathStations, pathPayoff, PathStation } from '@/lib/content/path'

gsap.registerPlugin(ScrollTrigger)

const NUM_PANELS = 6 // thesis + 4 stations + payoff

type ContentRefSetter = (el: HTMLDivElement | null) => void

// ---- Panel: Thesis ----
function ThesisPanel({ contentRef }: { contentRef: ContentRefSetter }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 8vw, 9rem)',
        background: 'var(--color-ink)',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 4rem)',
          left: 'clamp(2rem, 8vw, 9rem)',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.35)',
        }}
      >
        01 / 06
      </span>

      <div ref={contentRef}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-tangerine)',
            margin: '0 0 1.5rem',
          }}
        >
          thesis
        </p>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.05rem, 1.6vw, 1.45rem)',
            lineHeight: 1.65,
            color: 'var(--color-cream)',
            maxWidth: 'min(720px, 60vw)',
            margin: 0,
          }}
        >
          {pathThesis}
        </p>
      </div>
    </div>
  )
}

// ---- Panel: Station ----
function StationPanel({
  station,
  panelNum,
  contentRef,
}: {
  station: PathStation
  panelNum: number
  contentRef: ContentRefSetter
}) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        alignItems: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 7vw, 8rem)',
        background: `linear-gradient(150deg, var(--color-ink) 55%, ${station.tint}14)`,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 4rem)',
          left: 'clamp(2rem, 7vw, 8rem)',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.3)',
        }}
      >
        0{panelNum} / 06
      </span>

      <div ref={contentRef} style={{ paddingRight: '2rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--color-cream)',
            margin: '0 0 1rem',
          }}
        >
          {station.company}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.5)',
            margin: 0,
          }}
        >
          {station.role}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: station.tint,
              margin: '0 0 0.5rem',
              opacity: 0.9,
            }}
          >
            learnt
          </p>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
              lineHeight: 1.4,
              color: 'var(--color-cream)',
              margin: 0,
            }}
          >
            {station.learnt}
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: station.tint,
              margin: '0 0 0.5rem',
              opacity: 0.9,
            }}
          >
            gtm tie
          </p>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
              lineHeight: 1.4,
              color: 'rgba(244,239,230,0.8)',
              margin: 0,
            }}
          >
            {station.gtmTie}
          </p>
        </div>
      </div>
    </div>
  )
}

// ---- Panel: Payoff ----
function PayoffPanel({ contentRef }: { contentRef: ContentRefSetter }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 8vw, 9rem)',
        background: 'linear-gradient(150deg, #180800 0%, #0E0B12 60%)', // deep tangerine-dark base
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 4rem)',
          left: 'clamp(2rem, 8vw, 9rem)',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.3)',
        }}
      >
        06 / 06
      </span>

      <div ref={contentRef}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,107,53,0.6)',
            margin: '0 0 1.5rem',
          }}
        >
          now
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 7vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--color-tangerine)',
            margin: 0,
          }}
        >
          {pathPayoff.split(' and ').map((part, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 0 ? part + ' and' : part}
            </span>
          ))}
        </h3>
      </div>
    </div>
  )
}

// ---- Desktop horizontal scroll ----
function PathTimelineDesktop() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>(Array.from({ length: NUM_PANELS }, () => null))

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const init = () => {
      const vw = window.innerWidth

      // Panel 0 always visible; panels 1-5 start hidden
      contentRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 })
      })

      const tl = gsap.timeline()

      // Horizontal track translation: 0 to -(NUM_PANELS-1)*vw
      tl.to(track, { x: -(NUM_PANELS - 1) * vw, ease: 'none', duration: NUM_PANELS - 1 })

      // Per-panel content reveals: panel i shows when tl time reaches i - 0.3
      contentRefs.current.forEach((el, i) => {
        if (!el || i === 0) return
        tl.fromTo(
          el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
          i - 0.3,
        )
      })

      const st = ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: () => `+=${(NUM_PANELS - 1) * window.innerHeight}`,
        scrub: 1.5,
        animation: tl,
        invalidateOnRefresh: true,
      })

      return st
    }

    let st: ScrollTrigger | undefined
    const raf = requestAnimationFrame(() => { st = init() })

    return () => {
      cancelAnimationFrame(raf)
      if (st) st.kill()
      // Also kill the timeline so GSAP doesn't hold stale refs
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const setRef = (i: number): ContentRefSetter =>
    (el: HTMLDivElement | null) => { contentRefs.current[i] = el }

  return (
    <div
      ref={outerRef}
      id="path-section"
      style={{ height: `${NUM_PANELS * 100}vh` }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', width: `${NUM_PANELS * 100}vw`, height: '100%' }}
        >
          <ThesisPanel contentRef={setRef(0)} />
          {pathStations.map((station, i) => (
            <StationPanel
              key={station.company}
              station={station}
              panelNum={i + 2}
              contentRef={setRef(i + 1)}
            />
          ))}
          <PayoffPanel contentRef={setRef(NUM_PANELS - 1)} />
        </div>
      </div>
    </div>
  )
}

// ---- Mobile / reduced-motion vertical stack ----
function PathTimelineStacked({ reduced }: { reduced: boolean }) {
  const panelRefs = useRef<(HTMLDivElement | null)[]>(Array.from({ length: NUM_PANELS }, () => null))

  useEffect(() => {
    if (reduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    panelRefs.current.forEach((el) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [reduced])

  const setRef = (i: number) => (el: HTMLDivElement | null) => { panelRefs.current[i] = el }

  return (
    <section id="path-section" style={{ background: 'var(--color-ink)' }}>
      {/* Thesis */}
      <div
        ref={setRef(0)}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-tangerine)',
            margin: '0 0 1.25rem',
          }}
        >
          thesis
        </p>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
            lineHeight: 1.65,
            color: 'var(--color-cream)',
            margin: 0,
          }}
        >
          {pathThesis}
        </p>
      </div>

      {/* Stations */}
      {pathStations.map((station, i) => (
        <div
          key={station.company}
          ref={setRef(i + 1)}
          style={{
            padding: 'clamp(2.5rem, 7vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: `linear-gradient(170deg, var(--color-ink) 70%, ${station.tint}12)`,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.28)',
              margin: '0 0 0.75rem',
            }}
          >
            0{i + 2} / 06
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-cream)',
              margin: '0 0 0.5rem',
            }}
          >
            {station.company}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.45)',
              margin: '0 0 1.5rem',
            }}
          >
            {station.role}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: station.tint,
                  margin: '0 0 0.35rem',
                }}
              >
                learnt
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  lineHeight: 1.45,
                  color: 'var(--color-cream)',
                  margin: 0,
                }}
              >
                {station.learnt}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: station.tint,
                  margin: '0 0 0.35rem',
                }}
              >
                gtm tie
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  lineHeight: 1.45,
                  color: 'rgba(244,239,230,0.75)',
                  margin: 0,
                }}
              >
                {station.gtmTie}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Payoff */}
      <div
        ref={setRef(NUM_PANELS - 1)}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
          background: 'linear-gradient(170deg, #180800 0%, #0E0B12 55%)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,107,53,0.6)',
            margin: '0 0 1rem',
          }}
        >
          now
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--color-tangerine)',
            margin: 0,
          }}
        >
          {pathPayoff}
        </h3>
      </div>
    </section>
  )
}

// ---- Root export ----
export function PathTimeline() {
  const [isMobile] = useState<boolean>(() => window.innerWidth < 768)
  const [reduced] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  if (isMobile || reduced) {
    return <PathTimelineStacked reduced={reduced} />
  }
  return <PathTimelineDesktop />
}
