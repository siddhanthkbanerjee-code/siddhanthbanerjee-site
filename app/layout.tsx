import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { Cursor } from './components/Cursor'

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

export const metadata: Metadata = {
  title: 'Siddhanth Banerjee',
  description: 'Brand operator at Zomato. Now building AI products at Oxford.',
  openGraph: {
    title: 'Siddhanth Banerjee',
    description: 'Brand operator at Zomato. Now building AI products at Oxford.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=1200&q=85',
        width: 1200,
        height: 630,
      },
    ],
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
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
