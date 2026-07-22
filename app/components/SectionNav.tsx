'use client'

import { useEffect, useRef, useState } from 'react'

// Wayfinding nav for the home page, in two states:
//   - "docked": a horizontal row sitting in the lower part of the hero (section 1).
//     It is ABSOLUTELY positioned near the hero's bottom, so it scrolls away WITH the
//     hero as you move down the page. Because it is not fixed, it can never sit on top
//     of section 2 as that section rises into view.
//   - "rail": a fixed vertical index on the left, active section lit, click to jump.
//
// The switch is dead simple and matches how it reads: stay horizontal until section 2
// (the "profile / AI GTM wasn't a pivot" block) reaches the top of the viewport, then
// show the vertical rail. The horizontal row has scrolled off the top by then, so there
// is never a moment where both are visible or either overlaps live text.
// Hidden once Contact is close. Mobile collapses the rail to unlabeled dots.
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

  // Mode + active section from scroll position. Horizontal while section 2 has not yet
  // reached the top of the viewport; vertical rail once it has; hidden near Contact.
  //
  // Important: the hero is loaded via dynamic(..., { ssr: false }), so on first paint it
  // is NOT in the DOM and #profile-section sits at the very top of the document. A
  // one-shot measurement on mount therefore reads "section 2 is at the top" and latches
  // the rail on, and because no scroll or resize fires when the hero finally mounts and
  // pushes the page down by 100vh, it would stay stuck there. So elements are looked up
  // per evaluation (never cached across a layout change) and we re-evaluate on document
  // resize and window load, not just on scroll.
  useEffect(() => {
    const evaluate = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const section2 = document.getElementById('profile-section')
      const contactEl = document.querySelector('#writing-section')?.nextElementSibling as HTMLElement | null

      // Section 2's top edge relative to the viewport top. Positive = still below the
      // top (we are in the hero), <= 0 = it has reached or passed the top.
      const s2top = section2 ? section2.getBoundingClientRect().top : Infinity
      const contactTop = contactEl ? contactEl.getBoundingClientRect().top + y : Infinity

      let next: Mode = 'docked'
      // At the very top the hero fills the viewport, so it is always the horizontal row.
      // The y > 0 guard also covers first paint, when the not-yet-mounted hero would
      // otherwise make section 2 measure as already being at the top.
      if (y > 0 && s2top <= 4) {
        next = y > contactTop - vh * 0.6 ? 'hidden' : 'rail'
      }
      if (next !== modeRef.current) setMode(next)

      // Active section: the last one whose top has scrolled past the viewport's upper third.
      let activeIdx = 0
      const probe = y + vh * 0.35
      NAV.forEach((n, i) => {
        const el = document.getElementById(n.target)
        if (el && el.getBoundingClientRect().top + y <= probe) activeIdx = i
      })
      setActive(activeIdx)
    }

    evaluate()
    window.addEventListener('scroll', evaluate, { passive: true })
    window.addEventListener('resize', evaluate)
    window.addEventListener('load', evaluate)
    // Catches the hero mounting late (and any other layout shift that changes page height).
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(evaluate) : null
    ro?.observe(document.body)

    return () => {
      window.removeEventListener('scroll', evaluate)
      window.removeEventListener('resize', evaluate)
      window.removeEventListener('load', evaluate)
      ro?.disconnect()
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
              // Softened from the full-saturation accent: a muted tangerine reads as "you
              // are here" without competing with the page for attention.
              color: isActive ? 'rgba(255,107,53,0.75)' : 'var(--color-cream-muted)',
            }}
          >
            {!docked && (
              <span
                aria-hidden="true"
                className="section-nav-dot"
                style={{
                  width: isActive ? 5 : 4,
                  height: isActive ? 5 : 4,
                  background: isActive ? 'rgba(255,107,53,0.75)' : 'rgba(244,239,230,0.32)',
                  boxShadow: 'none',
                }}
              />
            )}
            {showLabel && <span>{item.label}</span>}
          </button>
        )
      })}

      <style>{`
        .section-nav {
          z-index: 30;
          display: flex;
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
        .section-nav-item:hover, .section-nav-item:focus-visible { color: rgba(255,107,53,0.85) !important; }
        .section-nav-dot { border-radius: 50%; flex-shrink: 0; transition: all 200ms ease; }

        /* Docked: horizontal row, ABSOLUTELY positioned near the hero's bottom so it
           scrolls away with the hero. top is measured from the document origin, which
           for the first viewport equals the hero (100vh tall). Sits just below the hero
           paragraph, matching where it read well before. */
        .section-nav-docked {
          position: absolute;
          flex-direction: row;
          flex-wrap: wrap;
          top: calc(100vh - 5.25rem);
          left: clamp(1.5rem, 6vw, 4rem);
          gap: clamp(0.6rem, 1.2vw, 1rem);
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

        /* Rail: fixed, small, tight, quiet vertical index pinned to the left edge. Fades
           in when it takes over from the horizontal row. */
        .section-nav-rail {
          position: fixed;
          flex-direction: column;
          top: 50%;
          left: clamp(0.6rem, 1.5vw, 1.1rem);
          transform: translateY(-50%);
          gap: 0.45rem;
          animation: sectionNavRailIn 300ms ease both;
        }
        @keyframes sectionNavRailIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
          left: 0.4rem;
          gap: 0.5rem;
        }
        .section-nav-mobile.section-nav-rail .section-nav-item { min-width: 32px; min-height: 32px; }

        .section-nav-reduced.section-nav-rail { animation: none; }

        /* Profile, AI GTM Work, and Builds all leave the rail room on the left. Shifts
           the section content right rather than shrinking the rail. */
        #profile-section, #ai-gtm-work, #builds { padding-left: clamp(2.5rem, 7vw, 3.5rem); }
        @media (min-width: 721px) {
          #profile-section, #ai-gtm-work, #builds { padding-left: clamp(2.75rem, 5vw, 3.75rem); }
        }
      `}</style>
    </nav>
  )
}
