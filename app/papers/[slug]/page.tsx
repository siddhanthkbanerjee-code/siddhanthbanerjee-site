import type { Metadata } from 'next'
import { papers } from '@/lib/content/papers'
import { notFound } from 'next/navigation'
import { AmbientField } from '@/app/components/AmbientField'
import { Reveal } from '@/app/components/Reveal'
import { ExpandableBody } from '@/app/components/ExpandableBody'

const SECTION_BG = '#0D1929'

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }))
}

// Per-paper metadata so a shared link previews as the paper, not the homepage.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const paper = papers.find((p) => p.slug === slug)
  if (!paper) return {}
  const title = `${paper.title} | Siddhanth Banerjee`
  return {
    title,
    description: paper.descriptor,
    openGraph: {
      title: paper.title,
      description: paper.descriptor,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Siddhanth Banerjee, AI Builder and GTM Strategist' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description: paper.descriptor,
      images: ['/og.png'],
    },
  }
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
    <main
      style={{ background: SECTION_BG, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
      className="px-5 py-24 md:px-12"
    >
      <AmbientField opacity={0.32} />
      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <a
          href="/"
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
          &#8592; back
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
          {paper.module}
        </p>

        <Reveal mask>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: '#F4EFE6',
              fontSize: 'clamp(32px, 5.5vw, 68px)',
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            {paper.title}
          </h1>
        </Reveal>

        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: 'rgba(244,239,230,0.5)',
            fontSize: 15,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          {paper.descriptor}
        </p>

        <div
          style={{
            borderLeft: '2px solid rgba(255,107,53,0.3)',
            paddingLeft: 24,
            marginBottom: 64,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: 'rgba(244,239,230,0.75)',
              fontSize: 19,
              lineHeight: 1.65,
              maxWidth: 600,
              margin: 0,
            }}
          >
            {paper.abstract}
          </p>
        </div>

        {/* Abstract above is always visible; the full assignment is collapsed
            behind this button so arrival is not a commitment to the whole read. */}
        <ExpandableBody html={paper.body} accent="#FF6B35" label="Read full" bodyClassName="paper-body" />
      </div>

      <style>{`
        .paper-body {
          font-family: var(--font-inter), sans-serif;
          color: rgba(244,239,230,0.85);
          font-size: 17px;
          line-height: 1.85;
          max-width: 680px;
        }
        .paper-body h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.15;
          color: #F4EFE6;
          margin: 48px 0 16px;
        }
        .paper-body h3 {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: clamp(18px, 2.5vw, 24px);
          color: rgba(244,239,230,0.85);
          margin: 36px 0 12px;
        }
        .paper-body p { margin-bottom: 24px; }
        .paper-body blockquote {
          border-left: 2px solid rgba(255,107,53,0.3);
          padding-left: 20px;
          margin: 32px 0;
          color: rgba(244,239,230,0.65);
          font-style: italic;
        }
        .paper-body ul, .paper-body ol {
          padding-left: 24px;
          margin-bottom: 24px;
        }
        .paper-body li { margin-bottom: 8px; }
        .paper-body a { color: #FF6B35; text-decoration: underline; text-decoration-color: rgba(255,107,53,0.4); }
        .paper-body a:hover { text-decoration-color: #FF6B35; }
      `}</style>
    </main>
  )
}
