import { projects, type BuildSections, type ConsultingSections } from '@/lib/content/projects'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
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

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const { theme } = project
  const isPrizerv = project.slug === 'prizerv'
  const textDim = `${theme.text}b0`

  return (
    <>
      {/* Prizerv gradient drift + reduced-motion override */}
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
          background: isPrizerv ? theme.bg : theme.bg,
          color: theme.text,
          minHeight: '100vh',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* back */}
          <a
            href="/work"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: theme.accent,
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '3rem',
              opacity: 0.7,
            }}
          >
            &#8592; back
          </a>

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

          {/* name */}
          <h1
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: theme.text,
              margin: '0 0 1.5rem',
            }}
          >
            {project.name}
          </h1>

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

          {/* live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: theme.bg,
                background: theme.accent,
                padding: '0.65rem 1.1rem',
                textDecoration: 'none',
                marginBottom: 'clamp(3rem, 6vw, 5rem)',
              }}
            >
              <span>&#8599;</span>
              <span>view live</span>
            </a>
          )}

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

          {/* bottom breathing room */}
          <div style={{ height: 'clamp(4rem, 10vw, 8rem)' }} />
        </div>
      </main>
    </>
  )
}
