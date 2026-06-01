export function PathStub() {
  return (
    <section
      id="path-section"
      style={{
        background: 'var(--color-ink)',
        padding: 'clamp(4rem, 8vw, 7rem) 2rem 4rem',
        minHeight: '50vh',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontWeight: 300,
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          color: 'var(--color-cream)',
          margin: '0 0 1.5rem',
        }}
      >
        my path
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          color: 'rgba(244,239,230,0.22)',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        the path, loading
      </p>
    </section>
  )
}
