import { getAllBlogs } from '@/lib/blogs'
import BlogClient from './BlogClient'

// The blog shell lives in the layout so the sidebar keeps its state
// while navigating between /blog and /blog/[slug].
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogs = getAllBlogs()
  return (
    <>
      <BlogClient blogs={blogs} />
      {children}
    </>
  )
}
