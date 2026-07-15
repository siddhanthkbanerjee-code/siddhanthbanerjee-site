'use client'

import { useState } from 'react'

// The abstract or excerpt above this is always visible (it is the pitch); the
// full body is collapsed behind a button so a time-poor visitor is not
// committed to a long read on arrival, but can go deeper in one click.
export function ExpandableBody({
  html,
  accent,
  label,
  bodyClassName,
}: {
  html: string
  accent: string
  label: string
  bodyClassName?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {open && (
        <div
          className={bodyClassName}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: accent,
          background: 'none',
          border: `1px solid ${accent}40`,
          borderRadius: 999,
          padding: '0.85rem 1.5rem',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          minHeight: 44,
          marginTop: open ? '3rem' : 0,
          transition: 'border-color 180ms ease, background 180ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}12` }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
      >
        <span>{open ? 'Show less' : label}</span>
        <span aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
          &#8595;
        </span>
      </button>
    </div>
  )
}
