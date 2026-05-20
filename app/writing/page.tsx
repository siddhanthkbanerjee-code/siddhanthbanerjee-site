'use client'

import { useState } from 'react'
import { writingEntries } from '@/lib/content/writing'

type FilterKey = 'all' | 'essay' | 'note'

// Background: #0D1929 -- matches WritingTeaser on the home page, so this route
// reads as a direct expansion of that section rather than a new zone.
const SECTION_BG = '#0D1929'

function formatDate(date: string): string {
  // YYYY-MM-DD or YYYY-MM -> YYYY.MM
  return date.slice(0, 7).replace('-', '.')
}

const PILLS: { label: string; value: FilterKey }[] = [
  { label: 'all', value: 'all' },
  { label: 'essays', value: 'essay' },
  { label: 'notes', value: 'note' },
]

export default function WritingPage() {
  const [active, setActive] = useState<FilterKey>('all')

  const filtered =
    active === 'all'
      ? writingEntries
      : writingEntries.filter((e) => e.category === active)

  return (
    <main
      style={{ background: SECTION_BG, minHeight: '100vh' }}
      className="px-5 py-24 md:px-12"
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: '#F4EFE6',
            fontSize: 'clamp(48px, 8vw, 80px)',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Writing.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: 'rgba(244,239,230,0.35)',
            marginBottom: 48,
          }}
        >
          essays, notes, and half-formed thoughts
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 64 }}>
          {PILLS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                border: `1px solid ${active === value ? '#FF6B35' : 'rgba(255,255,255,0.08)'}`,
                color: active === value ? '#FF6B35' : 'rgba(244,239,230,0.35)',
                background: 'transparent',
                cursor: 'none',
                transition: 'color 200ms ease, border-color 200ms ease',
                minHeight: 44,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.35)',
              textAlign: 'center',
              padding: '64px 0',
            }}
          >
            coming soon
          </p>
        ) : (
          <div>
            {filtered.map((entry) => (
              <a
                key={entry.slug}
                href={`/writing/${entry.slug}`}
                className="writing-entry"
                style={{
                  display: 'block',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  padding: '32px 0',
                  textDecoration: 'none',
                  minHeight: 44,
                }}
              >
                <div className="writing-entry-inner">
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      color: 'rgba(244,239,230,0.35)',
                      flexShrink: 0,
                      paddingTop: 6,
                    }}
                  >
                    {formatDate(entry.date)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h2
                      className="writing-entry-title"
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontWeight: 300,
                        color: '#F4EFE6',
                        fontSize: 'clamp(24px, 4vw, 32px)',
                        lineHeight: 1.1,
                        marginBottom: 8,
                        transition: 'color 200ms ease',
                      }}
                    >
                      {entry.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        color: 'rgba(244,239,230,0.6)',
                        fontSize: 16,
                        lineHeight: 1.5,
                        maxWidth: 560,
                        margin: 0,
                      }}
                    >
                      {entry.abstract}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .writing-entry-inner {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .writing-entry:hover .writing-entry-title {
          color: #FF6B35 !important;
        }
        .writing-entry:hover {
          background: rgba(255, 255, 255, 0.02);
          margin: 0 -16px;
          padding-left: 16px;
          padding-right: 16px;
        }
        @media (max-width: 600px) {
          .writing-entry-inner {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </main>
  )
}
