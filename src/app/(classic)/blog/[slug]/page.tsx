import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs'
import { siteConfig } from '@/lib/site'

interface BlogPostPageProps {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const blog = getBlogBySlug(params.slug)
  if (!blog) return {}

  const url = `/blog/${blog.slug}`
  const images = blog.image ? [{ url: blog.image, alt: blog.title }] : undefined

  return {
    title: blog.title,
    description: blog.summary,
    keywords: blog.tags,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: siteConfig.name,
      locale: 'vi_VN',
      url,
      title: blog.title,
      description: blog.summary,
      publishedTime: blog.date,
      authors: [siteConfig.author],
      tags: blog.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.summary,
      images: blog.image ? [blog.image] : undefined,
    },
  }
}

// Article content is rendered by BlogClient in the blog layout;
// this page only contributes metadata and structured data.
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.summary,
    datePublished: blog.date,
    dateModified: blog.date,
    inLanguage: 'vi',
    keywords: blog.tags.join(', '),
    image: blog.image ? `${siteConfig.url}${blog.image}` : undefined,
    url: `${siteConfig.url}/blog/${blog.slug}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${blog.slug}`,
    author: { '@type': 'Person', name: siteConfig.author, url: siteConfig.url },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
