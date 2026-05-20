import dynamic from 'next/dynamic'
import { Hero } from './components/Hero'
import { WritingTeaser } from './components/WritingTeaser'
import { LoadingScreenClient } from './components/LoadingScreenClient'
import { MorphClient } from './components/MorphClient'
const Marquee = dynamic(() => import('./components/Marquee').then((m) => ({ default: m.Marquee })))
const Grid = dynamic(() => import('./components/Grid').then((m) => ({ default: m.Grid })))
const Work = dynamic(() => import('./components/Work').then((m) => ({ default: m.Work })))
const Writing = dynamic(() => import('./components/Writing').then((m) => ({ default: m.Writing })))
const Timeline = dynamic(() => import('./components/Timeline').then((m) => ({ default: m.Timeline })))
const Contact = dynamic(() => import('./components/Contact').then((m) => ({ default: m.Contact })))

export default function Home() {
  return (
    <main>
      <LoadingScreenClient />
      <Hero />
      <MorphClient />
      <Marquee />
      <Grid />
      <Work />
      <Writing />
      <Timeline />
      <WritingTeaser />
      <Contact />
    </main>
  )
}
