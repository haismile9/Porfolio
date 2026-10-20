import type { Metadata } from 'next'
import { languageAlternates, localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const siteConfig = {
  url: 'https://haismile.dev',
  // Short brand name, used as the "| haismile" suffix on page titles
  name: 'haismile',
  author: 'Nguyen Hong Hai',
  // Full title and description shown for the home page in search results
  title: {
    vi: 'haismile.dev – Trên con đường trở thành một lập trình viên giỏi',
    en: 'haismile.dev – On the way to becoming a good developer',
  } satisfies Record<Locale, string>,
  description: {
    vi: 'Blog của haismile (Nguyễn Hồng Hải), một lập trình viên trẻ đang học mỗi ngày để code tốt hơn. Ghi chép thật về Next.js, NestJS, PostgreSQL và Redis.',
    en: 'Portfolio of haismile (Nguyen Hong Hai), a young developer in Vietnam learning every day to write better code, with beginner-friendly notes on Next.js, NestJS, PostgreSQL and Redis.',
  } satisfies Record<Locale, string>,
  ogImage: { vi: '/og', en: '/og/en' } satisfies Record<Locale, string>,
}

// RSS feed autodiscovery, repeated on every page because alternates isn't merged
export const feedAlternates = {
  'application/rss+xml': [{ url: '/feed.xml', title: `${siteConfig.name} · Blog` }],
}

// Next.js replaces (not merges) nested metadata objects such as openGraph,
// so every page builds its full Open Graph / Twitter data through this helper.
// `path` is the language-neutral path ("/about"); hreflang links point to both versions.
export function pageMetadata({
  title,
  description,
  path,
  lang,
}: {
  title: string
  description: string
  path: string
  lang: Locale
}): Metadata {
  const url = localePath(lang, path)
  const image = siteConfig.ogImage[lang]
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path), types: feedAlternates },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: getDictionary(lang).ogLocale,
      url,
      title,
      description,
      images: [{ url: image, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
