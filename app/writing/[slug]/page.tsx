import { writing } from '@/lib/writing'
import { notFound } from 'next/navigation'
import { AmbientField } from '@/app/components/AmbientField'
import { Reveal } from '@/app/components/Reveal'
import { ExpandableBody } from '@/app/components/ExpandableBody'

const SECTION_BG = '#0D1929'

export function generateStaticParams() {
  return writing.map((e) => ({ slug: e.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function WritingDetailPage({ params }: Props) {
  const { slug } = await params
  const entry = writing.find((e) => e.slug === slug)
  if (!entry) notFound()

  return (
    <main style={{ background: SECTION_BG, minHeight: '100vh', position: 'relative', overflow: 'hidden' }} className="px-5 py-24 md:px-12">
      <AmbientField opacity={0.32} />
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
          &#8592; writing
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
          {entry.category} &middot; {entry.readTime}
        </p>

        <Reveal mask>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: '#F4EFE6',
              fontSize: 'clamp(32px, 5.5vw, 64px)',
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            {entry.title}
          </h1>
        </Reveal>

        <div
          style={{
            borderLeft: '2px solid rgba(255,107,53,0.3)',
            paddingLeft: 24,
            marginBottom: 56,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: 'rgba(244,239,230,0.7)',
              fontSize: 19,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {entry.excerpt}
          </p>
        </div>

        {/* Excerpt above is always visible; the full piece is collapsed behind
            this button so arrival is not a commitment to the whole read. */}
        <ExpandableBody html={entry.body} accent="#FF6B35" label="Read the full piece" bodyClassName="writing-body" />
      </div>

      <style>{`
        .writing-body {
          font-family: var(--font-inter), sans-serif;
          color: rgba(244,239,230,0.85);
          font-size: 17px;
          line-height: 1.85;
        }
        .writing-body p { margin-bottom: 24px; }
        .writing-body h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.15;
          color: #F4EFE6;
          margin: 48px 0 16px;
        }
        .writing-body a { color: #FF6B35; text-decoration: underline; text-decoration-color: rgba(255,107,53,0.4); }
        .writing-body a:hover { text-decoration-color: #FF6B35; }
        .writing-body blockquote {
          border-left: 2px solid rgba(255,107,53,0.3);
          padding-left: 20px;
          margin: 32px 0;
          color: rgba(244,239,230,0.65);
          font-style: italic;
        }
      `}</style>
    </main>
  )
}
