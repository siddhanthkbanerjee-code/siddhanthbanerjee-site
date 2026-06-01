import dynamic from 'next/dynamic'
import { LoadingScreenClient } from './components/LoadingScreenClient'
import { HeroTransitionClient } from './components/HeroTransitionClient'
import { PathTimelineClient } from './components/PathTimelineClient'
// Grid and Work (Sprint 3: Builds and Consulting grids) are parked -- files intact, not rendered yet
const Writing = dynamic(() => import('./components/Writing').then((m) => ({ default: m.Writing })))
const Contact = dynamic(() => import('./components/Contact').then((m) => ({ default: m.Contact })))

// Sprint 3 placeholder: replace this div with the real Builds and Consulting sections
function BuildsPlaceholder() {
  return (
    <div
      style={{
        background: 'var(--color-ink)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(244,239,230,0.2)',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        builds and consulting, loading
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <LoadingScreenClient />
      <HeroTransitionClient />
      <PathTimelineClient />
      <BuildsPlaceholder />
      <Writing />
      <Contact />
    </main>
  )
}
