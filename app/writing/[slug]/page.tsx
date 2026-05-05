import { writing } from '@/lib/writing'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return writing.map((e) => ({ slug: e.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function WritingPage({ params }: Props) {
  const { slug } = await params
  const entry = writing.find((e) => e.slug === slug)
  if (!entry) notFound()

  return (
    <main className="bg-ink min-h-screen px-8 py-24 md:px-16">
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted hover:text-cream transition-colors duration-[250ms] mb-12 block"
        >
          Back
        </a>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted mb-4">
          {entry.category} · {entry.date} · {entry.readTime}
        </p>
        <h1 className="font-display font-light text-cream mb-8" style={{ fontSize: 48 }}>
          {entry.title}
        </h1>
        <p className="font-sans text-cream-dim text-lg leading-relaxed">
          {entry.excerpt}
        </p>
        <p className="font-sans text-cream-muted text-base mt-12 italic">
          Full content coming soon.
        </p>
      </div>
    </main>
  )
}
