import { getAllBlogs } from '@/lib/blogs'
import { pageMetadata } from '@/lib/site'
import { BlogList, type BlogListItem } from './BlogList'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Ghi chép lập trình cho người mới bắt đầu: Next.js, NestJS, PostgreSQL, Redis và kiến trúc hệ thống, giải thích dễ hiểu kèm ví dụ.',
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
        <p className="mt-2 font-bold">Ghi chép lập trình cho người mới bắt đầu</p>
        <p className="mt-3">
          Những gì mình học được khi làm việc với Next.js, NestJS và cơ sở dữ liệu, viết lại theo cách mình ước
          được giải thích khi mới bắt đầu. Hiện có {blogs.length} bài viết.
        </p>
      </header>

      <BlogList posts={posts} />
    </>
  )
}
