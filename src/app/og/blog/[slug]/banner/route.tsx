import { getAllBlogs, getBlogBySlug } from '@/lib/blogs'
import { getCategoryLabel } from '@/lib/categories'
import { renderBannerImage } from '@/lib/og'

// Generated article banner (no title) for posts without a frontmatter image
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }))
}

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) return new Response('Not found', { status: 404 })

  return renderBannerImage({
    label: `~/blog/${blog.category}`,
    topic: getCategoryLabel(blog.category),
    tags: blog.tags,
  })
}
