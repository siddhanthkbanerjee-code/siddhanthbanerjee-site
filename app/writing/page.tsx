import { writing } from '@/lib/writing'

// Deep Oxford navy -- matches WritingSection home bg for ecosystem continuity
const SECTION_BG = '#0D1929'

export default function WritingPage() {
  return (
    <main style={{ background: SECTION_BG, minHeight: '100vh' }} className="px-5 py-24 md:px-12">
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
            marginBottom: 64,
          }}
        >
          essays and notes
        </p>

        <div>
          {writing.map((entry) => (
            <a
              key={entry.slug}
              href={`/writing/${entry.slug}`}
              className="writing-row"
              style={{
                display: 'block',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                padding: '32px 0',
                textDecoration: 'none',
                minHeight: 44,
              }}
            >
              <h2
                className="writing-row-title"
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#F4EFE6',
                  fontSize: 'clamp(22px, 3.5vw, 30px)',
                  lineHeight: 1.15,
                  marginBottom: 8,
                  transition: 'color 200ms ease',
                }}
              >
                {entry.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  color: 'rgba(244,239,230,0.55)',
                  fontSize: 15,
                  lineHeight: 1.55,
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                {entry.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .writing-row:hover .writing-row-title { color: #FF6B35 !important; }
      `}</style>
    </main>
  )
}
