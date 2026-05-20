import { projects, type ProjectStatus } from '@/lib/content/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// Same warm amber as /work -- see SECTION_BG comment in work/page.tsx
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

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const isPending = project.oneLiner === '[ONE_LINER_PENDING]'

  return (
    <main
      style={{ background: SECTION_BG, minHeight: '100vh' }}
      className="px-5 py-24 md:px-12"
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <a
          href="/work"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.35)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 48,
            minHeight: 44,
            lineHeight: '44px',
          }}
        >
          &#8592; back to work
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: '#F4EFE6',
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {project.name}
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: STATUS_COLOR[project.status],
              flexShrink: 0,
            }}
          >
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <p
          style={
            isPending
              ? {
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 14,
                  color: 'rgba(244,239,230,0.35)',
                  fontStyle: 'italic',
                  marginBottom: 32,
                }
              : {
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 300,
                  color: '#F4EFE6',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  lineHeight: 1.3,
                  marginBottom: 32,
                  maxWidth: 640,
                }
          }
        >
          {isPending ? '[draft in progress]' : project.oneLiner}
        </p>

        {(project.stack || project.liveUrl) && (
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 64,
              paddingBottom: 32,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {project.stack && (
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  color: 'rgba(244,239,230,0.35)',
                }}
              >
                {project.stack.join(', ')}
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  color: '#FF6B35',
                  textDecoration: 'none',
                  minHeight: 44,
                  lineHeight: '44px',
                }}
              >
                &#8599; {project.liveUrl.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        )}

        {project.heroImage ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              marginBottom: 64,
              overflow: 'hidden',
            }}
          >
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 300,
                color: 'rgba(244,239,230,0.12)',
                fontSize: 'clamp(24px, 5vw, 56px)',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}
            >
              {project.name}
            </span>
          </div>
        )}

        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.35)',
              margin: 0,
            }}
          >
            case study coming soon
          </p>
        </div>
      </div>
    </main>
  )
}
