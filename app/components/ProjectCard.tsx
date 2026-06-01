'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/content/projects'

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const borderAlpha = hovered ? '55' : '30'

  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: project.theme.bg,
        border: `1px solid ${project.theme.accent}${borderAlpha}`,
        padding: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        minHeight: 'clamp(200px, 22vw, 300px)',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 180ms ease, border-color 220ms ease',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* kind badge -- top right */}
      <span
        style={{
          alignSelf: 'flex-end',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: project.theme.accent,
          opacity: 0.7,
        }}
      >
        {project.kind}
      </span>

      {/* name + descriptor */}
      <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: project.theme.text,
            margin: '0 0 0.75rem',
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)',
            letterSpacing: '0.12em',
            color: project.theme.text,
            opacity: 0.55,
            lineHeight: 1.5,
            margin: '0 0 1.25rem',
          }}
        >
          {project.oneLiner}
        </p>

        {/* read more */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: project.theme.accent,
            opacity: hovered ? 1 : 0.65,
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
