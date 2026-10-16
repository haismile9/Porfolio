import type { Metadata } from 'next'
import { getAllBlogs } from '@/lib/blogs'
import { pageMetadata } from '@/lib/site'
import type { Locale } from '@/i18n/config'
import { BlogList, type BlogListItem } from './BlogList'

const copy = {
  vi: {
    title: 'Blog',
    description:
      'Ghi chép lập trình cho người mới bắt đầu: Next.js, NestJS, PostgreSQL, Redis và kiến trúc hệ thống, giải thích dễ hiểu kèm ví dụ.',
    subtitle: 'Ghi chép lập trình cho người mới bắt đầu',
    intro: 'Những gì mình học được khi đi làm, viết lại theo cách mình ước có người giải thích cho mình hồi mới bắt đầu.',
  },
  en: {
    title: 'Blog',
    description:
      'Beginner-friendly programming notes (in Vietnamese) on Next.js, NestJS, PostgreSQL, Redis and system architecture.',
    subtitle: 'Programming notes for beginners',
    intro:
      "What I've learned on the job, rewritten the way I wish someone had explained it to me when I was starting out. The posts are written in Vietnamese.",
  },
} satisfies Record<Locale, unknown>

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = copy[params.lang]
  return pageMetadata({ title: t.title, description: t.description, path: '/blog', lang: params.lang })
}

export default function BlogPage({ params }: { params: { lang: Locale } }) {
  const t = copy[params.lang]
  const blogs = getAllBlogs()

  // Newest first; only the fields the list needs are sent to the client
  const posts: BlogListItem[] = blogs
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ id, slug, title, date, category, tags, summary }) => ({ id, slug, title, date, category, tags, summary }))

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">{t.title}</h1>
        <p className="mt-2 font-bold">{t.subtitle}</p>
        <p className="mt-3">{t.intro}</p>
      </header>

      <BlogList posts={posts} lang={params.lang} />
    </>
  )
}
