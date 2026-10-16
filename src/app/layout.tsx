import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import '@/styles/globals.css'

import { feedAlternates, siteConfig } from '@/lib/site'

// Serif reading font for the classic pages (has Vietnamese glyphs)
const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  alternates: { canonical: '/', types: feedAlternates },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'vi_VN',
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={sourceSerif.variable}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  )
}
