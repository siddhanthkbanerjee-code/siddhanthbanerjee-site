'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pathThesis, pathStations, pathPayoff, pathPayoffLine, PathStation } from '@/lib/content/path'
import { AmbientField } from './AmbientField'

gsap.registerPlugin(ScrollTrigger)

const NUM_PANELS = 6 // thesis + 4 stations + payoff

// Vertical position of the timeline line, expressed as % of panel height
const LINE_TOP = '70%'
// Left offset where nodes sit -- matches station panel's left padding
const NODE_LEFT = 'clamp(2rem, 7vw, 8rem)'

type ContentRefSetter = (el: HTMLDivElement | null) => void

// ---- Shared line + node elements ----
function TimelineLineDesktop({ isPayoff }: { isPayoff?: boolean }) {
  return (
    <>
      {/* Horizontal rule */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: LINE_TOP,
          left: 0,
          right: 0,
          height: 1,
          background: 'rgba(255,107,53,0.28)',
          pointerEvents: 'none',
        }}
      />
      {/* Node / terminus */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: `calc(${LINE_TOP} - ${isPayoff ? '6px' : '4px'})`,
          left: NODE_LEFT,
          width: isPayoff ? 12 : 8,
          height: isPayoff ? 12 : 8,
          borderRadius: '50%',
          background: 'var(--color-tangerine)',
          opacity: isPayoff ? 1 : 0.85,
          boxShadow: isPayoff ? '0 0 10px var(--color-tangerine)' : 'none',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

// ---- Panel: Thesis ----
// Styled as setup / intro -- smaller and lighter than station panels
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
        background: 'radial-gradient(130% 120% at 12% 28%, rgba(255,107,53,0.12) 0%, rgba(122,58,180,0.12) 34%, transparent 64%)', // warm intro glow, not flat black; violet 122,58,180 from hero palette
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
            margin: '0 0 1.25rem',
          }}
        >
          thesis
        </p>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            // Deliberately smaller and lighter than station panels -- this is setup, not the main event
            fontSize: 'clamp(0.92rem, 1.25vw, 1.1rem)',
            lineHeight: 1.7,
            color: 'rgba(244,239,230,0.82)',
            maxWidth: 'min(600px, 55vw)',
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
        background: `radial-gradient(135% 115% at 10% 35%, ${station.tint}33 0%, ${station.tint}12 30%, transparent 62%)`,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* panel number */}
      <span
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 4rem)',
          left: 'clamp(2rem, 7vw, 8rem)',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.28)',
        }}
      >
        0{panelNum} / 06
      </span>

      {/* timeline line + node */}
      <TimelineLineDesktop />

      {/* left column: identity */}
      <div ref={contentRef} style={{ paddingRight: '2rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--color-cream)',
            margin: '0 0 0.6rem',
          }}
        >
          {station.company}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
            lineHeight: 1.4,
            color: 'rgba(244,239,230,0.5)',
            margin: '0 0 0.5rem',
          }}
        >
          {station.companyDescriptor}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'clamp(0.55rem, 0.8vw, 0.68rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.45)',
            margin: 0,
          }}
        >
          {station.role}
        </p>
      </div>

      {/* right column: substance. "gtm tie" label removed (read as cliche per his note);
          its content stays as a recolored closer in the station's own tint, no header. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: station.tint,
              margin: '0 0 0.5rem',
              opacity: 0.9,
            }}
          >
            what i did
          </p>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
              lineHeight: 1.45,
              color: 'var(--color-cream)',
              margin: 0,
            }}
          >
            {station.did}
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)',
              letterSpacing: '0.18em',
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
              fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
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
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
              lineHeight: 1.45,
              color: station.tint,
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



// ---- Payoff sheen: one-shot light sweep on the climax heading when it enters view ----
function usePayoffSheen() {
  const ref = useRef<HTMLHeadingElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('payoff-lit') // reduced-motion CSS renders this as static tangerine
      return
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          el.classList.add('payoff-lit')
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// ---- Payoff cue: hands the story back to the convergence proof on home, mirroring
// the hero and contact cues. This panel renders on the standalone /profile page (no
// #profile-section there), so it must navigate to the home page's convergence section
// rather than silently no-op looking for an id that only exists on /.
function PayoffCue({ variant }: { variant: 'panel' | 'stack' }) {
  const go = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = document.getElementById('profile-section')
    if (el) {
      const lenis = (window as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
      if (lenis) {
        lenis.scrollTo(el, { duration: reduced ? 0 : 1.4 })
      } else {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
      return
    }
    // Not on the home page: navigate there, targeted at the convergence section.
    window.location.href = '/#profile-section'
  }
  const pulse =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? undefined
      : 'hero-float-pulse'
  return (
    <button
      type="button"
      onClick={go}
      aria-label="Back to the convergence on the home page"
      className={pulse}
      style={{
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: variant === 'panel' ? 'center' : 'flex-start',
        gap: 8,
        padding: 8,
        ...(variant === 'panel'
          ? {
              position: 'absolute' as const,
              bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              right: 'clamp(1.5rem, 6vw, 4rem)',
              zIndex: 2,
            }
          : { margin: '2rem 0 0 -8px' }),
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
          color: 'var(--color-cream)',
          letterSpacing: '-0.01em',
          textShadow: '0 2px 16px rgba(0,0,0,0.5)',
        }}
      >
        back to the work
      </span>
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.7rem',
          color: 'rgba(255,236,215,0.9)',
          lineHeight: 1,
        }}
      >
        &#8593;
      </span>
    </button>
  )
}

// ---- Panel: Payoff ----
function PayoffPanel({ contentRef }: { contentRef: ContentRefSetter }) {
  const sheenRef = usePayoffSheen()
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 7vw, 8rem)',
        background: 'radial-gradient(120% 120% at 14% 42%, rgba(255,107,53,0.16) 0%, rgba(24,8,0,0.55) 34%, transparent 72%)',
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
          color: 'rgba(244,239,230,0.28)',
        }}
      >
        06 / 06
      </span>

      {/* timeline line extends through payoff, with glowing terminus node */}
      <TimelineLineDesktop isPayoff />

      <div ref={contentRef}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,107,53,0.6)',
            margin: '0 0 1.25rem',
          }}
        >
          now
        </p>
        <h3
          ref={sheenRef}
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 7vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--color-tangerine)',
            margin: '0 0 1.5rem',
          }}
        >
          {pathPayoff.split(' and ').map((part, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 0 ? part + ' and' : part}
            </span>
          ))}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
            lineHeight: 1.5,
            color: 'rgba(244,239,230,0.55)',
            margin: 0,
            maxWidth: 480,
          }}
        >
          {pathPayoffLine}
        </p>
      </div>

      <PayoffCue variant="panel" />
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

      contentRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 })
      })

      const tl = gsap.timeline()
      tl.to(track, { x: -(NUM_PANELS - 1) * vw, ease: 'none', duration: NUM_PANELS - 1 })

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
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const setRef = (i: number): ContentRefSetter =>
    (el: HTMLDivElement | null) => { contentRefs.current[i] = el }

  return (
    <div ref={outerRef} id="path-section" style={{ height: `${NUM_PANELS * 100}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-ink)',
        }}
      >
        {/* subtle cursor-reactive constellation carried behind the whole path scroll */}
        <AmbientField opacity={0.3} />
        {/* Persistent header -- visible for the full duration of the Path section scroll */}
        <div
          style={{
            flexShrink: 0,
            padding: '1rem clamp(2rem, 7vw, 8rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.35)',
              margin: 0,
            }}
          >
            my path
          </p>
        </div>

        {/* Horizontal track -- fills remaining height below the header */}
        <div
          ref={trackRef}
          style={{ display: 'flex', width: `${NUM_PANELS * 100}vw`, flex: 1, minHeight: 0, position: 'relative', zIndex: 1 }}
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
  const sheenRef = usePayoffSheen()
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
      { threshold: 0.12 },
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
    <section id="path-section" style={{ background: 'var(--color-ink)', position: 'relative' }}>
      <AmbientField opacity={0.28} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Section header -- static in the stacked mobile/reduced-motion version */}
      <div
        style={{
          padding: '1rem clamp(1.5rem, 5vw, 3rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.35)',
            margin: 0,
          }}
        >
          my path
        </p>
      </div>

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
            margin: '0 0 1.1rem',
          }}
        >
          thesis
        </p>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            // Lighter and smaller than stations on mobile too
            fontSize: 'clamp(0.9rem, 3.2vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'rgba(244,239,230,0.82)',
            margin: 0,
          }}
        >
          {pathThesis}
        </p>
      </div>

      {/* Stations -- vertical timeline line runs through all as a left border */}
      {pathStations.map((station, i) => (
        <div
          key={station.company}
          ref={setRef(i + 1)}
          style={{
            position: 'relative',
            padding: 'clamp(2.5rem, 7vw, 4rem) clamp(1.5rem, 5vw, 3rem) clamp(2.5rem, 7vw, 4rem) clamp(2.5rem, 6vw, 4rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: `radial-gradient(150% 120% at 0% 0%, ${station.tint}2A 0%, transparent 60%)`,
            // Left border acts as the vertical timeline line
            borderLeft: '1px solid rgba(255,107,53,0.28)',
            marginLeft: 'clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          {/* Node on the vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 'clamp(2.5rem, 7vw, 4rem)',
              left: -5,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-tangerine)',
              opacity: 0.85,
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.25)',
              margin: '0 0 0.65rem',
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
              margin: '0 0 0.35rem',
            }}
          >
            {station.company}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(0.72rem, 2.5vw, 0.85rem)',
              color: 'rgba(244,239,230,0.45)',
              margin: '0 0 0.3rem',
              lineHeight: 1.4,
            }}
          >
            {station.companyDescriptor}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.4)',
              margin: '0 0 1.5rem',
            }}
          >
            {station.role}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 'clamp(0.68rem, 2.4vw, 0.78rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: station.tint, margin: '0 0 0.4rem' }}>
                what i did
              </p>
              <p style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 300, fontSize: 'clamp(0.88rem, 3vw, 1rem)', lineHeight: 1.45, color: 'var(--color-cream)', margin: 0 }}>
                {station.did}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 'clamp(0.68rem, 2.4vw, 0.78rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: station.tint, margin: '0 0 0.4rem' }}>
                learnt
              </p>
              <p style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 300, fontSize: 'clamp(0.88rem, 3vw, 1rem)', lineHeight: 1.45, color: 'var(--color-cream)', margin: 0 }}>
                {station.learnt}
              </p>
            </div>
            <div>
              {/* gtm tie: label removed per his note (cliche), content kept as a recolored closer */}
              <p style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(0.88rem, 3vw, 1rem)', lineHeight: 1.45, color: station.tint, margin: 0 }}>
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
          position: 'relative',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 8vw, 5rem) clamp(2.5rem, 6vw, 4rem)',
          background: 'radial-gradient(130% 120% at 6% 8%, rgba(255,107,53,0.16) 0%, rgba(24,8,0,0.55) 38%, transparent 74%)',
          // Terminus node: continues the border but ends here
          borderLeft: '1px solid rgba(255,107,53,0.28)',
          marginLeft: 'clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Terminus node -- larger and glowing */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(3rem, 8vw, 5rem)',
            left: -7,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'var(--color-tangerine)',
            boxShadow: '0 0 10px var(--color-tangerine)',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,107,53,0.6)',
            margin: '0 0 0.9rem',
          }}
        >
          now
        </p>
        <h3
          ref={sheenRef}
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--color-tangerine)',
            margin: '0 0 1rem',
          }}
        >
          {pathPayoff}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 3vw, 1rem)',
            lineHeight: 1.5,
            color: 'rgba(244,239,230,0.5)',
            margin: 0,
          }}
        >
          {pathPayoffLine}
        </p>

        <PayoffCue variant="stack" />
      </div>
      </div>
    </section>
  )
}

// ---- Root export ----
export function PathTimeline() {
  // Tracked in state and re-evaluated on resize/orientation change, not just at mount:
  // a phone rotated to landscape, a foldable unfolded, or a resized split-screen window
  // should reclassify rather than get stuck in whichever mode it started in.
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768)
  const [reduced] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  if (isMobile || reduced) {
    return <PathTimelineStacked reduced={reduced} />
  }
  return <PathTimelineDesktop />
}
