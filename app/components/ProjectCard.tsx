'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/content/projects'

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const borderAlpha = hovered ? '50' : '28'
  const isDark = project.theme.text === '#F4EFE6'

  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${project.theme.accent}${borderAlpha}`,
        textDecoration: 'none',
        transition: 'border-color 220ms ease, transform 180ms ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        overflow: 'hidden',
        background: project.theme.bg,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* placeholder block -- themed wash, project name watermark */}
      <div
        style={{
          aspectRatio: '4 / 3',
          background: project.theme.surface,
          borderBottom: `1px solid ${project.theme.accent}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle accent wash on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: project.theme.accent,
            opacity: hovered ? 0.06 : 0.03,
            transition: 'opacity 220ms ease',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 3vw, 2rem)',
            letterSpacing: '-0.02em',
            color: project.theme.text,
            opacity: isDark ? 0.18 : 0.15,
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.name}
        </span>
        {/* kind badge */}
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
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
      </div>

      {/* card body */}
      <div
        style={{
          padding: '1rem 1.1rem 1.1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            lineHeight: 1.5,
            color: project.theme.text,
            opacity: 0.8,
            margin: 0,
            flex: 1,
          }}
        >
          {project.oneLiner}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: project.theme.accent,
            transition: 'opacity 180ms ease',
            opacity: hovered ? 1 : 0.7,
          }}
        >
          <span>read more</span>
          <span>&#8594;</span>
        </div>
      </div>
    </Link>
  )
}
