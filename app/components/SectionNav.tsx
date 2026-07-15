'use client'

import { useEffect, useRef, useState } from 'react'

// Shared wayfinding nav for the home page. Renders once, in one fixed layer, and
// morphs between two states as you scroll:
//   - "docked": horizontal, sitting where the hero's quick-nav used to be, under the name.
//   - "rail": a quiet vertical index on the left, active section lit, click to jump.
// Crossing back to the very top flies it back into the horizontal docked row (CSS
// transition on position/transform handles the "fly into formation" motion).
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

  // Determine mode + active section from scroll position. Docked while the hero
  // is still mostly in view, rail once past it, hidden once Contact is close.
  useEffect(() => {
    const heroEl = document.querySelector('main > section') as HTMLElement | null
    const contactEl = document.querySelector('#writing-section')?.nextElementSibling as HTMLElement | null
    const sectionEls = NAV.map((n) => document.getElementById(n.target)).filter(Boolean) as HTMLElement[]

    const evaluate = () => {
      const y = window.scrollY
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : window.innerHeight
      const contactTop = contactEl ? contactEl.offsetTop : Infinity

      let next: Mode = 'rail'
      if (y < heroBottom - window.innerHeight * 0.5) next = 'docked'
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
                  width: isActive ? 7 : 5,
                  height: isActive ? 7 : 5,
                  background: isActive ? 'var(--color-tangerine)' : 'rgba(244,239,230,0.35)',
                  boxShadow: isActive ? '0 0 8px var(--color-tangerine)' : 'none',
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

        /* Docked: horizontal row, positioned exactly where the old hero quick-nav sat. */
        .section-nav-docked {
          flex-direction: row;
          flex-wrap: wrap;
          top: auto;
          bottom: clamp(3.5rem, 10vw, 6rem);
          left: clamp(1.5rem, 6vw, 4rem);
          right: auto;
          gap: clamp(0.75rem, 2.5vw, 1.75rem);
          transform: none;
        }
        .section-nav-docked .section-nav-item { padding: 6px 0; gap: 0; }

        /* Rail: vertical column pinned to the left edge, clear of the hero. */
        .section-nav-rail {
          flex-direction: column;
          top: 50%;
          left: clamp(1.25rem, 3.5vw, 2.5rem);
          bottom: auto;
          right: auto;
          transform: translateY(-50%);
          gap: 0.9rem;
        }
        .section-nav-rail .section-nav-item { padding: 7px 0; gap: 0.6rem; }

        /* Mobile rail: dots only by default, label appears on tap or while active. */
        .section-nav-mobile.section-nav-rail {
          left: 0.6rem;
          gap: 0.7rem;
        }
        .section-nav-mobile.section-nav-rail .section-nav-item { min-width: 44px; }

        .section-nav-reduced { transition: none; }

        /* The rail needs the AI GTM Work / Builds section to leave it room on the left. */
        @media (min-width: 721px) {
          #ai-gtm-work, #builds { padding-left: clamp(2.5rem, 5vw, 4rem); }
        }
      `}</style>
    </nav>
  )
}
