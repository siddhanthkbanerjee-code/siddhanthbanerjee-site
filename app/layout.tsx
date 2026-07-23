import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { Cursor } from './components/Cursor'
import { NavHistoryMark } from './components/NavHistoryMark'
import { Analytics } from '@vercel/analytics/react'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-fraunces',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
})

export const viewport: Viewport = {
  themeColor: '#0E0B12',
}

export const metadata: Metadata = {
  // TODO: switch metadataBase to https://siddhanthbanerjee.com once the domain is connected.
  metadataBase: new URL('https://siddhanthbanerjee-site.vercel.app'),
  title: 'Siddhanth Banerjee | AI Builder and GTM Strategist',
  description:
    'Oxford MBA and operator (Zomato, Epigamia). Five years across marketing, product and strategy, now building in AI go-to-market.',
  openGraph: {
    title: 'Siddhanth Banerjee | AI Builder and GTM Strategist',
    description:
      'Oxford MBA and operator. Five years in marketing, product and strategy, now building in AI go-to-market.',
    url: '/',
    siteName: 'Siddhanth Banerjee',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Siddhanth Banerjee, AI Builder and GTM Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddhanth Banerjee | AI Builder and GTM Strategist',
    description:
      'Oxford MBA and operator. Five years in marketing, product and strategy, now building in AI go-to-market.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Siddhanth Banerjee',
              url: 'https://siddhanthbanerjee-site.vercel.app',
              image: 'https://siddhanthbanerjee-site.vercel.app/og.png',
              jobTitle: 'AI Builder and GTM Strategist',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of Oxford, Said Business School',
              },
              sameAs: ['https://linkedin.com/in/siddhanthbanerjee'],
            }),
          }}
        />
        <NavHistoryMark />
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
