'use client'

import { useState } from 'react'

// Rebuilt Sprint 10: the old version pinned for 250vh and ran a scrubbed GSAP timeline that
// travelled "who am i?" to the top and morphed it into "my path". It read as janky (the name
// snapped back mid-transition) and cost ~2.5 screens of scroll plus a 100vh dead gap before Path.
// This version is a single 100vh hero that answers "who am i?" legibly, with a plain scroll cue.
export function HeroTransitionBlock() {
  const [reduced] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const scrollToPath = () => {
    const pathEl = document.getElementById('path-section')
    if (!pathEl) return
    const lenis = (window as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(pathEl, { duration: reduced ? 0 : 1.4 })
    } else {
      pathEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <section
      className="hero-gradient"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 560,
        overflow: 'hidden',
      }}
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

      {/* top-left: poses the question this hero answers */}
      <span
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vw, 2.5rem)',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          zIndex: 2,
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-tangerine)',
        }}
      >
        who am i?
      </span>

      {/* lower-left: the name and the answer, made legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(1.5rem, 6vw, 4rem) clamp(3.5rem, 10vw, 6rem)',
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
            margin: '0 0 1.5rem',
          }}
        >
          Siddhanth
          <br />
          Banerjee
        </h1>
        {/* DRAFT COPY (from Siddhanth's brief -- edit freely): the who-am-i answer, now readable */}
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.05rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            color: 'rgba(244,239,230,0.86)',
            maxWidth: '34ch',
            margin: 0,
          }}
        >
          Oxford MBA. Five years in marketing, product and strategy. Now moving into AI go-to-market.
        </p>
      </div>

      {/* lower-right: plain scroll cue to the Path section */}
      <button
        type="button"
        onClick={scrollToPath}
        aria-label="Scroll to my path"
        className={reduced ? undefined : 'hero-float-pulse'}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          right: 'clamp(1.5rem, 6vw, 4rem)',
          zIndex: 10,
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            color: 'var(--color-cream)',
            letterSpacing: '-0.01em',
          }}
        >
          my path
        </span>
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.7rem',
            color: 'rgba(255,236,215,0.82)',
            lineHeight: 1,
          }}
        >
          &#8595;
        </span>
      </button>

      {reduced && <p className="sr-only">Scroll down for my path section</p>}
    </section>
  )
}
