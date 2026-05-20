import { papers } from '@/lib/content/papers'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }))
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const paper = papers.find((p) => p.slug === slug)
  if (!paper) notFound()

  return (
    <main style={{ background: '#0E0B12', minHeight: '100vh', padding: '96px 48px' }}>
      <a
        href="/"
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
        Back
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
        {paper.date}
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          color: '#F4EFE6',
          fontSize: 48,
          lineHeight: 1.1,
          marginBottom: 24,
        }}
      >
        {paper.title}
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(244,239,230,0.6)',
          fontSize: 18,
          maxWidth: 640,
          lineHeight: 1.6,
          marginBottom: 48,
        }}
      >
        {paper.abstract}
      </p>

      <div
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: '#F4EFE6',
          fontSize: 16,
          lineHeight: 1.8,
          maxWidth: 680,
        }}
        dangerouslySetInnerHTML={{ __html: paper.body }}
      />
    </main>
  )
}
