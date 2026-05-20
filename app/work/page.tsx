import { projects, type ProjectStatus } from '@/lib/content/projects'

// Section background: #18140C -- deep warm amber (approximately HSL 38, 33%, 7%).
// Same hue family as --color-gold (#C9A961) pulled down to near-black.
// Reads clearly warm against the cool ink (#0E0B12) and blue writing (#0D1929) backgrounds
// without overwhelming the card surfaces. No new CSS token needed; used on work routes only.
const SECTION_BG = '#18140C'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  LIVE: 'live',
  IN_BUILD_ALPHA: 'alpha',
  IN_BUILD: 'in build',
  ARCHIVED: 'archived',
  TBD: 'tbd',
}

const STATUS_COLOR: Record<ProjectStatus, string> = {
  LIVE: '#FF6B35',
  IN_BUILD_ALPHA: '#C9A961',
  IN_BUILD: '#C9A961',
  ARCHIVED: 'rgba(244,239,230,0.35)',
  TBD: 'rgba(244,239,230,0.35)',
}

export default function WorkPage() {
  return (
    <main
      style={{ background: SECTION_BG, minHeight: '100vh' }}
      className="px-5 py-24 md:px-12"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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

        <div className="work-grid">
          {projects.map((p) => {
            const isPending = p.oneLiner === '[ONE_LINER_PENDING]'
            return (
              <a
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  padding: 32,
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  transition: 'transform 200ms ease, border-color 200ms ease',
                  minHeight: 200,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontWeight: 300,
                      color: '#F4EFE6',
                      fontSize: 'clamp(22px, 3vw, 28px)',
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {p.name}
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: STATUS_COLOR[p.status],
                      flexShrink: 0,
                      paddingTop: 4,
                    }}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>

                <p
                  style={
                    isPending
                      ? {
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: 12,
                          color: 'rgba(244,239,230,0.35)',
                          fontStyle: 'italic',
                          margin: 0,
                          flex: 1,
                        }
                      : {
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 15,
                          color: 'rgba(244,239,230,0.6)',
                          lineHeight: 1.55,
                          margin: 0,
                          flex: 1,
                        }
                  }
                >
                  {isPending ? '[draft in progress]' : p.oneLiner}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {p.stack && p.stack.length > 0 ? (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'var(--font-jetbrains-mono), monospace',
                            fontSize: 9,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'rgba(244,239,230,0.35)',
                            padding: '3px 7px',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}

                  {p.liveUrl && (
                    <span
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: 10,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#FF6B35',
                        flexShrink: 0,
                      }}
                    >
                      &#8599; live
                    </span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .work-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 107, 53, 0.25) !important;
        }
        @media (max-width: 640px) {
          .work-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
