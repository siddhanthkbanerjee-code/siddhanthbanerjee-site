import { projects } from '@/lib/content/projects'
import { ProjectCard } from './ProjectCard'

const builds = projects.filter((p) => p.kind === 'build')
const consulting = projects.filter((p) => p.kind === 'consulting')

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-jetbrains-mono), monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(244,239,230,0.35)',
  margin: '0 0 1.25rem',
}

export function WorkShowcase() {
  return (
    <section
      style={{
        background: 'var(--color-ink)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3.5rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Builds */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <p style={sectionLabel}>builds</p>
        <div className="showcase-builds-grid">
          {builds.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      {/* Consulting */}
      <div>
        <p style={sectionLabel}>consulting</p>
        <div className="showcase-consulting-grid">
          {consulting.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <style>{`
        .showcase-builds-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
        }
        .showcase-consulting-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
        }
        @media (max-width: 768px) {
          .showcase-builds-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .showcase-builds-grid,
          .showcase-consulting-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
