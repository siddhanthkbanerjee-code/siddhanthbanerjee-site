'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  num: string
  name: string
  description: string
  tech: string[]
  status: string
  statusColor: string
  link: string
  linkLabel: string
}

const projects: Project[] = [
  {
    num: '01 / 03',
    name: 'Kairos',
    description: 'Spotify for live culture. AI-powered event discovery for London.',
    tech: ['NEXT.JS', 'PINECONE', 'CLAUDE API', 'OPENAI'],
    status: 'LIVE',
    statusColor: 'text-tangerine',
    link: '#',
    linkLabel: 'View live',
  },
  {
    num: '02 / 03',
    name: 'Prizerv',
    description: 'An AI-powered psychological self-discovery platform. Currently in alpha.',
    tech: ['NEXT.JS', 'SUPABASE', 'OPENAI'],
    status: 'IN BUILD',
    statusColor: 'text-gold',
    link: '#',
    linkLabel: 'Read more',
  },
  {
    num: '03 / 03',
    name: 'Reserved',
    description: 'Something new. Stay tuned.',
    tech: [],
    status: 'COMING SOON',
    statusColor: 'text-cream-muted',
    link: '#',
    linkLabel: '',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const visual = visualRef.current
    const info = infoRef.current
    if (!card || !visual || !info) return

    gsap.fromTo(
      visual,
      { scale: 1.05 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      }
    )

    const words = info.querySelectorAll('[data-word]')
    gsap.fromTo(
      words,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.7,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-1 md:grid-cols-2 min-h-screen border-t border-border-subtle"
    >
      <div className="relative overflow-hidden bg-surface flex items-center justify-center min-h-[50vh] md:min-h-screen">
        <div ref={visualRef} className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-cream-muted text-sm uppercase tracking-widest">
            {project.name}
          </span>
        </div>
      </div>

      <div ref={infoRef} className="flex flex-col justify-center px-12 py-16">
        <span data-word className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-muted mb-8 block">
          {project.num}
        </span>
        <h2 data-word className="font-display font-light text-cream mb-4" style={{ fontSize: 80 }}>
          {project.name}
        </h2>
        <p data-word className="font-sans text-cream-dim text-lg mb-6 max-w-md">
          {project.description}
        </p>
        {project.tech.length > 0 && (
          <p data-word className="font-mono text-[11px] uppercase tracking-[0.15em] text-cream-muted mb-6">
            {project.tech.join(' · ')}
          </p>
        )}
        <div data-word className="flex items-center gap-6">
          <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${project.statusColor}`}>
            {project.status}
          </span>
          {project.linkLabel && (
            <a
              href={project.link}
              className="font-sans text-cream-dim text-sm hover:text-cream transition-colors duration-[250ms] relative group"
            >
              {project.linkLabel}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cream group-hover:w-full transition-all duration-[250ms]" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Work() {
  return (
    <section className="bg-ink">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  )
}
