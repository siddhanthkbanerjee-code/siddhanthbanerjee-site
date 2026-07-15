import { projects } from '@/lib/content/projects'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { AmbientField } from './AmbientField'

const builds = projects.filter((p) => p.kind === 'build')
const consulting = projects.filter((p) => p.kind === 'consulting')

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-fraunces), serif',
  fontWeight: 300,
  color: 'var(--color-cream)',
  fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
  lineHeight: 0.98,
  letterSpacing: '-0.02em',
  margin: '0 0 clamp(1.75rem, 3.5vw, 2.5rem)',
}

export function WorkShowcase() {
  return (
    <section
      id="work-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #15111f 0%, var(--color-ink) 40%)', // subtle violet lift (15111f) so the section is not flat black behind the cards
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3.5rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <AmbientField opacity={0.4} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* AI GTM Work leads: matches the nav order and front-loads the go-to-market positioning */}
      <div id="ai-gtm-work">
      <Reveal style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <h2 style={sectionHeading}>AI GTM Work.</h2>
        <div className="showcase-consulting-grid">
          {consulting.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>
      </div>

      {/* Builds */}
      <div id="builds">
      <Reveal delay={120}>
        <h2 style={sectionHeading}>Builds.</h2>
        <div className="showcase-builds-grid">
          {builds.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>
      </div>
      </div>

      <style>{`
        .showcase-builds-grid {
          display: grid;
          /* Four builds read as a balanced 2x2, not a 3+1 orphan row */
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
        }
        .showcase-consulting-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
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
