'use client'

import { useState } from 'react'
import { HeroFluidCanvas } from './HeroFluidCanvas'
import { Reveal } from './Reveal'

// Copy applied 2026-07-09 (recruiter-POV pass in his paper register). His to veto.
const CONTACT_COPY =
  'If you are hiring for AI go-to-market, building something that needs customers, or want to compare notes, I would like to talk. Email reaches me fastest.'

// The closing section mirrors the opening: the same real-time aurora + constellation fluid
// field and legibility scrim, full height, with the content anchored lower-left the way the
// hero name is. The opening asks "who am i?" and points down to the path; the close answers
// "what next?" and points back to the top.
export function Contact() {
  const [reduced] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const scrollToTop = () => {
    const lenis = (window as { __lenis?: { scrollTo: (t: number | Element, o?: object) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: reduced ? 0 : 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--color-ink)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* same real-time fluid-light background as the hero */}
      <HeroFluidCanvas variant="aurora-constellation" />

      {/* legibility scrim, matched to the hero */}
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

      {/* top-left: mirrors the hero's "who am i?" */}
      <span
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
        what next?
      </span>

      {/* lower-left: the answer, anchored like the hero name */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(5rem, 13vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(4rem, 9vw, 6rem)',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <Reveal mask>
            <h2
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 300,
                color: 'var(--color-cream)',
                fontSize: 'clamp(2.5rem, 7.5vw, 6.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                margin: '0 0 clamp(1.5rem, 3vw, 2.5rem)',
                textShadow: '0 2px 40px rgba(0,0,0,0.4)',
              }}
            >
              LET&apos;S TALK.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 300,
                color: 'rgba(244,239,230,0.82)',
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: 1.65,
                margin: '0 0 clamp(1.75rem, 3vw, 2.5rem)',
                maxWidth: 480,
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
              }}
            >
              {CONTACT_COPY}
            </p>
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.5rem, 1.5vw, 0.85rem)',
              pointerEvents: 'auto',
            }}
          >
            <a
              href="mailto:siddhanth.kbanerjee@gmail.com"
              className="contact-link"
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                color: 'var(--color-cream)',
                textDecoration: 'none',
                display: 'inline-block',
                minHeight: 44,
                lineHeight: '44px',
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
              }}
            >
              siddhanth.kbanerjee@gmail.com
            </a>

            <a
              href="https://linkedin.com/in/siddhanthbanerjee"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-secondary"
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,230,0.5)',
                textDecoration: 'none',
                display: 'inline-block',
                minHeight: 44,
                lineHeight: '44px',
                transition: 'color 200ms ease',
              }}
            >
              linkedin.com/in/siddhanthbanerjee
            </a>
          </div>
        </div>
      </div>

      {/* lower-right: mirrors the hero's "my path" cue, pointing back to the top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
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
          minHeight: 44,
          minWidth: 44,
        }}
      >
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
          back to top
        </span>
      </button>

      {/* copyright pinned at the very bottom-left, under the content padding */}
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          bottom: '1.75rem',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.28)',
            margin: 0,
          }}
        >
          &copy; Siddhanth Banerjee / 2026 / Oxford
        </p>
      </div>

      <style>{`
        .contact-link:hover { color: var(--color-tangerine) !important; }
        .contact-link-secondary:hover { color: rgba(244,239,230,0.8) !important; }
      `}</style>
    </section>
  )
}
