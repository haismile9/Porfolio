import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  id: string
  slug: string
  fileName: string
  title: string
  date: string
  readTime: string
  category: 'nextjs' | 'backend' | 'database' | 'architecture'
  tags: string[]
  image?: string
  summary: string
  content: string
}

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs')

// Turns a Vietnamese title into a URL slug without diacritics,
// e.g. "Kiến trúc Next.js 14" -> "kien-truc-next-js-14"
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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
