'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { TocItem } from '@/lib/markdown'

interface ArticleSidebarProps {
  toc: TocItem[]
  relatedPosts: { slug: string; title: string }[]
}

// Table of contents + related posts in the right margin on wide screens.
// The entry for the section currently being read is highlighted.
export function ArticleSidebar({ toc, relatedPosts }: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -75% 0px' }
    )
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0 && relatedPosts.length === 0) return null

  return (
    <aside className="hidden xl:block absolute left-full top-0 bottom-0 ml-8 w-52">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto space-y-8 text-[15px] leading-snug text-ink-muted">
        {toc.length > 0 && (
          <nav aria-label="Mục lục">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink">Mục lục</h2>
            <ul className="space-y-1.5">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'pl-3 text-sm' : ''}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? 'font-bold text-ink' : 'text-classic-accent hover:underline'}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink">Bài liên quan</h2>
            <ul className="space-y-2">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-classic-accent hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </aside>
  )
}
