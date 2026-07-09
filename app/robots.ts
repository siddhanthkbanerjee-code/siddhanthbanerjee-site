import type { MetadataRoute } from 'next'

// TODO: switch the sitemap URL to https://siddhanthbanerjee.com once the domain
// is connected (same switch as app/layout.tsx and app/sitemap.ts).
// /lab is the internal variant explorer, not for search or visitors arriving cold.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/lab' },
    sitemap: 'https://siddhanthbanerjee-site.vercel.app/sitemap.xml',
  }
}
