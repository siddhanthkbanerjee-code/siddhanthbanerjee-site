'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const entries = [
  { year: '2018', company: 'Schbang Delhi', role: 'Senior Account Executive', summary: 'Joined at the Delhi launch.', side: 'left' as const },
  { year: '2020', company: 'Schbang', role: 'Account Manager', summary: 'Built and led brand campaigns.', side: 'right' as const },
  { year: '2022', company: 'Zomato', role: 'Brand Manager', summary: 'Ran AI-generated content campaigns at scale.', side: 'left' as const },
  { year: '2025', company: 'Oxford MBA', role: 'Said Business School', summary: 'Pivoting to AI.', side: 'right' as const },
  { year: '2026', company: 'Building', role: 'Kairos, Prizerv, more', summary: 'Shipping AI products in public.', side: 'left' as const },
]

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const length = line.getTotalLength()
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    }).to(line, { strokeDashoffset: 0, ease: 'none' })

    nodeRefs.current.forEach((node, i) => {
      const entry = entryRefs.current[i]
      const progress = (i + 1) / entries.length
      gsap.fromTo(
        [node, entry],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: section,
            start: `top+=${progress * 40}% center`,
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-ink py-32 px-8 relative overflow-hidden">
      <h2 className="font-display font-light text-cream text-center mb-24" style={{ fontSize: 64 }}>
        The Path
      </h2>
      <div className="relative max-w-4xl mx-auto">
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          <line
            ref={lineRef}
            x1="0" y1="0" x2="0" y2="100%"
            stroke="rgba(244, 239, 230, 0.2)"
            strokeWidth="1"
          />
        </svg>
        <div className="flex flex-col gap-24">
          {entries.map((entry, i) => (
            <div key={entry.year} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8">
              {entry.side === 'left' ? (
                <div ref={(el) => { entryRefs.current[i] = el }} className="text-right">
                  <p className="font-display font-light text-cream" style={{ fontSize: 32 }}>{entry.company}</p>
                  <p className="font-sans text-cream-dim text-base">{entry.role}</p>
                  <p className="font-sans text-cream-muted text-sm mt-1">{entry.summary}</p>
                </div>
              ) : <div />}
              <div ref={(el) => { nodeRefs.current[i] = el }} className="relative flex flex-col items-center gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-cream" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-cream-muted">{entry.year}</span>
              </div>
              {entry.side === 'right' ? (
                <div ref={(el) => { entryRefs.current[i] = el }}>
                  <p className="font-display font-light text-cream" style={{ fontSize: 32 }}>{entry.company}</p>
                  <p className="font-sans text-cream-dim text-base">{entry.role}</p>
                  <p className="font-sans text-cream-muted text-sm mt-1">{entry.summary}</p>
                </div>
              ) : <div />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
