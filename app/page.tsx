import dynamic from 'next/dynamic'
import { LoadingScreenClient } from './components/LoadingScreenClient'
import { HeroTransitionClient } from './components/HeroTransitionClient'
import { PathTimelineClient } from './components/PathTimelineClient'
import { WorkShowcase } from './components/WorkShowcase'
// Grid.tsx parked -- no current home for photos, Sprint 4+ decision
const Writing = dynamic(() => import('./components/Writing').then((m) => ({ default: m.Writing })))
const Contact = dynamic(() => import('./components/Contact').then((m) => ({ default: m.Contact })))

export default function Home() {
  return (
    <main>
      <LoadingScreenClient />
      <HeroTransitionClient />
      <PathTimelineClient />
      <WorkShowcase />
      <Writing />
      <Contact />
    </main>
  )
}
