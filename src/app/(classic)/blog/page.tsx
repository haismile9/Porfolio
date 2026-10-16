import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Technical articles about Next.js, NestJS, microservices, PostgreSQL, Redis and system architecture.',
  path: '/blog',
})

// Content is rendered by BlogClient in the blog layout
export default function BlogPage() {
  return null
}
