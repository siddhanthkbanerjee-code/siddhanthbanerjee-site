'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/content/projects'

// Shared heading base, applied inside each per-project name renderer
const nameBase: React.CSSProperties = {
  fontFamily: 'var(--font-fraunces), serif',
  fontWeight: 300,
  fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)',
  lineHeight: 0.95,
  letterSpacing: '-0.02em',
  margin: '0 0 0.65rem',
}

function CardName({ project }: { project: Project }) {
  switch (project.slug) {
    case 'kairos':
      // Pink-to-violet gradient text matching Kairos landing page type treatment
      return (
        <h3
          style={{
            ...nameBase,
            backgroundImage: 'linear-gradient(90deg, #f472b6 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {project.name}
        </h3>
      )

    case 'prizerv':
      // Soft pink italic accent label above near-black name, matching Prizerv warm/introspective register
      return (
        <div>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              color: '#e879f9',
              margin: '0 0 0.4rem',
              opacity: 0.85,
            }}
          >
            a structured mirror
          </p>
          <h3 style={{ ...nameBase, color: project.theme.text }}>
            {project.name}
          </h3>
        </div>
      )

    case 'lever':
      // Full name in deep navy per brief ("deep navy accent on one word": Lever is one word)
      return (
        <h3 style={{ ...nameBase, color: project.theme.accent }}>
          {project.name}
        </h3>
      )

    case 'slurrp-farm':
      // Name in near-black; the earthy multi-color rule above the card carries the brand color
      return (
        <h3 style={{ ...nameBase, color: project.theme.text }}>
          {project.name}
        </h3>
      )

    case 'share-our-strength': {
      // "Strength" in terracotta accent, rest in near-black, matching the landing page split-type treatment
      const words = project.name.split(' ')
      const lastWord = words.pop()!
      return (
        <h3 style={{ ...nameBase }}>
          <span style={{ color: project.theme.text }}>{words.join(' ')} </span>
          <span style={{ color: project.theme.accent }}>{lastWord}</span>
        </h3>
      )
    }

    case 'fuel':
      // Electric lime-to-emerald gradient text, matching Fuel's athletic dark identity
      return (
        <h3
          style={{
            ...nameBase,
            backgroundImage: 'linear-gradient(90deg, #A3E635 0%, #4ADE80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {project.name}
        </h3>
      )

    default:
      return <h3 style={{ ...nameBase, color: project.theme.text }}>{project.name}</h3>
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  // Touch devices never fire hover, so a hover-gated "view" affordance would sit
  // permanently dimmed there with no tap feedback. Default it to fully visible on touch.
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const borderAlpha = hovered ? '55' : '30'
  // Tile-only background if defined (keeps detail page untouched), else cardBg, else solid bg
  const background = project.theme.tileBg ?? project.theme.cardBg ?? project.theme.bg
  // Top padding accounts for Slurrp Farm's decorative rule
  const paddingTop = project.slug === 'slurrp-farm' ? 0 : 'clamp(1.4rem, 2.8vw, 2.4rem)'

  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background,
        border: `1px solid ${project.theme.accent}${borderAlpha}`,
        paddingTop,
        paddingBottom: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        paddingLeft: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        paddingRight: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        minHeight: 'clamp(200px, 22vw, 300px)',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
        transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease, box-shadow 220ms ease',
        boxShadow: hovered ? '0 20px 55px -24px rgba(0,0,0,0.65)' : '0 0 0 rgba(0,0,0,0)',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slurrp Farm earthy three-color top rule spanning full card width */}
      {project.slug === 'slurrp-farm' && (
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            height: 5,
            marginLeft: 'calc(-1 * clamp(1.4rem, 2.8vw, 2.4rem))',
            marginRight: 'calc(-1 * clamp(1.4rem, 2.8vw, 2.4rem))',
            marginBottom: 'clamp(1.4rem, 2.8vw, 2.4rem)',
          }}
        >
          <div style={{ flex: 1, background: '#F5CC5A' }} /> {/* warm yellow -- millet/turmeric; new token, SF brand warmth */}
          <div style={{ flex: 1, background: '#E85D3B' }} /> {/* warm red -- food-brand energy; new token, distinct from tangerine */}
          <div style={{ flex: 1, background: '#4A7C4E' }} /> {/* earthy green -- same family as theme.accent; new token for stripe brightness */}
        </div>
      )}

      {/* Kind badge -- top right */}
      <span
        style={{
          alignSelf: 'flex-end',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 'clamp(0.6rem, 0.85vw, 0.68rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: project.theme.accent,
          opacity: 0.7,
          whiteSpace: 'nowrap',
        }}
      >
        {project.badge ?? project.kind}
      </span>

      {/* Name + descriptor */}
      <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
        <CardName project={project} />

        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)',
            letterSpacing: '0.12em',
            color: project.theme.text,
            opacity: 0.5,
            lineHeight: 1.5,
            margin: '0 0 1.1rem',
          }}
        >
          {project.oneLiner}
        </p>

        {/* View link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: project.theme.accent,
            opacity: isTouch || hovered ? 1 : 0.65,
            transition: 'opacity 180ms ease',
          }}
        >
          <span>view</span>
          <span>&#8594;</span>
        </div>
      </div>
    </Link>
  )
}
