import { getAllBlogs } from '@/lib/blogs'
import { pageMetadata } from '@/lib/site'
import { BlogList, type BlogListItem } from './BlogList'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Technical articles about Next.js, NestJS, microservices, PostgreSQL, Redis and system architecture.',
  path: '/blog',
})

export default function BlogPage() {
  const blogs = getAllBlogs()

  // Newest first; only the fields the list needs are sent to the client
  const posts: BlogListItem[] = blogs
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ id, slug, title, date, category, tags, summary }) => ({ id, slug, title, date, category, tags, summary }))

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">Blog</h1>
        <p className="mt-2 font-bold">Ghi chép kỹ thuật của Smile</p>
        <p className="mt-3">
          Những gì mình học được khi làm việc với Next.js, NestJS, cơ sở dữ liệu và kiến trúc hệ thống. Hiện có{' '}
          {blogs.length} bài viết.
        </p>
      </header>

      <BlogList posts={posts} />
    </>
  )
}
