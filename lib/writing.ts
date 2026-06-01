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

// Real entries only. Do not add fabricated content.
export const writing: WritingEntry[] = []
