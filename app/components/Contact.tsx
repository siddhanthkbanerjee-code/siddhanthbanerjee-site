'use client'

import Image from 'next/image'
import { images } from '@/lib/images'

export function Contact() {
  return (
    <section className="relative bg-ink min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.smile}
          alt="Siddhanth smiling"
          fill
          className="object-cover opacity-30"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-ink/50 z-10" />
      <div className="relative z-20 flex flex-col items-center">
        <h2
          className="font-display font-light text-cream leading-[0.9] mb-8"
          style={{ fontSize: '14vw' }}
        >
          LET&apos;S TALK.
        </h2>
        <a
          href="mailto:siddhanth@siddhanthbanerjee.com"
          className="font-display font-normal text-cream relative group mb-16"
          style={{ fontSize: '4vw' }}
        >
          siddhanth@siddhanthbanerjee.com
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cream group-hover:w-full transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </a>
        <div className="flex gap-8 mb-32">
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/siddhanthbanerjee' },
            { label: 'GitHub', href: 'https://github.com/siddhanthbanerjee' },
            { label: 'Twitter', href: 'https://twitter.com/siddhanthb' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted hover:text-tangerine transition-colors duration-[250ms]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-muted">
          © SIDDHANTH BANERJEE / 2026 / OXFORD
        </p>
      </div>
    </section>
  )
}
