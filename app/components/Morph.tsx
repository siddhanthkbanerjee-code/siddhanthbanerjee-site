'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { morphWords } from '@/lib/content/morphWords'

gsap.registerPlugin(ScrollTrigger)

// Deep violet -- v2 brief "deep violet color wash for the morph section"
// #5B21B6 / #7C3AED: violet family, distinct from tangerine and gold,
// legible as soft glow on the near-black section background
const VIOLET_CORE = '#5B21B6'
const VIOLET_GLOW = '#7C3AED'

// Section background: near-black with a violet undertone
// One step warmer than ink (#0E0B12) to signal a new zone
const SECTION_BG = '#120A20'

// Orbital positions relative to the sticky container center (px)
// Tuned for 1440x900; words spread to fill the viewport without clipping
const ORBITAL: { x: number; y: number }[] = [
  { x: -310, y: -125 }, // OXFORD
  { x:  -85, y: -220 }, // MBA
  { x:  140, y: -185 }, // ZOMATO
  { x:  305, y:  -40 }, // AI
  { x:  210, y:  180 }, // BUILDER
  { x:  -48, y:  250 }, // STRATEGIST
  { x: -278, y:  130 }, // MARKETER
]

// Per-word font size and rotation for the crystallized grid
// Varying sizes create visual interest; rotations break the grid rigidity
const WORD_STYLE: { size: number; rotate: number }[] = [
  { size: 52, rotate: -2 }, // OXFORD
  { size: 84, rotate:  3 }, // MBA
  { size: 44, rotate: -1 }, // ZOMATO
  { size: 96, rotate:  4 }, // AI
  { size: 42, rotate: -3 }, // BUILDER
  { size: 36, rotate:  1 }, // STRATEGIST
  { size: 44, rotate:  2 }, // MARKETER
]

// Mobile / reduced-motion fallback: orb + staggered word list, no scroll sequence
function MorphSimple() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const items = itemRefs.current.filter((el): el is HTMLSpanElement => el !== null)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        items.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '0.55'
            el.style.transform = 'translateY(0)'
          }, i * 110)
        })
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: SECTION_BG,
        padding: '80px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 35%, ${VIOLET_GLOW}, ${VIOLET_CORE})`,
          boxShadow: `0 0 28px 8px ${VIOLET_CORE}88`,
          flexShrink: 0,
        }}
      />
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}
      >
        {morphWords.map((word, i) => (
          <span
            key={word}
            ref={(el) => { itemRefs.current[i] = el }}
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 12,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#F4EFE6',
              opacity: 0,
              transform: 'translateY(10px)',
              transition: 'opacity 500ms ease, transform 500ms ease',
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <p className="sr-only">{morphWords.join(', ')}</p>
    </section>
  )
}

export function Morph() {
  // Detect mobile / reduced-motion before first render (safe: always ssr: false)
  const [isSimple] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return (
      window.innerWidth < 768 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  const outerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLParagraphElement>(null)
  const blobContainerRef = useRef<HTMLDivElement>(null)
  const wordContainerRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (isSimple) return

    const outer = outerRef.current
    const question = questionRef.current
    const blobContainer = blobContainerRef.current
    const wordContainer = wordContainerRef.current
    if (!outer || !question || !blobContainer || !wordContainer) return

    const blobs = blobRefs.current.filter((b): b is HTMLDivElement => b !== null)
    const words = wordRefs.current.filter((w): w is HTMLSpanElement => w !== null)

    // Establish starting states for all animated elements
    gsap.set(question, { opacity: 1, y: 0 })
    gsap.set(blobs, { x: 0, y: 0 })
    gsap.set(blobContainer, { opacity: 1 })
    gsap.set(wordContainer, { opacity: 0 })
    gsap.set(words, { opacity: 0, y: 8, filter: 'blur(5px)' })

    const tl = gsap.timeline({ paused: true })

    // Phase 1 (0 - 0.30): "who am I?" fades out while blobs hold at center
    tl.to(question, { opacity: 0, y: -14, duration: 0.3, ease: 'power2.in' }, 0)

    // Phase 2 (0.30 - 0.65): blobs drift outward to orbital positions
    blobs.forEach((blob, i) => {
      tl.to(
        blob,
        { x: ORBITAL[i].x, y: ORBITAL[i].y, duration: 0.35, ease: 'power3.out' },
        0.3,
      )
    })

    // Phase 3 (0.65 - 1.0): blob field dissolves, words crystallize in
    tl.to(blobContainer, { opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.65)
    tl.to(wordContainer, { opacity: 1, duration: 0.08 }, 0.65)
    words.forEach((word, i) => {
      tl.to(
        word,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.28, ease: 'power2.out' },
        0.72 + i * 0.022,
      )
    })

    // CSS sticky handles the pin; ScrollTrigger just drives the timeline.
    // outer div is 400vh; sticky duration = 300vh (400 - 100 viewport).
    // start/end map that 300vh of scroll to 0-100% animation progress.
    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: '+=300%',
      scrub: 1.2,
      animation: tl,
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [isSimple])

  if (isSimple) return <MorphSimple />

  return (
    // Outer: establishes scroll height (400vh) so sticky has room to travel
    <div ref={outerRef} style={{ height: '400vh' }}>
      {/* Inner: sticky visual container, stays at top while outer scrolls */}
      <div
        ref={sectionRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          background: SECTION_BG,
          overflow: 'hidden',
        }}
      >
        {/* SVG gooey filter -- zero-size, placed before blobs in DOM */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
          <defs>
            <filter id="morph-goo" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
              {/* alpha channel: multiply by 22, subtract 9 -- creates sharp metaball boundary */}
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 22 -9"
              />
            </filter>
          </defs>
        </svg>

        {/* "who am I?" prompt */}
        <p
          ref={questionRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '14%',
            left: 0,
            right: 0,
            margin: 0,
            textAlign: 'center',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 12,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.45)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          who am I?
        </p>

        {/* Blob field -- gooey filter applied to this container */}
        <div
          ref={blobContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'url(#morph-goo)',
            pointerEvents: 'none',
          }}
        >
          {morphWords.map((word, i) => (
            <div
              key={word}
              ref={(el) => { blobRefs.current[i] = el }}
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 72,
                height: 72,
                marginLeft: -36,
                marginTop: -36,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, ${VIOLET_GLOW}, ${VIOLET_CORE})`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>

        {/* Crystallized word layer -- words match blob orbital positions */}
        <div
          ref={wordContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {morphWords.map((word, i) => (
            // Outer div: positions the word at its orbital coordinate
            <div
              key={word}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${ORBITAL[i].x}px), calc(-50% + ${ORBITAL[i].y}px)) rotate(${WORD_STYLE[i].rotate}deg)`,
              }}
            >
              {/* Inner span: GSAP animates opacity, blur, y-settle */}
              <span
                ref={(el) => { wordRefs.current[i] = el }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#F4EFE6',
                  fontSize: WORD_STYLE[i].size,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  filter: 'blur(5px)',
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Screen-reader text */}
        <p className="sr-only">{morphWords.join(', ')}</p>
      </div>
    </div>
  )
}
