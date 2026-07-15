import type { Metadata } from 'next'
import { PathTimelineClient } from '@/app/components/PathTimelineClient'

export const metadata: Metadata = {
  title: 'Profile | Siddhanth Banerjee',
  description:
    'The path: five years across brand, product and strategy that add up to AI go-to-market. Epigamia, Slurrp Farm, Schbang, Zomato, and an Oxford MBA.',
}

export default function ProfilePage() {
  return (
    <main style={{ position: 'relative', background: 'var(--color-ink)' }}>
      <a href="/" className="profile-home" aria-label="Back to home">
        <span aria-hidden="true" style={{ marginRight: 8 }}>&#8592;</span>home
      </a>
      <PathTimelineClient />
      <style>{`
        .profile-home {
          position: fixed;
          top: clamp(1.25rem, 3vw, 2rem);
          right: clamp(1.25rem, 5vw, 3rem);
          z-index: 50;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-cream-muted);
          text-decoration: none;
          transition: color 200ms ease;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          padding: 8px 4px;
        }
        .profile-home:hover, .profile-home:focus-visible { color: var(--color-tangerine); }
      `}</style>
    </main>
  )
}
