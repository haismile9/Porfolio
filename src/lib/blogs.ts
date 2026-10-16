import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from './slugify'

export interface BlogPost {
  id: string
  slug: string
  fileName: string
  title: string
  // Publish day in Vietnam time ("2026-10-16"), for display, sorting and archives
  date: string
  // Exact publish moment with the Vietnam offset ("2026-10-16T15:21:00+07:00"), for metadata
  publishedAt: string
  // Last substantial edit, from frontmatter `updated` (same format as `date`); publishedAt if never edited
  modifiedAt: string
  readTime: string
  category: 'react' | 'nextjs' | 'backend' | 'database' | 'architecture'
  tags: string[]
  image?: string
  summary: string
  content: string
}

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs')

// Frontmatter `date` is Vietnam local time: "2026-10-16 15:21", or just "2026-10-16"
// (midnight). Without an explicit offset, search engines read a bare date as UTC
// midnight, i.e. 07:00 in Vietnam.
function parsePublishDate(value: string): { date: string; publishedAt: string } {
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}):(\d{2}))?$/)
  if (!match) return { date: value, publishedAt: value }
  const [, date, hours = '00', minutes = '00'] = match
  return { date, publishedAt: `${date}T${hours}:${minutes}:00+07:00` }
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogsDirectory)
  const allBlogsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Parse YAML frontmatter with gray-matter
      const matterResult = matter(fileContents)
      const published = parsePublishDate(String(matterResult.data.date || ''))
      const updated = matterResult.data.updated ? parsePublishDate(String(matterResult.data.updated)) : null

      return {
        id: matterResult.data.id || fileName,
        // Prefer an explicit frontmatter slug so URLs stay stable when a title is edited
        slug: matterResult.data.slug || slugify(matterResult.data.title || fileName.replace(/\.mdx?$/, '')),
        fileName,
        title: matterResult.data.title || '',
        ...published,
        modifiedAt: updated?.publishedAt ?? published.publishedAt,
        readTime: matterResult.data.readTime || '5 min read',
        category: matterResult.data.category || 'nextjs',
        tags: matterResult.data.tags || [],
        image: matterResult.data.image,
        summary: matterResult.data.summary || '',
        content: matterResult.content,
      } as BlogPost
    })

  // Sort blogs by id ascending
  return allBlogsData.sort((a, b) => {
    return Number(a.id) - Number(b.id)
  })
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((blog) => blog.slug === slug)
}

export interface BlogTag {
  slug: string
  label: string
  count: number
}

// Every tag used by a post, with a URL slug ("Next.js" -> "next-js"), most used first
export function getAllTags(): BlogTag[] {
  const tags = new Map<string, BlogTag>()
  getAllBlogs().forEach((blog) => {
    blog.tags.forEach((label) => {
      const slug = slugify(label)
      const tag = tags.get(slug)
      if (tag) tag.count += 1
      else tags.set(slug, { slug, label, count: 1 })
    })
  })
  return Array.from(tags.values()).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export function getBlogsByTag(tagSlug: string): BlogPost[] {
  return getAllBlogs()
    .filter((blog) => blog.tags.some((label) => slugify(label) === tagSlug))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const tagPath = (label: string) => `/blog/tag/${slugify(label)}`
