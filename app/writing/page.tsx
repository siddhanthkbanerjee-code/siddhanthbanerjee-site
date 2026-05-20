import { writingEntries } from '@/lib/content/writing'

export default function WritingPage() {
  return (
    <main style={{ background: '#0E0B12', minHeight: '100vh', padding: '96px 48px' }}>
      <h1
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
      </h1>

      {writingEntries.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: 'rgba(244,239,230,0.35)',
            fontSize: 16,
            fontStyle: 'italic',
          }}
        >
          Essays and notes coming soon.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {writingEntries.map((entry) => (
            <li
              key={entry.slug}
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}
            >
              <a
                href={`/writing/${entry.slug}`}
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#F4EFE6',
                  fontSize: 32,
                  textDecoration: 'none',
                }}
              >
                {entry.title}
              </a>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  color: 'rgba(244,239,230,0.6)',
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                {entry.abstract}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
