import { Reveal } from './Reveal'

// DRAFT COPY (edit freely): real contact-section paragraph, replacing the placeholder.
const CONTACT_COPY =
  'If you are hiring for AI go-to-market, building something that needs to reach customers, or just want to compare notes on where this is heading, I would like to talk. Email is the fastest way to reach me.'

export function Contact() {
  return (
    <section
      style={{
        background: 'radial-gradient(115% 125% at 16% 100%, #1c1030 0%, var(--color-ink) 58%)', // warm violet glow (1c1030) from lower-left where the text sits
        minHeight: '60vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) 5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 640, width: '100%' }}>
        <Reveal mask>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: 'var(--color-cream)',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              margin: '0 0 clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            LET&apos;S TALK.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              color: 'rgba(244,239,230,0.6)',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.65,
              margin: '0 0 clamp(2rem, 4vw, 3rem)',
              maxWidth: 480,
            }}
          >
            {CONTACT_COPY}
          </p>
        </Reveal>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.75rem, 1.5vw, 1rem)',
          }}
        >
          <a
            href="mailto:siddhanth.kbanerjee@gmail.com"
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'var(--color-cream)',
              textDecoration: 'none',
              display: 'inline-block',
              minHeight: 44,
              lineHeight: '44px',
            }}
            className="contact-link"
          >
            siddhanth.kbanerjee@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/siddhanthbanerjee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.45)',
              textDecoration: 'none',
              display: 'inline-block',
              minHeight: 44,
              lineHeight: '44px',
              transition: 'color 200ms ease',
            }}
            className="contact-link-secondary"
          >
            linkedin.com/in/siddhanthbanerjee
          </a>
        </div>
      </div>

      <div
        style={{
          position: 'absolute' as const,
          bottom: '2rem',
          left: 'clamp(1.5rem, 6vw, 4rem)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.22)',
            margin: 0,
          }}
        >
          &copy; Siddhanth Banerjee / 2026 / Oxford
        </p>
      </div>

      <style>{`
        .contact-link:hover { color: var(--color-tangerine) !important; }
        .contact-link-secondary:hover { color: rgba(244,239,230,0.75) !important; }
      `}</style>
    </section>
  )
}
