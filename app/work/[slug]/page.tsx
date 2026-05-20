import { projects } from '@/lib/content/projects'
import { notFound } from 'next/navigation'

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

  return (
    <main style={{ background: '#0E0B12', minHeight: '100vh', padding: '96px 48px' }}>
      <a
        href="/work"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.35)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: 48,
        }}
      >
        Back to Work
      </a>

      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.35)',
          marginBottom: 16,
        }}
      >
        {project.status}
        {project.stack ? ` / ${project.stack.join(', ')}` : ''}
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          color: '#F4EFE6',
          fontSize: 64,
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        {project.name}
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(244,239,230,0.6)',
          fontSize: 20,
          maxWidth: 640,
          marginBottom: 48,
        }}
      >
        {project.oneLiner}
      </p>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF6B35',
            textDecoration: 'none',
          }}
        >
          View live
        </a>
      )}

      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(244,239,230,0.35)',
          fontSize: 14,
          marginTop: 64,
          fontStyle: 'italic',
        }}
      >
        Full case study coming soon.
      </p>
    </main>
  )
}
