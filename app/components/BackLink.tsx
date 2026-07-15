'use client'

import { useRouter } from 'next/navigation'

// History-aware back control for detail pages. Falls back to a fixed href
// (rather than a no-op) when there is no in-app history to pop, for example
// a shared link opened directly. Tap target is a real 44px hit area, not
// just the underlined text, so it is easy to hit and easy to see.
export function BackLink({
  fallbackHref,
  label,
  accent,
}: {
  fallbackHref: string
  label: string
  accent: string
}) {
  const router = useRouter()

  const hasInAppHistory = () => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem('sbg-nav-visited') === '1'
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (hasInAppHistory() && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <a
      href={fallbackHref}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: accent,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '2.5rem',
        marginLeft: '-0.5rem',
        padding: '0.75rem 0.5rem',
        minHeight: 44,
        opacity: 0.85,
        transition: 'opacity 180ms ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85' }}
    >
      <span aria-hidden="true">&#8592;</span>
      <span>{label}</span>
    </a>
  )
}
