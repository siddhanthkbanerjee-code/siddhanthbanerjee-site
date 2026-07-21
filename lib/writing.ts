export type WritingCategory = 'Essay' | 'Note'

export interface WritingEntry {
  id: number
  slug: string
  title: string
  category: WritingCategory
  date: string
  readTime: string
  excerpt: string
  body: string // HTML
  sourceUrl?: string // where a Note originated (e.g. the LinkedIn post), rendered as a "read on LinkedIn" link
  sourceLabel?: string // link text, defaults to "Read on LinkedIn" if sourceUrl is set and this is omitted
  image?: string // screenshot of the post (served from /public), shown as the Opinion Pieces card visual on home
}

// Real entries only. Do not add fabricated content.
export const writing: WritingEntry[] = [
  {
    id: 1,
    slug: 'the-technology-is-not-the-bottleneck',
    title: 'The Technology Is Not the Bottleneck',
    category: 'Note',
    date: '2026-06-15',
    readTime: '3 min',
    excerpt:
      'When factories first electrified, they kept the old layout and just swapped the engine, and productivity barely moved for twenty years. Frontier AI labs are now making the same move in reverse: building forward-deployed engineering teams to redesign the workflows around their models, which is what consulting has sold for thirty years. History keeps teaching the same lesson: it is the organisation, not the technology, that is usually the bottleneck.',
    body: `
<p>When factories first electrified, they tore out steam engines and replaced them with similarly sized electric motors. Everything else remained unchanged and strangely, productivity barely moved. This stayed the status quo for 20 years.</p>
<p>Then came Ford, who redesigned a factory from scratch with the assumption that electricity would be everywhere, in every element. The result was the moving assembly line, the Ford Model T, and 12.5 hours of assembly dropping to 93 minutes.</p>
<p>A similar thing happened with RFID a century later. The technology took almost 20 years to become mainstream despite being introduced in 2003.</p>
<p>Is history showing us a repeated lesson that technologies are not the bottleneck, but organisations are?</p>
<p>MIT reports that despite $40 billion in funding, 95% of generative AI pilots show no measurable results. MIT's own diagnosis: the problem is not the models, but the organisations using them.</p>
<p>What's even more interesting is that frontier AI companies noticed this first. They are spending billions building forward deployed engineering teams to sit inside customer organisations. Not to fine tune models, but to redesign the workflows around them. That is, almost word for word, what consulting firms have been selling for the last 30 years.</p>
<p>Are frontier labs becoming consulting companies?</p>
<p>If AI models are increasingly bundled with engineering deployment teams, the consulting industry's traditional pitch of providing smart people for the job might have some serious competition.</p>
<p>There are several races being run. Enterprises racing to reorient around AI. Frontier AI companies racing to become profitable. Consulting companies racing to remain relevant.</p>
<p>Chances are, whoever loses these races will end up getting advised by whoever wins them.</p>
`,
    sourceUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7467968570077974528/',
    image: '/opinion/the-technology-is-not-the-bottleneck.png',
  },
  {
    id: 2,
    slug: 'the-three-ai-windows',
    title: 'The Three AI Windows',
    category: 'Note',
    date: '2026-05-20',
    readTime: '4 min',
    excerpt:
      'The panic that "the AI window is closing" is tuned to the wrong window. There are at least three: foundation models (already closed), AI-native applications (crowded and loud), and AI applied to the unglamorous industries Silicon Valley ignores (barely cracked open). The people quietly getting rich are mostly building in that third window, and the urgency of the first two is not theirs.',
    body: `
<p>Of late, I have had some conversations with people whose bank balances I would quietly trade for.</p>
<p>Older folks, unfailingly humble, and generous with how they got there. None of them were in tech. Their work sounds like car showrooms, spice trading, and chemical additives for industries I cannot pretend to understand. Businesses that have grown quietly for twenty, thirty years, while the rest of us were busy reading about whatever came out yesterday.</p>
<p>I have been thinking about those conversations against the steady drumbeat of my social media feed, where some version of "the AI window is closing", "you have to move now" shows up twice a day.</p>
<p>It is true. It is also a bit misleading.</p>
<p>There isn't one AI window. There are at least three, and most of the panic is tuned to the wrong one.</p>
<p>Window 1 is the foundation model layer, run by Anthropic and the likes. If you weren't in this race two years ago, you aren't getting in now.</p>
<p>Window 2 is the AI-native application layer. Cursor, Perplexity, Harvey, etc. A very crowded and currently hot category, where most of the movement and most of the noise is.</p>
<p>Window 3 is AI applied to the industries currently too unglamorous for the Valley to notice. Regional logistics. Mid-market manufacturing. Vertical software for seemingly mundane categories. This window is barely cracked open, and could stay that way for a long time.</p>
<p>The numbers on this are striking. Over 90% of small and mid-sized industrial businesses have no AI in place at all and only about a quarter of family businesses in India treat digital and new tech as a real priority.</p>
<p>The people I had coffee with are not racing anyone. They have been building slowly so far, in categories that slip under the radar, and the wealth has quietly followed. They did all this before AI existed, and the next generation of them, I suspect, will do the same with AI as a quiet operational lever rather than a headline. A spice trader running better demand forecasts on a Thursday afternoon. A dealership where the customer calls finally stop waking someone's cousin at midnight.</p>
<p>None of it will look like the AI you scroll past, and that is rather the point.</p>
<p>The story of the next decade is going to be less about models and more about operators, using these models to re-invent industries no one really talks about. Quite a few of these operators, going by my coffees, are doing very nicely already.</p>
<p>The people telling you to hurry are mostly building in Windows 1 and 2, where speed is the whole game. If your edge is operational depth in a category Silicon Valley finds boring, their urgency is not your urgency.</p>
`,
    sourceUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7456266241176113152/',
    image: '/opinion/the-three-ai-windows.png',
  },
]
