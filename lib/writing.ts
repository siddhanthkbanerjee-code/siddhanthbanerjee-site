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
}

export const writing: WritingEntry[] = [
  {
    id: 1,
    slug: 'why-brand-operators-will-win-the-ai-era',
    title: 'Why Brand Operators Will Win the AI Era',
    category: 'Essay',
    date: '2026-04',
    readTime: '4 min',
    excerpt:
      'Distribution has always beaten technology. In the AI era, the winners are the people who can get it in front of the right humans at exactly the right moment.',
    body: `
<p>Every technology wave produces the same argument: this time the technology is so powerful that it will reach customers on its own. Search made it possible to find anything. Social media made it possible to reach everyone. Generative AI makes it possible to produce anything. And each time, the argument is wrong in roughly the same way.</p>

<p>Distribution does not become less important when production becomes cheaper. It becomes more important, because the delta between what can be made and what can actually reach and hold a customer\'s attention widens. The problem shifts from making to finding. From creating to earning trust. From capability to adoption.</p>

<p>This is the position we are in now with AI. The models can do remarkable things. The question of who gets to close the gap between what a model can do and what a customer will actually use, pay for, and keep coming back to is entirely open. That gap is a brand and go-to-market problem, not a technical one.</p>

<h2>What Brand Operators Actually Do</h2>

<p>Brand operators are not the people who make the product. They are the people who understand what the product means to the customer, who can translate that into language and experience, and who can hold that meaning stable across markets, channels, and time. They operate at the intersection of customer insight and product positioning.</p>

<p>In the AI era, that function becomes the scarce input. Not because the technical inputs become easy, but because the human inputs become the bottleneck. A model can generate ten thousand versions of a product description. A brand operator is the person who knows which one is actually true, which one a customer will believe, and which one will not age badly in six months.</p>

<p>That judgment is not teachable quickly. It is accumulated through years of watching what actually works with real customers, absorbing feedback that does not arrive in a dataset, and developing a kind of taste that is inseparable from market experience. This is not a skill that scales by training a larger model. It is a human skill that becomes more valuable when production capacity becomes infinite.</p>

<h2>Distribution as the Constraint</h2>

<p>The AI companies that win in the next five years will not necessarily be the ones with the best models. The models are converging fast enough that capability differentials will shrink. The companies that win will be the ones that crack distribution into specific verticals, specific buyer types, specific use cases where trust has been built and the adoption barriers have been cleared.</p>

<p>Clearing adoption barriers is brand and GTM work. Understanding why a specific buyer is reluctant, what they need to see before they will commit, what adjacent products they already trust and what co-positioning would lower the risk perception, how to build a reference customer base in a segment that will then pull in the next customer. This is the work that does not have a model for it yet.</p>

<p>Distribution has always beaten technology because technology is replicable and distribution is earned. In an era where the technology is especially replicable, distribution is especially valuable. The people who know how to earn it are, right now, the most undervalued inputs in the AI economy.</p>
`,
  },
  {
    id: 2,
    slug: 'what-zomato-taught-me-about-speed',
    title: 'What Zomato Taught Me About Speed',
    category: 'Essay',
    date: '2026-03',
    readTime: '3 min',
    excerpt:
      'Moving fast at a hyper-growth company is not the same as moving recklessly. The discipline is knowing when the decision is reversible.',
    body: `
<p>Zomato moves faster than almost any organisation I have been in before or since. Campaigns that would take six weeks at an agency took three days. Product tests went live the same week they were conceived. The cultural expectation was that if you had not shipped something by Friday that you did not have on Monday, you had a slow week.</p>

<p>It would be easy to describe this as a culture of recklessness. It is not. The speed is disciplined in a way that is not immediately obvious from the outside.</p>

<h2>The Reversibility Test</h2>

<p>The discipline I watched consistently applied at Zomato was a reversibility test. Before any decision was made, often implicitly rather than explicitly, the question being answered was: how hard is this to undo?</p>

<p>If the answer was "very hard," the decision slowed down. The speed was not applied to irreversible things. It was applied relentlessly to reversible things, because the cost of moving fast on something reversible is very low. The worst outcome of a bad reversible decision is a fast recovery. The worst outcome of a bad irreversible decision is a permanent constraint on what the organisation can do next.</p>

<p>At Zomato\'s scale, most marketing decisions are reversible. A creative direction that does not land can be changed in a week. An A/B test that fails teaches you something. A campaign that falls flat does not prevent you from running a better campaign. The fast-moving culture works because the organisation has correctly identified that most of what it does falls into this category.</p>

<h2>Where Speed Does Not Apply</h2>

<p>What I also observed was where the speed did not apply. Decisions about brand positioning at the category level moved slowly and carefully. Decisions about which businesses to enter or exit moved slowly. The exceptions were not random. They were consistently the decisions that, once made, constrained future options. The irreversible things got the time they warranted.</p>

<p>This is the lesson I try to carry into every project since. Speed is not a virtue in itself. It is a tool with appropriate and inappropriate applications. The discipline is developing a fast and reliable sense of which bucket a decision falls into, and then moving at the right speed for that bucket.</p>

<p>The mistake most organisations make is not that they move too fast. It is that they apply the same pace to every decision regardless of its reversibility, either treating everything as urgent or treating everything as weighty. The organisations that are genuinely fast are the ones that have sorted this out, often without naming the framework explicitly, and built a culture that applies different speeds to different decision types as a matter of instinct rather than process.</p>
`,
  },
]
