import { getAllBlogs } from '@/lib/blogs'
import BlogClient from './BlogClient'

export default function BlogPage() {
  const blogs = getAllBlogs()
  return <BlogClient blogs={blogs} />
}
