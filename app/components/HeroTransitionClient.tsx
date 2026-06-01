'use client'

import dynamic from 'next/dynamic'

const HeroTransitionBlock = dynamic(
  () => import('./HeroTransitionBlock').then((m) => ({ default: m.HeroTransitionBlock })),
  { ssr: false },
)

export function HeroTransitionClient() {
  return <HeroTransitionBlock />
}
