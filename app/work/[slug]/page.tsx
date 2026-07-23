import type { Metadata } from 'next'
import { projects, type BuildSections, type ConsultingSections, type ProjectScreenshot } from '@/lib/content/projects'
import { notFound } from 'next/navigation'
import { BackLink } from '@/app/components/BackLink'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// Per-project metadata so a shared link previews as the project, not the homepage.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const title = `${project.name} | Siddhanth Banerjee`
  return {
    title,
    description: project.oneLiner,
    openGraph: {
      title: project.name,
      description: project.oneLiner,
      type: 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Siddhanth Banerjee, AI Builder and GTM Strategist' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.oneLiner,
      images: ['/og.png'],
    },
  }
}

// [draft in progress] treatment: italic muted mono label
function Draft() {
  return (
    <span
      style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: '0.75rem',
        fontStyle: 'italic',
        color: 'rgba(128,128,128,0.55)',
        letterSpacing: '0.1em',
      }}
    >
      [draft in progress]
    </span>
  )
}

function SectionBlock({
  label,
  body,
  accent,
  text,
}: {
  label: string
  body: string
  accent: string
  text: string
}) {
  const isEmpty = !body || body.startsWith('[')
  return (
    <div
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        borderTop: `1px solid ${accent}20`,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accent,
          margin: '0 0 1rem',
        }}
      >
        {label}
      </p>
      {isEmpty ? (
        <Draft />
      ) : (
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.7,
            color: text,
            margin: 0,
            maxWidth: 720,
          }}
        >
          {body}
        </p>
      )}
    </div>
  )
}

function BuildSpine({
  sections,
  accent,
  text,
}: {
  sections: BuildSections
  accent: string
  text: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SectionBlock label="what it is" body={sections.whatItIs} accent={accent} text={text} />
      <SectionBlock label="what is unique" body={sections.whatIsUnique} accent={accent} text={text} />
      <SectionBlock label="how it was built" body={sections.howItWasBuilt} accent={accent} text={text} />
      <SectionBlock label="gtm angle" body={sections.gtmAngle} accent={accent} text={text} />
    </div>
  )
}

function ConsultingSpine({
  sections,
  accent,
  text,
}: {
  sections: ConsultingSections
  accent: string
  text: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SectionBlock label="context" body={sections.context} accent={accent} text={text} />
      <SectionBlock label="the thinking" body={sections.theThinking} accent={accent} text={text} />
      <SectionBlock label="what i made" body={sections.whatIMade} accent={accent} text={text} />
    </div>
  )
}

