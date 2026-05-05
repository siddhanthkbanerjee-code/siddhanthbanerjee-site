'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { writing, WritingCategory, WritingEntry } from '@/lib/writing'

const categories: ('All' | WritingCategory)[] = ['All', 'Essay', 'Paper', 'Note']

function WritingRow({ entry }: { entry: WritingEntry }) {
  return (
    <motion.a
      href={`/writing/${entry.slug}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="block border-t border-border-subtle py-8 group cursor-none"
    >
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <h3
            className="font-display font-normal text-cream group-hover:text-tangerine transition-colors duration-[250ms]"
            style={{ fontSize: 32 }}
          >
            {entry.title}
          </h3>
          <p className="font-sans text-cream-dim text-base mt-2 max-w-2xl">
            {entry.excerpt}
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted">
            {entry.date}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted mt-1">
            {entry.readTime}
          </p>
        </div>
      </div>
    </motion.a>
  )
}

export function Writing() {
  const [active, setActive] = useState<'All' | WritingCategory>('All')
  const filtered = active === 'All' ? writing : writing.filter((e) => e.category === active)

  return (
    <section className="bg-ink py-32 px-8 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-light text-cream mb-12" style={{ fontSize: 80 }}>
          Writing & Papers
        </h2>
        <div className="flex gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-[250ms] ${
                active === cat
                  ? 'border-tangerine text-tangerine'
                  : 'border-border-subtle text-cream-muted hover:text-cream hover:border-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <AnimatePresence mode="popLayout">
          {filtered.map((entry) => (
            <WritingRow key={entry.id} entry={entry} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
