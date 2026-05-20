'use client'

import dynamic from 'next/dynamic'

// ssr: false must live in a Client Component in Next.js 16 App Router.
const Morph = dynamic(
  () => import('./Morph').then((m) => ({ default: m.Morph })),
  { ssr: false },
)

export function MorphClient() {
  return <Morph />
}