// Product screenshots gallery: real, sanitised captures from the live build,
// each paired with a one-line caption tying it back to the claim above. Only
// renders when a project has screenshots defined.
function Screenshots({
  items,
  accent,
  text,
}: {
  items: ProjectScreenshot[]
  accent: string
  text: string
}) {
  return (
    <div
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        borderTop: `1px solid ${accent}20`,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accent,
          margin: '0 0 1.5rem',
        }}
      >
        from the live build
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 2.75rem)' }}>
        {items.map((shot) => (
          <figure key={shot.src} style={{ margin: 0 }}>
            <div
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                border: `1px solid ${accent}30`,
                boxShadow: '0 24px 60px -32px rgba(0,0,0,0.45)',
                background: '#fff',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                color: `${text}90`,
                margin: '0.85rem 0 0',
                maxWidth: 640,
              }}
            >
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

// Per-project h1 treatment matching each product's visual identity
function PageHeading({ slug, name, accent, text }: { slug: string; name: string; accent: string; text: string }) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-fraunces), serif',
    fontWeight: 300,
    fontSize: 'clamp(2.8rem, 8vw, 7rem)',
    lineHeight: 0.92,
    letterSpacing: '-0.02em',
    margin: '0 0 1.5rem',
  }

  switch (slug) {
    case 'kairos':
      return (
        <h1
          style={{
            ...base,
            backgroundImage: 'linear-gradient(90deg, #f472b6 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {name}
        </h1>
      )
    case 'prizerv':
      return (
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              color: '#e879f9',
              margin: '0 0 0.5rem',
              opacity: 0.85,
            }}
          >
            a structured mirror
          </p>
          <h1 style={{ ...base, margin: 0, color: text }}>
            {name}
          </h1>
        </div>
      )
    case 'lever':
      return <h1 style={{ ...base, color: accent }}>{name}</h1>
    case 'slurrp-farm':
      return <h1 style={{ ...base, color: text }}>{name}</h1>
    case 'share-our-strength': {
      const words = name.split(' ')
      const lastWord = words.pop()!
      return (
        <h1 style={{ ...base }}>
          <span style={{ color: text }}>{words.join(' ')} </span>
          <span style={{ color: accent }}>{lastWord}</span>
        </h1>
      )
    }
    case 'fuel':
      return (
        <h1
          style={{
            ...base,
            backgroundImage: 'linear-gradient(90deg, #A3E635 0%, #4ADE80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {name}
        </h1>
      )
    default:
      return <h1 style={{ ...base, color: text }}>{name}</h1>
  }
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const { theme } = project
  const isPrizerv = slug === 'prizerv'
  const isSlurrpFarm = slug === 'slurrp-farm'
  const textDim = `${theme.text}b0`

  // Use cardBg gradient for the page background if defined (Kairos), else fall back to bg
  const pageBackground = isPrizerv ? theme.bg : (theme.cardBg ?? theme.bg)

  return (
    <>
      {/* Prizerv animated gradient drift */}
      {isPrizerv && (
        <style>{`
          @keyframes prizerevDrift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .prizerv-bg {
            background: linear-gradient(
              135deg,
              #FAF6F0, #fce7f3, #ede9fe, #fef3c7, #ccfbf1, #FAF6F0
            ) !important;
            background-size: 300% 300% !important;
            animation: prizerevDrift 20s ease infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .prizerv-bg { animation: none; background-position: 0% 50% !important; }
          }
        `}</style>
      )}

      <main
        className={isPrizerv ? 'prizerv-bg' : undefined}
        style={{
          background: pageBackground,
          color: theme.text,
          minHeight: '100vh',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)',
        }}
      >
        {/* Slurrp Farm earthy three-color rule at the very top, matching the card */}
        {isSlurrpFarm && (
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              height: 4,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <div style={{ flex: 1, background: '#F5CC5A' }} />
            <div style={{ flex: 1, background: '#E85D3B' }} />
            <div style={{ flex: 1, background: '#4A7C4E' }} />
          </div>
        )}

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* back: history-aware, returns to wherever the visitor came from (home or /work) */}
          <BackLink fallbackHref="/work" label="back" accent={theme.accent} />

          {/* kind badge */}
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: theme.accent,
              margin: '0 0 1rem',
              opacity: 0.65,
            }}
          >
            {project.kind}
          </p>

          {/* Per-project themed name */}
          <PageHeading
            slug={slug}
            name={project.name}
            accent={theme.accent}
            text={theme.text}
          />

          {/* one-liner */}
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              lineHeight: 1.4,
              color: textDim,
              margin: '0 0 2.5rem',
              maxWidth: 600,
            }}
          >
            {project.oneLiner}
          </p>

          {/* divider */}
          <div
            style={{
              height: 1,
              background: `${theme.accent}20`,
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          />

          {/* spine sections */}
          {project.kind === 'build' ? (
            <BuildSpine
              sections={project.sections}
              accent={theme.accent}
              text={theme.text}
            />
          ) : (
            <ConsultingSpine
              sections={project.sections}
              accent={theme.accent}
              text={theme.text}
            />
          )}

          {/* screenshots: real, sanitised captures from the live build */}
          {project.screenshots && project.screenshots.length > 0 && (
            <Screenshots items={project.screenshots} accent={theme.accent} text={theme.text} />
          )}

          {/* foot: live site link */}
          {project.liveUrl && (
            <div
              style={{
                marginTop: 'clamp(3rem, 6vw, 5rem)',
                paddingTop: 'clamp(2rem, 4vw, 3rem)',
                borderTop: `1px solid ${theme.accent}20`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: `${theme.text}60`,
                  margin: '0 0 0.75rem',
                }}
              >
                live site
              </p>
              <a
                href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                  color: theme.accent,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  minHeight: 44,
                }}
              >
                <span>Visit the live site</span>
                <span style={{ fontSize: '0.85em' }}>&#8599;</span>
              </a>
            </div>
          )}

          <div style={{ height: 'clamp(4rem, 10vw, 8rem)' }} />
        </div>
      </main>
    </>
  )
}
