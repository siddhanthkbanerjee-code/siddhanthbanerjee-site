import dynamic from 'next/dynamic'
import { Hero } from './components/Hero'

const Marquee = dynamic(() => import('./components/Marquee').then((m) => ({ default: m.Marquee })))
const Grid = dynamic(() => import('./components/Grid').then((m) => ({ default: m.Grid })))
const Bet = dynamic(() => import('./components/Bet').then((m) => ({ default: m.Bet })))
const Work = dynamic(() => import('./components/Work').then((m) => ({ default: m.Work })))
const Writing = dynamic(() => import('./components/Writing').then((m) => ({ default: m.Writing })))
const Timeline = dynamic(() => import('./components/Timeline').then((m) => ({ default: m.Timeline })))
const Contact = dynamic(() => import('./components/Contact').then((m) => ({ default: m.Contact })))

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Grid />
      <Bet />
      <Work />
      <Writing />
      <Timeline />
      <Contact />
    </main>
  )
}
