import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTags, getBlogsByTag } from '@/lib/blogs'
import { feedAlternates, siteConfig } from '@/lib/site'

interface TagPageProps {
  params: { lang: string; tag: string }
}

// Posts are Vietnamese only, so tag pages exist only at /blog/tag/... (vi);
// /en/blog/tag/... redirects there in next.config.js
export const dynamicParams = false

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'vi') return []
  return getAllTags().map((tag) => ({ tag: tag.slug }))
}

const findTag = (slug: string) => getAllTags().find((tag) => tag.slug === slug)

export function generateMetadata({ params }: TagPageProps): Metadata {
  const tag = findTag(params.tag)
  if (!tag) return {}

  const title = `Bài viết về ${tag.label}`
  const description = `${tag.count} bài viết về ${tag.label} cho người mới bắt đầu, giải thích dễ hiểu kèm ví dụ.`
  const url = `/blog/tag/${tag.slug}`
  return {
    title,
    description,
    alternates: { canonical: url, types: feedAlternates },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'vi_VN',
      url,
      title,
      description,
      images: [{ url: siteConfig.ogImage.vi, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [siteConfig.ogImage.vi] },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = findTag(params.tag)
  if (!tag) notFound()

  const posts = getBlogsByTag(tag.slug)
  const otherTags = getAllTags().filter((t) => t.slug !== tag.slug)

  return (
    <>
      <Link href="/blog" className="font-fira text-sm text-classic-accent hover:underline">
        ← ~/blog
      </Link>

      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-bold leading-tight">#{tag.label}</h1>
        <p className="mt-2 font-bold">
          {tag.count} bài viết có gắn tag {tag.label}
        </p>
      </header>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="sm:flex sm:gap-4">
            <time dateTime={post.date} className="block shrink-0 pt-1 font-fira text-sm text-ink-muted sm:w-24">
              {post.date.replace(/-/g, '/')}
            </time>
            <div>
              <Link href={`/blog/${post.slug}`} className="text-xl font-bold leading-snug text-classic-accent hover:underline">
                {post.title}
              </Link>
              <p className="mt-1 text-base text-ink-muted">{post.summary}</p>
            </div>
          </li>
        ))}
      </ul>

      {otherTags.length > 0 && (
        <section className="mt-12 border-t border-paper-border pt-6">
          <h2 className="mb-3 text-xl font-bold">Tag khác</h2>
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-base">
            {otherTags.map((t) => (
              <Link key={t.slug} href={`/blog/tag/${t.slug}`} className="text-classic-accent hover:underline">
                #{t.label} <span className="text-ink-muted">({t.count})</span>
              </Link>
            ))}
          </p>
        </section>
      )}
    </>
  )
}
