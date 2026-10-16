'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { BlogPost } from '@/lib/blogs'
import { categories } from '@/lib/categories'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export type BlogListItem = Pick<BlogPost, 'id' | 'slug' | 'title' | 'date' | 'category' | 'tags' | 'summary'>

interface Filters {
  category: string
  month: string | null
  query: string
}

const formatDate = (date: string) => date.replace(/-/g, '/')

// Reads ?category=, ?month= and ?q= from the URL. Kept in its own Suspense boundary so
// useSearchParams doesn't opt the whole list out of static rendering.
function UrlFilters({ onChange }: { onChange: (filters: Filters) => void }) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const month = searchParams.get('month')
  const query = searchParams.get('q') ?? ''
  useEffect(() => {
    onChange({ category, month, query })
  }, [category, month, query, onChange])
  return null
}

export function BlogList({ posts, lang }: { posts: BlogListItem[]; lang: Locale }) {
  const t = getDictionary(lang).blog
  const blogPath = localePath(lang, '/blog')
  const [filters, setFilters] = useState<Filters>({ category: 'all', month: null, query: '' })
  const [searchQuery, setSearchQuery] = useState('')

  // A tag link (/blog?q=Redis) pre-fills the search box
  useEffect(() => {
    setSearchQuery(filters.query)
  }, [filters.query])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return posts.filter((post) => {
      if (filters.category !== 'all' && post.category !== filters.category) return false
      if (filters.month && !post.date.startsWith(filters.month)) return false
      if (!query) return true
      return (
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query))
      )
    })
  }, [posts, filters, searchQuery])

  const postsByYear = useMemo(() => {
    const groups: { year: string; posts: BlogListItem[] }[] = []
    filteredPosts.forEach((post) => {
      const year = post.date.slice(0, 4)
      const group = groups.find((g) => g.year === year)
      if (group) group.posts.push(post)
      else groups.push({ year, posts: [post] })
    })
    return groups
  }, [filteredPosts])

  return (
    <>
      <Suspense fallback={null}>
        <UrlFilters onChange={setFilters} />
      </Suspense>

      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchLabel}
        className="w-full border border-paper-border bg-white px-3 py-2 text-base placeholder:text-ink-muted/70 focus:outline-none focus:border-classic-accent"
      />

      <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-base text-ink-muted">
        <span>{t.topicLabel}</span>
        {[{ id: 'all', label: t.allTopics }, ...categories].map((cat) =>
          filters.category === cat.id && !filters.month ? (
            <span key={cat.id} className="font-bold text-ink">
              {cat.label}
            </span>
          ) : (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? blogPath : `${blogPath}?category=${cat.id}`}
              className="text-classic-accent hover:underline"
            >
              {cat.label}
            </Link>
          )
        )}
      </p>

      {filters.month && (
        <p className="mt-2 text-base text-ink-muted">
          {t.archiveLabel}{' '}
          <span className="font-bold text-ink">{t.archiveMonth(filters.month.slice(5, 7), filters.month.slice(0, 4))}</span>{' '}
          <Link href={blogPath} className="text-classic-accent underline hover:no-underline">
            {t.showAll}
          </Link>
        </p>
      )}

      {postsByYear.length === 0 ? (
        <p className="mt-10 text-ink-muted">{t.noResults}</p>
      ) : (
        postsByYear.map(({ year, posts: yearPosts }) => (
          <section key={year}>
            <h2 className="mt-10 mb-4 border-b border-paper-border pb-1 text-2xl font-bold">{year}</h2>
            <ul className="space-y-6">
              {yearPosts.map((post) => (
                <li key={post.id} className="sm:flex sm:gap-4">
                  <time dateTime={post.date} className="block shrink-0 pt-1 font-fira text-sm text-ink-muted sm:w-24">
                    {formatDate(post.date)}
                  </time>
                  <div>
                    {/* Posts exist only in Vietnamese */}
                    <Link
                      href={`/blog/${post.slug}`}
                      hrefLang="vi"
                      className="text-xl font-bold leading-snug text-classic-accent hover:underline"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-base text-ink-muted">{post.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  )
}
