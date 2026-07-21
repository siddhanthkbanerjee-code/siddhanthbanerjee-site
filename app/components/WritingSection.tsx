import { papers } from '@/lib/content/papers'
import { writing } from '@/lib/writing'
import { Reveal } from './Reveal'
import { AmbientField } from './AmbientField'

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

// An opinion piece renders as a screenshot-style card: the actual LinkedIn post
// snapshot framed like a browser/card, clicking through to the real post. The image
// is shown top-anchored and cropped, with a fade at the bottom so a tall post reads
// as a preview, plus a "Read on LinkedIn" affordance that reveals the full-height feel.
function OpinionCard({
  title,
  image,
  sourceUrl,
  sourceLabel,
}: {
  title: string
  image: string
  sourceUrl: string
  sourceLabel?: string
}) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="opinion-card"
      aria-label={`${title}, read on LinkedIn`}
    >
      <div className="opinion-card-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={`Screenshot of the LinkedIn post: ${title}`} loading="lazy" />
        <div className="opinion-card-fade" aria-hidden="true" />
      </div>
      <div className="opinion-card-foot">
        <h3 className="opinion-card-title">{title}</h3>
        <span className="opinion-card-cta">
          {sourceLabel ?? 'Read on LinkedIn'} <span aria-hidden="true">&#8599;</span>
        </span>
      </div>
    </a>
  )
}

export function WritingSection() {
  return (
    <section
      id="writing-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: SECTION_BG,
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3.5rem)',
      }}
    >
      <AmbientField opacity={0.35} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            Writing.
          </h2>
        </Reveal>

        {/* Papers strand */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={labelStyle}>strategy essays</p>
          <div>
            {papers.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <PaperRow slug={p.slug} title={p.title} descriptor={p.descriptor} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Opinion pieces strand -- LinkedIn posts shown as screenshot cards linking to
            the real post. Only rendered once real pieces exist, so no empty label shows. */}
        {writing.length > 0 && (
          <div>
            <p style={labelStyle}>opinion pieces</p>
            <div className="opinion-grid">
              {writing.map((e, i) => (
                <Reveal key={e.slug} delay={i * 90}>
                  {e.image && e.sourceUrl ? (
                    <OpinionCard
                      title={e.title}
                      image={e.image}
                      sourceUrl={e.sourceUrl}
                      sourceLabel={e.sourceLabel}
                    />
                  ) : (
                    <a href={`/writing/${e.slug}`} className="section-row" style={rowBase}>
                      <h3 className="section-row-title" style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 300, color: '#F4EFE6', fontSize: 'clamp(16px, 2.2vw, 22px)', lineHeight: 1.2, transition: 'color 200ms ease' }}>
                        {e.title}
                      </h3>
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .section-row:hover .section-row-title { color: #FF6B35 !important; }

        .opinion-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 2.5vw, 1.75rem);
        }
        @media (max-width: 640px) {
          .opinion-grid { grid-template-columns: 1fr; }
        }

        .opinion-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          transition: transform 240ms cubic-bezier(0.22,1,0.36,1), border-color 240ms ease, box-shadow 240ms ease;
        }
        .opinion-card:hover, .opinion-card:focus-visible {
          transform: translateY(-5px);
          border-color: rgba(255,107,53,0.4);
          box-shadow: 0 22px 55px -28px rgba(0,0,0,0.8);
        }
        .opinion-card-frame {
          position: relative;
          /* Show the top of the post (author + opening lines); crop the long tail. */
          height: clamp(230px, 34vw, 340px);
          overflow: hidden;
          background: #fff;
        }
        .opinion-card-frame img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          object-position: top center;
        }
        .opinion-card-fade {
          position: absolute;
          inset: auto 0 0 0;
          height: 44%;
          background: linear-gradient(to bottom, rgba(13,25,41,0) 0%, rgba(13,25,41,0.72) 78%, #0D1929 100%);
          pointer-events: none;
        }
        .opinion-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: clamp(0.9rem, 2vw, 1.15rem) clamp(1rem, 2.2vw, 1.35rem);
        }
        .opinion-card-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          color: #F4EFE6;
          font-size: clamp(15px, 1.9vw, 19px);
          line-height: 1.2;
          margin: 0;
        }
        .opinion-card-cta {
          flex-shrink: 0;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(244,239,230,0.5);
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .opinion-card:hover .opinion-card-cta,
        .opinion-card:focus-visible .opinion-card-cta { color: #FF6B35; }
      `}</style>
    </section>
  )
}
