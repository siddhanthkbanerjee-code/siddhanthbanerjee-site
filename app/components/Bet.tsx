'use client'

import { useRef, useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BetScene = dynamic(
  () => import('./BetScene').then((m) => ({ default: m.BetScene })),
  { ssr: false }
)

gsap.registerPlugin(ScrollTrigger)

const line1 = 'AI is the biggest distribution shift in a generation.'
const line2 = "I'm betting my career on the people who get it to market."

export function Bet() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return

    const words = textRef.current.querySelectorAll('[data-word]')
    gsap.fromTo(
      words,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'top 20%',
      onUpdate: (self) => setScrollProgress(self.progress),
    })
  }, [])

  const renderWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
        <span data-word className="inline-block">{word}&nbsp;</span>
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <Suspense fallback={null}>
          <BetScene scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      <div
        ref={textRef}
        className="relative z-10 text-center max-w-[1200px] px-8 mx-auto"
        style={{ lineHeight: 1.1 }}
      >
        <p className="font-display font-light text-cream" style={{ fontSize: '6vw' }}>
          {renderWords(line1)}
        </p>
        <p className="font-display font-light text-cream mt-4" style={{ fontSize: '6vw' }}>
          {renderWords(line2)}
        </p>
      </div>
    </section>
  )
}
