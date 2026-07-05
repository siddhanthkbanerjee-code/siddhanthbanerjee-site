import { projects } from '@/lib/content/projects'
import { AmbientField } from '@/app/components/AmbientField'
import { Reveal } from '@/app/components/Reveal'

// Background: #18140C -- deep warm amber, same hue family as gold (#C9A961) pulled to near-black
const SECTION_BG = '#18140C'

export default function WorkPage() {
  const builds = projects.filter((p) => p.kind === 'build')
  const consulting = projects.filter((p) => p.kind === 'consulting')

  return (
    <main style={{ background: SECTION_BG, minHeight: '100vh', position: 'relative', overflow: 'hidden' }} className="px-5 py-24 md:px-12">
      <AmbientField opacity={0.4} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal mask>
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
            Work.
          </h1>
        </Reveal>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: 'rgba(244,239,230,0.35)',
            marginBottom: 64,
          }}
        >
          things i&apos;ve built and shipped
        </p>

        {(['build', 'consulting'] as const).map((kind) => {
          const list = kind === 'build' ? builds : consulting
          return (
            <div key={kind} style={{ marginBottom: 56 }}>
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,239,230,0.3)',
                  marginBottom: 20,
                }}
              >
                {kind}
              </p>
              <div className="work-grid">
                {list.map((p) => (
                  <a
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    className="work-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      padding: 28,
                      border: `1px solid ${p.theme.accent}22`,
                      textDecoration: 'none',
                      background: p.theme.bg,
                      transition: 'transform 180ms ease',
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontWeight: 300,
                        color: p.theme.text,
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        margin: 0,
                      }}
                    >
                      {p.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontWeight: 300,
                        color: p.theme.text,
                        opacity: 0.7,
                        fontSize: 14,
                        lineHeight: 1.5,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {p.oneLiner}
                    </p>
                    {p.liveUrl && (
                      <span
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: 10,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: p.theme.accent,
                        }}
                      >
                        &#8599; live
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .work-card:hover { transform: translateY(-2px); }
        @media (max-width: 640px) {
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
