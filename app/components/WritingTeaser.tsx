import { writingEntries } from '@/lib/content/writing'

// Background: #0D1929 -- deepest shade in the Oxford navy family (see path.ts oxford-oxai tint #1E3A5F).
// One step darker keeps it within the existing palette range while signalling
// a distinct section mode from the ink (#0E0B12) base. No new CSS token needed.
const SECTION_BG = '#0D1929'

export function WritingTeaser() {
  const recent = writingEntries.slice(0, 3)

  return (
    <section
      style={{
        background: SECTION_BG,
        padding: '96px 48px',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          color: '#F4EFE6',
          fontSize: 80,
          lineHeight: 1,
          marginBottom: 64,
        }}
      >
        Writing.
      </h2>

      {recent.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.35)',
            textAlign: 'center',
            paddingBottom: 48,
          }}
        >
          coming soon
        </p>
      ) : (
        <>
          <div>
            {recent.map((entry) => (
              <a
                key={entry.slug}
                href={`/writing/${entry.slug}`}
                style={{
                  display: 'block',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  padding: '32px 0',
                  textDecoration: 'none',
                  minHeight: 44, // touch target
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 24,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontWeight: 300,
                        color: '#F4EFE6',
                        fontSize: 32,
                        lineHeight: 1.1,
                        marginBottom: 8,
                      }}
                    >
                      {entry.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        color: 'rgba(244,239,230,0.6)',
                        fontSize: 16,
                        lineHeight: 1.5,
                        maxWidth: 560,
                      }}
                    >
                      {entry.abstract}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(244,239,230,0.35)',
                      flexShrink: 0,
                    }}
                  >
                    {entry.date}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <a
            href="/writing"
            style={{
              display: 'inline-block',
              marginTop: 32,
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FF6B35',
              textDecoration: 'none',
              minHeight: 44,
              lineHeight: '44px',
            }}
          >
            see all writing
          </a>
        </>
      )}
    </section>
  )
}
