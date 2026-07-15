'use client'

import { useEffect, useRef, useState } from 'react'

// Shared wayfinding nav for the home page. Renders once, in one fixed layer, and
// morphs between two states as you scroll:
//   - "docked": horizontal, tucked top-left above the hero name, small and quiet.
//   - "rail": a tight vertical index on the left, active section lit, click to jump.
// Flips to rail the instant section 2 begins (not partway through it), and flies
// back to docked the moment you're back at the very top of the hero.
// The rail hides entirely once Contact is reached, "back to top" is enough there.
// Mobile collapses the rail to unlabeled dots that show their label briefly on tap
// or while active.
const NAV: { label: string; target: string }[] = [
  { label: 'profile', target: 'profile-section' },
  { label: 'ai gtm work', target: 'ai-gtm-work' },
  { label: 'builds', target: 'builds' },
  { label: 'writing', target: 'writing-section' },
]

type Mode = 'docked' | 'rail' | 'hidden'

export function SectionNav() {
  const [mode, setMode] = useState<Mode>('docked')
  const [active, setActive] = useState(0)
  const [tapped, setTapped] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reduced, setReduced] = useState(false)
  const modeRef = useRef<Mode>('docked')

  useEffect(() => {
    setIsMobile(window.innerWidth < 720)
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const onResize = () => setIsMobile(window.innerWidth < 720)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  // Determine mode + active section from scroll position. Docked only while section 1
  // (the hero) is on screen, flips to rail the moment section 2 starts entering the
  // viewport, hidden once Contact is close.
  useEffect(() => {
    const heroEl = document.querySelector('main > section') as HTMLElement | null
    const contactEl = document.querySelector('#writing-section')?.nextElementSibling as HTMLElement | null
    const sectionEls = NAV.map((n) => document.getElementById(n.target)).filter(Boolean) as HTMLElement[]

    const evaluate = () => {
      const y = window.scrollY
      // Flip to rail as soon as the hero's own bottom edge reaches the top of the
      // viewport, i.e. the instant section 2 starts, not halfway through it.
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : window.innerHeight
      const contactTop = contactEl ? contactEl.offsetTop : Infinity

      let next: Mode = 'rail'
      if (y < heroBottom - 1) next = 'docked'
      else if (y > contactTop - window.innerHeight * 0.6) next = 'hidden'

      if (next !== modeRef.current) setMode(next)

      // Active section: the last one whose top has scrolled past the viewport's upper third.
      let activeIdx = 0
      const probe = y + window.innerHeight * 0.35
      sectionEls.forEach((el, i) => {
        if (el.offsetTop <= probe) activeIdx = i
      })
      setActive(activeIdx)
    }

    evaluate()
    window.addEventListener('scroll', evaluate, { passive: true })
    window.addEventListener('resize', evaluate)
    return () => {
      window.removeEventListener('scroll', evaluate)
      window.removeEventListener('resize', evaluate)
    }
  }, [])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(el, { duration: reduced ? 0 : 1.4 })
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  if (mode === 'hidden') return null

  const docked = mode === 'docked'

  return (
    <nav
      aria-label="Jump to a section"
      className={`section-nav ${docked ? 'section-nav-docked' : 'section-nav-rail'} ${isMobile ? 'section-nav-mobile' : ''} ${reduced ? 'section-nav-reduced' : ''}`}
    >
      {NAV.map((item, i) => {
        const isActive = !docked && active === i
        const showLabel = docked || !isMobile || tapped === i || isActive
        return (
          <button
            key={item.target}
            type="button"
            onClick={() => {
              scrollToId(item.target)
              if (isMobile) {
                setTapped(i)
                window.setTimeout(() => setTapped((v) => (v === i ? null : v)), 1600)
              }
            }}
            className="section-nav-item"
            aria-current={isActive ? 'true' : undefined}
            style={{
              color: isActive ? 'var(--color-tangerine)' : 'var(--color-cream-muted)',
            }}
          >
            {!docked && (
              <span
                aria-hidden="true"
                className="section-nav-dot"
                style={{
                  width: isActive ? 5 : 4,
                  height: isActive ? 5 : 4,
                  background: isActive ? 'var(--color-tangerine)' : 'rgba(244,239,230,0.32)',
                  boxShadow: isActive ? '0 0 6px var(--color-tangerine)' : 'none',
                }}
              />
            )}
            {showLabel && <span>{item.label}</span>}
          </button>
        )
      })}

      <style>{`
        .section-nav {
          position: fixed;
          z-index: 30;
          display: flex;
          transition: top 650ms cubic-bezier(0.22, 1, 0.36, 1), left 650ms cubic-bezier(0.22, 1, 0.36, 1),
            right 650ms cubic-bezier(0.22, 1, 0.36, 1), bottom 650ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1), flex-direction 0ms 325ms;
        }
        .section-nav-item {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          min-height: 44px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: color 200ms ease;
        }
        .section-nav-item:hover, .section-nav-item:focus-visible { color: var(--color-tangerine) !important; }
        .section-nav-dot { border-radius: 50%; flex-shrink: 0; transition: all 200ms ease; }

        /* Docked: horizontal row, tucked into the top-left corner above the name, clear
           of the hero paragraph's own bottom padding so the two never collide. Small
           and quiet, not a second headline competing with the hero. */
        .section-nav-docked {
          flex-direction: row;
          flex-wrap: wrap;
          top: clamp(1.5rem, 4vw, 2.5rem);
          bottom: auto;
          left: clamp(1.5rem, 6vw, 4rem);
          right: auto;
          gap: clamp(0.6rem, 1.2vw, 1rem);
          transform: none;
        }
        .section-nav-docked .section-nav-item {
          padding: 4px 6px;
          margin: 0 -6px;
          gap: 0;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          min-height: 32px;
          opacity: 0.55;
        }
        .section-nav-docked .section-nav-item:hover,
        .section-nav-docked .section-nav-item:focus-visible { opacity: 1; }

        /* Rail: small, tight, quiet vertical index pinned to the left edge. */
        .section-nav-rail {
          flex-direction: column;
          top: 50%;
          left: clamp(1.1rem, 2.5vw, 1.75rem);
          bottom: auto;
          right: auto;
          transform: translateY(-50%);
          gap: 0.45rem;
        }
        .section-nav-rail .section-nav-item {
          padding: 3px 0;
          gap: 0.45rem;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          min-height: 28px;
        }

        /* Mobile rail: dots only by default, label appears on tap or while active. */
        .section-nav-mobile.section-nav-rail {
          left: 0.5rem;
          gap: 0.5rem;
        }
        .section-nav-mobile.section-nav-rail .section-nav-item { min-width: 32px; min-height: 32px; }

        .section-nav-reduced { transition: none; }

        /* The rail needs the AI GTM Work / Builds section to leave it a little room on
           the left. Now that the rail itself is much narrower, a small clearance suffices. */
        #ai-gtm-work, #builds { padding-left: clamp(1.75rem, 6vw, 2.25rem); }
        @media (min-width: 721px) {
          #ai-gtm-work, #builds { padding-left: clamp(1.5rem, 3vw, 2.25rem); }
        }
      `}</style>
    </nav>
  )
}
