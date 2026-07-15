import dynamic from 'next/dynamic'
import { LoadingScreenClient } from './components/LoadingScreenClient'
import { HeroTransitionClient } from './components/HeroTransitionClient'
import { ProfileConvergence } from './components/ProfileConvergence'
import { WorkShowcase } from './components/WorkShowcase'
import { WritingSection } from './components/WritingSection'
import { SectionNav } from './components/SectionNav'
// Grid.tsx parked -- no current home for photos, Sprint 4+ decision
const Contact = dynamic(() => import('./components/Contact').then((m) => ({ default: m.Contact })))

export default function Home() {
  return (
    <main>
      <LoadingScreenClient />
      <HeroTransitionClient />
      <SectionNav />
      <ProfileConvergence />
      <WorkShowcase />
      <WritingSection />
      <Contact />
    </main>
  )
}
