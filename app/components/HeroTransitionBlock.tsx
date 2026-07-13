'use client'

import { useState } from 'react'
import { HeroFluidCanvas } from './HeroFluidCanvas'

// Sprint 10 hero: a single 100vh opener over the real-time aurora + constellation field
// (HeroFluidCanvas). A quiet quick-nav lets a time-poor visitor jump straight to the section
// they care about; a plain scroll cue hands off to the first section below. Labels only, no claims.
const NAV: { label: string; target: string }[] = [
  { label: 'profile', target: 'profile-section' },
  { label: 'ai gtm work', target: 'ai-gtm-work' },
  { label: 'builds', target: 'work-section' },
  { label: 'writing', target: 'writing-section' },
]

export function HeroTransitionBlock() {
  const [reduced] = useState<boolean>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(el, { duration: reduced ? 0 : 1.4 })
    } else {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 560,
        overflow: 'hidden',
        background: 'var(--color-ink)',
      }}
    >
      {/* real-time fluid-light background */}
      <HeroFluidCanvas variant="aurora-constellation" />

      {/* legibility scrim: keeps the name and line readable over the moving field */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(14,11,18,0.62) 0%, rgba(14,11,18,0.15) 38%, rgba(14,11,18,0) 62%)',
        }}
      />

      {/* top-left: poses the question this hero answers */}
      <span
        className="hero-rise"
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vw, 2.5rem)',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          zIndex: 2,
          pointerEvents: 'none',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-tangerine)',
        }}
      >
        who am i?
      </span>

      {/* lower-left: the name, the answer, and quick-nav */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(1.5rem, 6vw, 4rem) clamp(3.5rem, 10vw, 6rem)',
        }}
      >
        <h1
          className="hero-rise"
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: 'var(--color-cream)',
            lineHeight: 0.92,
            fontSize: 'clamp(3rem, 11vw, 10rem)',
            letterSpacing: '-0.02em',
            margin: '0 0 1.5rem',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            animationDelay: '140ms',
          }}
        >
          Siddhanth
          <br />
          Banerjee
        </h1>
        {/* Copy applied 2026-07-09 (recruiter-POV pass in his paper register). His to veto. */}
        <p
          className="hero-rise"
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.05rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            color: 'rgba(244,239,230,0.92)',
            maxWidth: '34ch',
            margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            animationDelay: '280ms',
          }}
        >
          I build AI products and put them in front of real people. Oxford MBA, five years across marketing, product and strategy before that.
        </p>

        {/* quick-nav: quiet wayfinding for a time-poor visitor */}
        <nav
          aria-label="Jump to a section"
          className="hero-rise hero-quicknav"
          style={{
            marginTop: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2.5vw, 1.75rem)',
            pointerEvents: 'auto',
            animationDelay: '420ms',
          }}
        >
          {NAV.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => scrollToId(item.target)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 0',
                minHeight: 44,
                cursor: 'pointer',
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-cream-muted)',
                transition: 'color 200ms ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* lower-right: quiet scroll cue to the first section below */}
      <button
        type="button"
        onClick={() => scrollToId('profile-section')}
        aria-label="Scroll down"
        className={reduced ? undefined : 'hero-float-pulse'}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          right: 'clamp(1.5rem, 6vw, 4rem)',
          zIndex: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-cream-muted)',
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
          }}
        >
          scroll
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
          &#8595;
        </span>
      </button>

      {reduced && <p className="sr-only">Scroll down to the rest of the page</p>}

      <style>{`
        .hero-quicknav button:hover,
        .hero-quicknav button:focus-visible {
          color: var(--color-tangerine);
        }
      `}</style>
    </section>
  )
}
