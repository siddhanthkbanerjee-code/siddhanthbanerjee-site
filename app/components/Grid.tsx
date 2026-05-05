'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '@/lib/images'

const gridItems = [
  { src: images.drumming, word: 'MUSICIAN', alt: 'Drumming' },
  { src: images.walking, word: 'WALKER', alt: 'Walking' },
  { src: images.faceCrop, word: 'THINKER', alt: 'Portrait' },
  { src: images.desk, word: 'BUILDER', alt: 'At desk' },
]

function GridItem({ src, word, alt }: { src: string; word: string; alt: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: '3/4' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-full h-full"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute bottom-6 left-6 font-display font-light text-cream text-4xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Grid() {
  return (
    <section className="bg-ink py-8 px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gridItems.map((item) => (
          <GridItem key={item.word} {...item} />
        ))}
      </div>
    </section>
  )
}
