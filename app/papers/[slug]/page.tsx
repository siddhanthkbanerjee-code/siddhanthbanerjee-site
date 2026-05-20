import { papers } from '@/lib/content/papers'
import { notFound } from 'next/navigation'

// Background: same deep blue as /writing for visual continuity --
// papers share the writing ecosystem until a /papers index is warranted.
const SECTION_BG = '#0D1929'

function formatDate(date: string): string {
  // YYYY-MM-DD -> Published YYYY.MM.DD; YYYY-MM -> Published YYYY.MM
  return 'Published ' + date.replace(/-/g, '.')
}

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
    <main
      style={{ background: SECTION_BG, minHeight: '100vh' }}
      className="px-5 py-24 md:px-12"
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <a
          href="/writing"
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
          &#8592; back to writing
        </a>

        <h1
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: '#F4EFE6',
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          {paper.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.35)',
            marginBottom: 48,
          }}
        >
          {formatDate(paper.date)}
        </p>

        {/* Abstract: left rule chosen over italic or label.
            A structural border communicates section change without adding more text
            to parse, and is a familiar convention in long-form academic layout. */}
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
              fontSize: 20,
              lineHeight: 1.65,
              maxWidth: 600,
              margin: 0,
            }}
          >
            {paper.abstract}
          </p>
        </div>

        <div
          className="paper-body"
          dangerouslySetInnerHTML={{ __html: paper.body }}
        />
      </div>

      <style>{`
        .paper-body {
          font-family: var(--font-inter), sans-serif;
          color: #F4EFE6;
          font-size: 17px;
          line-height: 1.8;
          max-width: 680px;
        }
        .paper-body h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: 32px;
          line-height: 1.1;
          color: #F4EFE6;
          margin-top: 56px;
          margin-bottom: 16px;
        }
        .paper-body h3 {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: 22px;
          line-height: 1.2;
          color: rgba(244,239,230,0.85);
          margin-top: 40px;
          margin-bottom: 12px;
        }
        .paper-body p {
          margin-bottom: 24px;
        }
        .paper-body blockquote {
          border-left: 2px solid rgba(255,107,53,0.3);
          padding-left: 20px;
          margin: 32px 0;
          color: rgba(244,239,230,0.7);
          font-style: italic;
        }
        .paper-body ul, .paper-body ol {
          padding-left: 24px;
          margin-bottom: 24px;
        }
        .paper-body li {
          margin-bottom: 8px;
        }
        .paper-body code {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px;
          background: rgba(255,255,255,0.06);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .paper-body pre {
          background: rgba(255,255,255,0.06);
          padding: 20px;
          border-radius: 4px;
          overflow-x: auto;
          margin-bottom: 24px;
        }
        .paper-body pre code {
          background: none;
          padding: 0;
        }
        .paper-body a {
          color: #FF6B35;
          text-decoration: underline;
          text-decoration-color: rgba(255,107,53,0.4);
        }
        .paper-body a:hover {
          text-decoration-color: #FF6B35;
        }
      `}</style>
    </main>
  )
}
