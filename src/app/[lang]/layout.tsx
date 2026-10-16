import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Source_Serif_4 } from 'next/font/google'
import '@/styles/globals.css'

import { ClassicShell } from '@/components/classic/ClassicShell'
import { ClassicSidebar } from '@/components/classic/ClassicSidebar'
import { isLocale, languageAlternates, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { feedAlternates, siteConfig } from '@/lib/site'

// Serif reading font for the classic pages (has Vietnamese glyphs)
const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
})

interface LangLayoutProps {
  children: React.ReactNode
  params: { lang: string }
}

// Only /vi (served at the root by the middleware) and /en exist
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: LangLayoutProps): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : 'vi') as Locale
  const title = siteConfig.title[lang]
  const description = siteConfig.description[lang]
  const image = siteConfig.ogImage[lang]
  const url = lang === 'vi' ? '/' : '/en'

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    alternates: { canonical: url, languages: languageAlternates('/'), types: feedAlternates },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: getDictionary(lang).ogLocale,
      url,
      title,
      description,
      images: [{ url: image, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: { index: true, follow: true },
  }
}

// Root layout: one per language, so <html lang> matches the page
export default function LangLayout({ children, params }: LangLayoutProps) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang

  return (
    <html lang={getDictionary(lang).htmlLang} className={sourceSerif.variable}>
      <body className="bg-paper text-ink antialiased">
        <ClassicShell lang={lang} sidebar={<ClassicSidebar lang={lang} />}>
          {children}
        </ClassicShell>
      </body>
    </html>
  )
}
