'use client'

import dynamic from 'next/dynamic'

// ssr: false must live in a Client Component in Next.js 16 App Router.
// This thin wrapper satisfies that requirement; page.tsx (Server Component)
// imports this instead of using dynamic directly.
const LoadingScreen = dynamic(
  () => import('./LoadingScreen').then((m) => ({ default: m.LoadingScreen })),
  { ssr: false },
)

export function LoadingScreenClient() {
  return <LoadingScreen />
}
