import type { MetadataRoute } from 'next'

// /lab is the internal variant explorer, not for search or visitors arriving cold.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/lab' },
    sitemap: 'https://siddhanthbanerjee-site.vercel.app/sitemap.xml',
  }
}
