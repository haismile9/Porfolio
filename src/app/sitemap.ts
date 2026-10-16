import type { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blogs'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs()
  const latestPost = blogs.map((blog) => blog.date).sort().pop()

  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/projects`, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: latestPost ? new Date(latestPost) : undefined,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${siteConfig.url}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteConfig.url}/games`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const posts: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...pages, ...posts]
}
