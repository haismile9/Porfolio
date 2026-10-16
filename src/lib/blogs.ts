import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from './slugify'

export interface BlogPost {
  id: string
  slug: string
  fileName: string
  title: string
  date: string
  readTime: string
  category: 'react' | 'nextjs' | 'backend' | 'database' | 'architecture'
  tags: string[]
  image?: string
  summary: string
  content: string
}

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs')

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

      return {
        id: matterResult.data.id || fileName,
        // Prefer an explicit frontmatter slug so URLs stay stable when a title is edited
        slug: matterResult.data.slug || slugify(matterResult.data.title || fileName.replace(/\.mdx?$/, '')),
        fileName,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
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
