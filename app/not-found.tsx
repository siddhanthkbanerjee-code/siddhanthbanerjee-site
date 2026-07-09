import { AmbientField } from '@/app/components/AmbientField'

// On-brand 404: same dark ambient language as the sub-pages, one clear way back.
export default function NotFound() {
  return (
    <main
      style={{
        background: 'var(--color-ink)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      className="px-5 md:px-12"
    >
      <AmbientField opacity={0.35} />
      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-tangerine)',
            marginBottom: 16,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: 'var(--color-cream)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            lineHeight: 1.02,
            marginBottom: 24,
          }}
        >
          This page is off the map.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 300,
            color: 'rgba(244,239,230,0.7)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            marginBottom: 40,
            maxWidth: 480,
          }}
        >
          The link is broken or the page never existed. Everything real is one
          step back.
        </p>
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-cream)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,107,53,0.5)',
            paddingBottom: 4,
            display: 'inline-block',
            minHeight: 44,
          }}
        >
          &#8592; back to the site
        </a>
      </div>
    </main>
  )
}
