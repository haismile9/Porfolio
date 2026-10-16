import type { Metadata } from 'next'

export const siteConfig = {
  url: 'https://haismile.dev',
  name: 'Smile - Full-stack Developer',
  author: 'Nguyen Hong Hai',
  description:
    'Portfolio & technical blog of Nguyen Hong Hai (Smile), a Full-stack developer writing about Next.js, NestJS, microservices, databases and system architecture.',
  ogImage: '/images/Porfolio.png',
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
    alternates: { canonical: path },
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
