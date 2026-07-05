import { papers } from '@/lib/content/papers'
import { writing } from '@/lib/writing'
import { Reveal } from './Reveal'

// #0D1929: deep Oxford navy. Justification: same bg as /writing and /papers routes,
// so the home section reads as the entry point to that ecosystem rather than a new zone.
const SECTION_BG = 'linear-gradient(180deg, #10203A 0%, #0D1929 55%)' // lifted navy (10203A) into deep Oxford navy for depth

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jetbrains-mono), monospace',
  fontSize: '0.58rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(244,239,230,0.35)',
  margin: '0 0 1.5rem',
}

const rowBase: React.CSSProperties = {
  display: 'block',
  borderTop: '1px solid rgba(255,255,255,0.07)',
  padding: 'clamp(1.1rem, 2.5vw, 1.6rem) 0',
  textDecoration: 'none',
  minHeight: 44,
}

function PaperRow({ slug, title, descriptor }: { slug: string; title: string; descriptor: string }) {
  return (
    <a href={`/papers/${slug}`} className="section-row" style={rowBase}>
      <h3
        className="section-row-title"
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          color: '#F4EFE6',
          fontSize: 'clamp(16px, 2.2vw, 22px)',
          lineHeight: 1.2,
          marginBottom: 5,
          transition: 'color 200ms ease',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(244,239,230,0.55)',
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 600,
        }}
      >
        {descriptor}
      </p>
    </a>
  )
}

function WritingRow({ slug, title, excerpt }: { slug: string; title: string; excerpt: string }) {
  return (
    <a href={`/writing/${slug}`} className="section-row" style={rowBase}>
      <h3
        className="section-row-title"
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          color: '#F4EFE6',
          fontSize: 'clamp(16px, 2.2vw, 22px)',
          lineHeight: 1.2,
          marginBottom: 5,
          transition: 'color 200ms ease',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(244,239,230,0.55)',
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 600,
        }}
      >
        {excerpt}
      </p>
    </a>
  )
}

export function WritingSection() {
  return (
    <section
      style={{
        background: SECTION_BG,
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3.5rem)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal mask>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: '#F4EFE6',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: '0 0 clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            Writing and Papers.
          </h2>
        </Reveal>

        {/* Papers strand */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={labelStyle}>papers</p>
          <div>
            {papers.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <PaperRow slug={p.slug} title={p.title} descriptor={p.descriptor} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Writing strand -- only rendered once real pieces exist, so no empty label shows */}
        {writing.length > 0 && (
          <div>
            <p style={labelStyle}>writing</p>
            <div>
              {writing.map((e) => (
                <WritingRow key={e.slug} slug={e.slug} title={e.title} excerpt={e.excerpt} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .section-row:hover .section-row-title { color: #FF6B35 !important; }
      `}</style>
    </section>
  )
}
