import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBlogs, getBlogBySlug, tagPath, type BlogPost } from '@/lib/blogs'
import { getCategoryLabel } from '@/lib/categories'
import { renderMarkdown } from '@/lib/markdown'
import { feedAlternates, siteConfig } from '@/lib/site'
import { ArticleSidebar } from './ArticleSidebar'
import { Comments } from './Comments'
import { CopyCodeButtons } from './CopyCodeButtons'


// A post's own frontmatter image wins; otherwise use the generated /og/blog/[slug] card
const getShareImage = (blog: BlogPost) => blog.image ?? `/og/blog/${blog.slug}`

interface BlogPostPageProps {
  params: { lang: string; slug: string }
}

export const dynamicParams = false

// Posts are Vietnamese only: generate them under /vi (served at /blog/...);
// /en/blog/... redirects to the Vietnamese post in next.config.js
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== 'vi') return []
  return getAllBlogs().map((blog) => ({ slug: blog.slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const blog = getBlogBySlug(params.slug)
  if (!blog) return {}

  const url = `/blog/${blog.slug}`
  const shareImage = getShareImage(blog)
  const images = [{ url: shareImage, width: 1200, height: 630, alt: blog.title }]

  return {
    title: blog.title,
    description: blog.summary,
    keywords: blog.tags,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    alternates: { canonical: url, types: feedAlternates },
    openGraph: {
      type: 'article',
      siteName: siteConfig.name,
      locale: 'vi_VN',
      url,
      title: blog.title,
      description: blog.summary,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.modifiedAt,
      authors: [siteConfig.author],
      tags: blog.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.summary,
      images: [shareImage],
    },
  }
}

const formatDate = (date: string) => date.replace(/-/g, '/')

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) notFound()

  const { html, toc } = await renderMarkdown(blog.content)

  // Newest first, for prev/next links and related posts
  const sortedBlogs = getAllBlogs().sort((a, b) => b.date.localeCompare(a.date))
  const index = sortedBlogs.findIndex((b) => b.id === blog.id)
  const newerPost = index > 0 ? sortedBlogs[index - 1] : null
  const olderPost = index < sortedBlogs.length - 1 ? sortedBlogs[index + 1] : null

  // Related posts: same topic counts double, plus one point per shared tag
  const relatedPosts = sortedBlogs
    .filter((b) => b.id !== blog.id)
    .map((b) => ({
      post: { slug: b.slug, title: b.title },
      score: (b.category === blog.category ? 2 : 0) + b.tags.filter((t) => blog.tags.includes(t)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.summary,
    datePublished: blog.publishedAt,
    dateModified: blog.modifiedAt,
    inLanguage: 'vi',
    keywords: blog.tags.join(', '),
    image: `${siteConfig.url}${getShareImage(blog)}`,
    url: `${siteConfig.url}/blog/${blog.slug}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${blog.slug}`,
    author: { '@type': 'Person', name: siteConfig.author, url: siteConfig.url },
  }

  return (
    <article className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleSidebar toc={toc} relatedPosts={relatedPosts} />

      <Link href="/blog" className="font-fira text-sm text-classic-accent hover:underline">
        ← ~/blog
      </Link>

      {/* Featured banner (Twenty Fourteen style): the post's own image, or a generated topic banner */}
      <div className="relative mt-6 aspect-[2/1] w-full overflow-hidden border border-paper-border bg-paper-code">
        <Image
          src={blog.image ?? `/og/blog/${blog.slug}/banner`}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 672px, (min-width: 768px) 720px, 100vw"
          className="object-cover"
          unoptimized={!blog.image}
        />
      </div>

      <header className="mt-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{blog.title}</h1>
        <p className="mt-3 font-fira text-[13px] text-ink-muted">
          <time dateTime={blog.publishedAt}>{formatDate(blog.date)}</time>
          {blog.modifiedAt !== blog.publishedAt && (
            <>
              {' · updated '}
              <time dateTime={blog.modifiedAt}>{formatDate(blog.modifiedAt.slice(0, 10))}</time>
            </>
          )}
          {' · '}
          {blog.readTime}
          {' · '}
          <Link href={`/blog?category=${blog.category}`} className="hover:text-classic-accent hover:underline">
            {getCategoryLabel(blog.category)}
          </Link>
        </p>
        <p className="mt-5 italic text-ink-muted">{blog.summary}</p>
      </header>

      <div id="article-body" className="prose-classic" dangerouslySetInnerHTML={{ __html: html }} />
      <CopyCodeButtons containerId="article-body" />

      <footer className="mt-12 border-t border-paper-border pt-6 text-base">
        <p className="text-ink-muted">
          Tags:{' '}
          {blog.tags.map((tag, i) => (
            <span key={tag}>
              {i > 0 && ', '}
              <Link href={tagPath(tag)} className="text-classic-accent hover:underline">
                #{tag}
              </Link>
            </span>
          ))}
        </p>

        {(newerPost || olderPost) && (
          <nav className="mt-6 grid gap-4 sm:grid-cols-2">
            {olderPost ? (
              <Link href={`/blog/${olderPost.slug}`} className="group">
                <span className="block font-fira text-xs text-ink-muted">← Bài cũ hơn</span>
                <span className="text-classic-accent group-hover:underline">{olderPost.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newerPost && (
              <Link href={`/blog/${newerPost.slug}`} className="group sm:text-right">
                <span className="block font-fira text-xs text-ink-muted">Bài mới hơn →</span>
                <span className="text-classic-accent group-hover:underline">{newerPost.title}</span>
              </Link>
            )}
          </nav>
        )}
      </footer>

      <Comments />
    </article>
  )
}
