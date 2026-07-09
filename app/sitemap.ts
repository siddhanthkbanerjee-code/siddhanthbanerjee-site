import type { MetadataRoute } from 'next'
import { projects } from '@/lib/content/projects'
import { papers } from '@/lib/content/papers'

// TODO: switch BASE to https://siddhanthbanerjee.com once the domain is connected
// (same switch as metadataBase in app/layout.tsx).
const BASE = 'https://siddhanthbanerjee-site.vercel.app'

// Real routes only, generated from the actual content files. /writing is
// deliberately excluded until real essays exist; /lab is an internal preview.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/work`, lastModified: now, priority: 0.8 },
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
  ]
}
