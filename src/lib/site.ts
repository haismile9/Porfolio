import type { Metadata } from 'next'

export const siteConfig = {
  url: 'https://haismile.dev',
  // Short brand name, used as the "| Smile" suffix on page titles
  name: 'Smile',
  // Full title shown for the home page in search results
  title: 'Smile – Trên con đường trở thành một lập trình viên tốt',
  author: 'Nguyen Hong Hai',
  description:
    'Blog của Smile (Nguyễn Hồng Hải), một lập trình viên trẻ đang học mỗi ngày để code tốt hơn. Ghi chép thật về Next.js, NestJS, PostgreSQL và Redis.',
  ogImage: '/og',
}

// RSS feed autodiscovery, repeated on every page because alternates isn't merged
export const feedAlternates = {
  'application/rss+xml': [{ url: '/feed.xml', title: `${siteConfig.name} · Blog` }],
}

// Next.js replaces (not merges) nested metadata objects such as openGraph,
// so every page builds its full Open Graph / Twitter data through this helper.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: feedAlternates },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'vi_VN',
      url: path,
      title,
      description,
      images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}
