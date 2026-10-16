import { getAllBlogs, getBlogBySlug } from '@/lib/blogs'
import { getCategoryLabel } from '@/lib/categories'
import { renderOgImage } from '@/lib/og'

// Generated share image for each blog post, rendered once at build time
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }))
}

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) return new Response('Not found', { status: 404 })

  return renderOgImage({
    label: `~/blog/${blog.category}`,
    title: blog.title,
    meta: `${blog.date.replace(/-/g, '/')} · ${getCategoryLabel(blog.category)}`,
  })
}
