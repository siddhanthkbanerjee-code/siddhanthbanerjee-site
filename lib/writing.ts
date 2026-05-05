export type WritingCategory = 'Essay' | 'Paper' | 'Note'

export interface WritingEntry {
  id: number
  slug: string
  title: string
  category: WritingCategory
  date: string
  readTime: string
  excerpt: string
}

export const writing: WritingEntry[] = [
  {
    id: 1,
    slug: 'why-brand-operators-will-win-the-ai-era',
    title: 'Why Brand Operators Will Win the AI Era',
    category: 'Essay',
    date: '2026-04',
    readTime: '4 min',
    excerpt: 'Distribution has always beaten technology. In the AI era, the winners are the people who can get it in front of the right humans at exactly the right moment.',
  },
  {
    id: 2,
    slug: 'what-zomato-taught-me-about-speed',
    title: 'What Zomato Taught Me About Speed',
    category: 'Essay',
    date: '2026-03',
    readTime: '3 min',
    excerpt: 'Moving fast at a hyper-growth company is not the same as moving recklessly. The discipline is knowing when the decision is reversible.',
  },
  {
    id: 3,
    slug: 'ai-adoption-curves-and-organisational-inertia',
    title: 'AI Adoption Curves and Organisational Inertia',
    category: 'Paper',
    date: '2026-02',
    readTime: '12 min',
    excerpt: 'An analysis of enterprise AI adoption patterns across 40 firms, identifying the structural factors that predict whether AI tools become embedded or abandoned.',
  },
  {
    id: 4,
    slug: 'the-brand-as-algorithm',
    title: 'The Brand as Algorithm: Consistency, Variation, and the Attention Economy',
    category: 'Paper',
    date: '2026-01',
    readTime: '15 min',
    excerpt: 'How brands in attention-constrained environments can leverage algorithmic thinking to achieve consistent recall without sacrificing creative novelty.',
  },
  {
    id: 5,
    slug: 'platform-economics-of-live-culture',
    title: 'Platform Economics of Live Culture Discovery',
    category: 'Paper',
    date: '2025-12',
    readTime: '10 min',
    excerpt: 'An examination of the market structure and network effects in live event discovery platforms, with a case study on recommendation system design.',
  },
  {
    id: 6,
    slug: 'generative-ai-in-consumer-marketing',
    title: 'Generative AI in Consumer Marketing: Early Evidence',
    category: 'Paper',
    date: '2025-11',
    readTime: '14 min',
    excerpt: 'Empirical analysis of three generative AI marketing deployments at scale, measuring incremental lift against human-produced creative.',
  },
]
