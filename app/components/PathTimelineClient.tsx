'use client'

import dynamic from 'next/dynamic'

const PathTimeline = dynamic(
  () => import('./PathTimeline').then((m) => ({ default: m.PathTimeline })),
  { ssr: false },
)

export function PathTimelineClient() {
  return <PathTimeline />
}
