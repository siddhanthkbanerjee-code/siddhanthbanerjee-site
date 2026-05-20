import { projects } from '@/lib/content/projects'

const statusLabel: Record<string, string> = {
  LIVE: 'Live',
  IN_BUILD_ALPHA: 'Alpha',
  IN_BUILD: 'In Build',
  ARCHIVED: 'Archived',
  TBD: 'TBD',
}

const statusColor: Record<string, string> = {
  LIVE: '#FF6B35',
  IN_BUILD_ALPHA: '#C9A961',
  IN_BUILD: '#C9A961',
  ARCHIVED: 'rgba(244,239,230,0.35)',
  TBD: 'rgba(244,239,230,0.35)',
}

export default function WorkPage() {
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
        Work.
      </h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map((p) => (
          <li
            key={p.slug}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 24,
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div>
              <a
                href={`/work/${p.slug}`}
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#F4EFE6',
                  fontSize: 32,
                  textDecoration: 'none',
                }}
              >
                {p.name}
              </a>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  color: 'rgba(244,239,230,0.6)',
                  fontSize: 16,
                  marginTop: 8,
                  maxWidth: 560,
                }}
              >
                {p.oneLiner}
              </p>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: statusColor[p.status] ?? 'rgba(244,239,230,0.35)',
                flexShrink: 0,
              }}
            >
              {statusLabel[p.status] ?? p.status}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
