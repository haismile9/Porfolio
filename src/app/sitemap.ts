import type { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blogs'
import { siteConfig } from '@/lib/site'
import { languageAlternates, locales, localePath } from '@/i18n/config'

const absolute = (path: string) => `${siteConfig.url}${path === '/' ? '' : path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs()
  const latestPost = blogs.map((blog) => blog.date).sort().pop()

  const pageDefs: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number; lastModified?: Date }[] = [
    { path: '/', changeFrequency: 'monthly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.9, lastModified: latestPost ? new Date(latestPost) : undefined },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/games', changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Every page in both languages, each pointing at its translations
  const pages: MetadataRoute.Sitemap = pageDefs.flatMap(({ path, ...rest }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absolute(href)])
    )
    return locales.map((lang) => ({
      url: absolute(localePath(lang, path)),
      alternates: { languages },
      ...rest,
    }))
  })

  // Posts are Vietnamese only
  const posts: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...pages, ...posts]
}
