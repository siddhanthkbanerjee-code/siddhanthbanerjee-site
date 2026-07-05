'use client'

import { useState } from 'react'
import { HeroFluidCanvas } from '../components/HeroFluidCanvas'
import type { HeroVariant } from '../components/HeroFluidCanvas'

const VARIANTS: { id: HeroVariant; label: string }[] = [
  { id: 'aurora-constellation', label: '00 constellation + flow' },
  { id: 'constellation', label: '01 constellation only' },
  { id: 'aurora', label: '02 aurora (full)' },
  { id: 'molten', label: '03 molten' },
  { id: 'nebula', label: '04 nebula' },
]

export default function Lab() {
  const [variant, setVariant] = useState<HeroVariant>('aurora-constellation')

  return (
    <main
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 560,
        overflow: 'hidden',
        background: '#0E0B12',
      }}
    >
      <HeroFluidCanvas variant={variant} />

      {/* content overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(1.5rem,6vw,4rem) clamp(3.5rem,10vw,6rem)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 'clamp(1.5rem,4vw,2.5rem)',
            left: 'clamp(1.5rem,6vw,4rem)',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-tangerine)',
          }}
        >
          who am i?
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: 'var(--color-cream)',
            lineHeight: 0.92,
            fontSize: 'clamp(3rem,11vw,10rem)',
            letterSpacing: '-0.02em',
            margin: '0 0 1.5rem',
            textShadow: '0 2px 40px rgba(0,0,0,0.35)',
          }}
        >
          Siddhanth
          <br />
          Banerjee
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.05rem,2.2vw,1.6rem)',
            lineHeight: 1.5,
            color: 'rgba(244,239,230,0.9)',
            maxWidth: '34ch',
            margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.5)',
          }}
        >
          Oxford MBA. Five years in marketing, product and strategy. Now moving into AI go-to-market.
        </p>
      </div>

      {/* variant switcher */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem,4vw,2.5rem)',
          right: 'clamp(1.5rem,6vw,4rem)',
          zIndex: 5,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          maxWidth: '62vw',
        }}
      >
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVariant(v.id)}
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid ' + (variant === v.id ? '#FF6B35' : 'rgba(244,239,230,0.22)'),
              background: variant === v.id ? '#FF6B35' : 'rgba(255,255,255,0.05)',
              color: variant === v.id ? '#160B06' : '#F4EFE6',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem,4vw,2.5rem)',
          right: 'clamp(1.5rem,6vw,4rem)',
          zIndex: 2,
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 300, fontSize: 'clamp(1rem,1.6vw,1.3rem)', color: 'var(--color-cream)' }}>my path</div>
        <div aria-hidden="true" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.7rem', color: 'rgba(255,236,215,0.82)' }}>&#8595;</div>
      </div>
    </main>
  )
}
