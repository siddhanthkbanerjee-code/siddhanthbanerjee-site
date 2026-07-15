import type { MetadataRoute } from 'next'
import { projects } from '@/lib/content/projects'
import { papers } from '@/lib/content/papers'
import { writing } from '@/lib/writing'

// TODO: switch BASE to https://siddhanthbanerjee.com once the domain is connected
// (same switch as metadataBase in app/layout.tsx).
const BASE = 'https://siddhanthbanerjee-site.vercel.app'

// Real routes only, generated from the actual content files. /lab is an
// internal preview and stays out. /writing now has real entries (LinkedIn
// Notes), so it and its detail pages are included.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/work`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/profile`, lastModified: now, priority: 0.8 },
    ...(writing.length > 0 ? [{ url: `${BASE}/writing`, lastModified: now, priority: 0.7 }] : []),
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...papers.map((p) => ({
      url: `${BASE}/papers/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...writing.map((w) => ({
      url: `${BASE}/writing/${w.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ]
}
