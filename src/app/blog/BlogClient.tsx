'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BlogPost } from '@/lib/blogs'

// Classic, text-focused blog layout (inspired by Hugo Classic / Twenty Fourteen):
// a single narrow column, serif type, one accent colour and no animations.

const categories = [
  { id: 'nextjs', label: 'Next.js', path: 'nextjs' },
  { id: 'backend', label: 'Backend & Microservices', path: 'backend' },
  { id: 'database', label: 'Database & SQL', path: 'database' },
  { id: 'architecture', label: 'System Architecture', path: 'architecture' },
]

const formatDate = (date: string) => date.replace(/-/g, '/')

interface BlogClientProps {
  blogs: BlogPost[]
}

export default function BlogClient({ blogs }: BlogClientProps) {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  // The active article comes from the URL: /blog is the article list,
  // /blog/[slug] is the article view.
  const activeBlog = useMemo(() => {
    const slug = pathname.startsWith('/blog/') ? decodeURIComponent(pathname.slice('/blog/'.length)) : null
    if (!slug) return null
    return blogs.find((b) => b.slug === slug) || null
  }, [pathname, blogs])

  // The scroll container lives in the blog layout, so reset it on navigation
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  // Newest first
  const sortedBlogs = useMemo(() => [...blogs].sort((a, b) => b.date.localeCompare(a.date)), [blogs])

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return sortedBlogs.filter((blog) => {
      if (selectedCategory !== 'all' && blog.category !== selectedCategory) return false
      if (!query) return true
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        blog.tags.some((t) => t.toLowerCase().includes(query))
      )
    })
  }, [sortedBlogs, selectedCategory, searchQuery])

  const blogsByYear = useMemo(() => {
    const groups: { year: string; posts: BlogPost[] }[] = []
    filteredBlogs.forEach((blog) => {
      const year = blog.date.slice(0, 4)
      const group = groups.find((g) => g.year === year)
      if (group) group.posts.push(blog)
      else groups.push({ year, posts: [blog] })
    })
    return groups
  }, [filteredBlogs])

  const getCategoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? 'Technical'

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*|\[.*?\]\(.*?\))/g
    const parts = text.split(regex)

    return parts.map((part, index) => {
      if (!part) return null
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={index} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={index} className="px-1 py-0.5 rounded bg-paper-code text-[0.82em] font-fira text-ink">
            {part.slice(1, -1)}
          </code>
        )
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        )
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-classic-accent underline underline-offset-2 hover:no-underline"
          >
            {linkMatch[1]}
          </a>
        )
      }
      return part
    })
  }

  // Markdown parser that never splits inside code blocks and supports the MDX features used in posts
  const renderMarkdownContent = (content: string) => {
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '')
    const parts = normalizedContent.split(/(```[\s\S]*?```)/g)
    let codeBlockCounter = 0

    return parts.map((part, pIdx) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const firstLineEnd = part.indexOf('\n')
        const lang = part.slice(3, firstLineEnd).trim() || 'code'
        const codeText = part.slice(firstLineEnd + 1, -3).trim()
        const currentCodeIdx = codeBlockCounter++

        return (
          <div key={pIdx} className="my-6 rounded border border-paper-border bg-paper-code">
            <div className="flex items-center justify-between px-4 pt-2 font-fira text-xs text-ink-muted">
              <span>{lang}</span>
              <button
                onClick={() => handleCopyCode(codeText, currentCodeIdx)}
                className="hover:text-classic-accent transition-colors"
              >
                {copiedCodeIndex === currentCodeIdx ? 'copied!' : 'copy'}
              </button>
            </div>
            <pre className="px-4 pt-2 pb-4 overflow-x-auto text-[13px] sm:text-sm font-fira leading-relaxed text-ink">
              <code>{codeText}</code>
            </pre>
          </div>
        )
      }

      const normalizedSection = part.replace(/^(#{1,4}\s+.*)$/gm, '\n$1\n\n')
      const sections = normalizedSection.split(/\n{2,}/).filter((s) => s.trim().length > 0)
      return sections.map((section, idx) => {
        const key = `${pIdx}-${idx}`
        const trimmed = section.trim()

        // GitHub callout alerts (> [!TIP], > [!WARNING], > [!NOTE], etc.)
        const calloutMatch = trimmed.match(/^>\s*\[!(TIP|WARNING|NOTE|IMPORTANT|CAUTION)\]/i)
        if (calloutMatch) {
          const type = calloutMatch[1].toUpperCase()
          const lines = trimmed
            .split('\n')
            .filter((line) => !line.match(/^>\s*\[!/i))
            .map((line) => line.replace(/^>\s?/, '').trim())

          let boxClass = 'border-classic-accent bg-classic-accent/5'
          let label = 'Tóm tắt'
          if (type === 'WARNING' || type === 'CAUTION') {
            boxClass = 'border-amber-600 bg-amber-50'
            label = 'Lưu ý'
          } else if (type === 'IMPORTANT' || type === 'NOTE') {
            label = 'Ghi chú'
          }

          return (
            <aside key={key} className={`my-6 border-l-4 px-4 py-3 ${boxClass}`}>
              <p className="font-bold mb-1">{label}</p>
              <div className="space-y-1 text-[17px] leading-relaxed">
                {lines.map((line, lIdx) => (
                  <p key={lIdx}>{parseInlineMarkdown(line)}</p>
                ))}
              </div>
            </aside>
          )
        }

        // Markdown tables (| Header 1 | Header 2 |)
        if (trimmed.startsWith('|') || (trimmed.includes('\n|') && trimmed.split('\n').some((l) => l.trim().startsWith('|')))) {
          const lines = trimmed.split('\n').filter((line) => line.trim().startsWith('|'))
          if (lines.length >= 2) {
            const parseRow = (rowStr: string) =>
              rowStr
                .split('|')
                .slice(1, -1)
                .map((cell) => cell.trim())

            const headers = parseRow(lines[0])
            const dataRows = lines.slice(2).map(parseRow)

            return (
              <div key={key} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b-2 border-ink/70">
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2 pr-4 font-bold whitespace-nowrap">
                          {parseInlineMarkdown(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-paper-border">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2 pr-4 align-top leading-snug">
                            {parseInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        }

        // Horizontal rule (---)
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return <hr key={key} className="my-8 border-paper-border" />
        }

        // Headings (the article title is the page's only h1, so content starts at h2)
        const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/)
        if (headingMatch) {
          const level = headingMatch[1].length
          const text = parseInlineMarkdown(headingMatch[2])
          if (level <= 2) {
            return (
              <h2 key={key} className="text-2xl font-bold leading-snug mt-10 mb-3">
                {text}
              </h2>
            )
          }
          if (level === 3) {
            return (
              <h3 key={key} className="text-xl font-bold leading-snug mt-8 mb-2">
                {text}
              </h3>
            )
          }
          return (
            <h4 key={key} className="text-lg font-bold mt-6 mb-2">
              {text}
            </h4>
          )
        }

        // Numbered / ordered lists (1. , 2. )
        if (trimmed.split('\n').some((line) => /^\d+\.\s+/.test(line.trim()))) {
          const lines = trimmed.split('\n')
          const listItems: { num: string; text: string }[] = []
          const introText: string[] = []

          lines.forEach((line) => {
            const match = line.trim().match(/^(\d+)\.\s+(.*)/)
            if (match) {
              listItems.push({ num: match[1], text: match[2] })
            } else if (listItems.length === 0) {
              if (line.trim().length > 0) introText.push(line.trim())
            } else if (line.trim().length > 0) {
              listItems[listItems.length - 1].text += ' ' + line.trim()
            }
          })

          return (
            <div key={key} className="my-4">
              {introText.length > 0 && <p className="mb-3">{parseInlineMarkdown(introText.join(' '))}</p>}
              <ol start={Number(listItems[0]?.num) || 1} className="list-decimal pl-7 space-y-1.5">
                {listItems.map((item, iIdx) => (
                  <li key={iIdx} className="pl-1">
                    {parseInlineMarkdown(item.text)}
                  </li>
                ))}
              </ol>
            </div>
          )
        }

        // Bullet lists (- or *)
        if (trimmed.split('\n').some((line) => /^[-*]\s+/.test(line.trim()))) {
          const lines = trimmed.split('\n')
          const listItems: string[] = []
          const introText: string[] = []

          lines.forEach((line) => {
            const match = line.trim().match(/^[-*]\s+(.*)/)
            if (match) {
              listItems.push(match[1])
            } else if (listItems.length === 0) {
              if (line.trim().length > 0) introText.push(line.trim())
            } else if (line.trim().length > 0) {
              listItems[listItems.length - 1] += ' ' + line.trim()
            }
          })

          return (
            <div key={key} className="my-4">
              {introText.length > 0 && <p className="mb-3">{parseInlineMarkdown(introText.join(' '))}</p>}
              <ul className="list-disc pl-7 space-y-1.5">
                {listItems.map((item, iIdx) => (
                  <li key={iIdx} className="pl-1">
                    {parseInlineMarkdown(item)}
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        // Blockquotes (> )
        if (trimmed.startsWith('>')) {
          const lines = trimmed.split('\n').map((l) => l.replace(/^>\s?/, '').trim())
          return (
            <blockquote key={key} className="my-6 border-l-4 border-paper-border pl-4 italic text-ink-muted">
              {lines.map((l, lIdx) => (
                <p key={lIdx}>{parseInlineMarkdown(l)}</p>
              ))}
            </blockquote>
          )
        }

        // Paragraphs
        return (
          <p key={key} className="my-4">
            {parseInlineMarkdown(trimmed)}
          </p>
        )
      })
    })
  }

  // Previous / next article by date, for the article footer
  const activeIndex = activeBlog ? sortedBlogs.findIndex((b) => b.id === activeBlog.id) : -1
  const newerPost = activeIndex > 0 ? sortedBlogs[activeIndex - 1] : null
  const olderPost = activeIndex >= 0 && activeIndex < sortedBlogs.length - 1 ? sortedBlogs[activeIndex + 1] : null

  return (
    <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto bg-paper text-ink font-serif">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-6 pb-16 text-[17px] sm:text-[18px] leading-[1.7]">
        {/* Top navigation bar */}
        <nav className="flex flex-wrap gap-x-4 gap-y-1 bg-classic-accent px-3 py-1.5 font-fira text-[13px] text-white">
          <Link
            href="/blog"
            onClick={() => setSelectedCategory('all')}
            className={`hover:underline ${!activeBlog && selectedCategory === 'all' ? 'underline underline-offset-4' : ''}`}
          >
            ~/blog
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href="/blog"
              onClick={() => setSelectedCategory(cat.id)}
              className={`hover:underline ${!activeBlog && selectedCategory === cat.id ? 'underline underline-offset-4' : ''}`}
            >
              ~/{cat.path}
            </Link>
          ))}
        </nav>

        {!activeBlog ? (
          /* ================= Article list (/blog) ================= */
          <>
            <header className="mt-10 mb-8">
              <h1 className="text-4xl font-bold leading-tight">Blog</h1>
              <p className="mt-2 font-bold">Ghi chép kỹ thuật của Smile</p>
              <p className="mt-3">
                Những gì mình học được khi làm việc với Next.js, NestJS, cơ sở dữ liệu và kiến trúc hệ thống.
                Hiện có {blogs.length} bài viết.
              </p>
            </header>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tiêu đề, nội dung tóm tắt hoặc tag..."
              className="w-full border border-paper-border bg-white px-3 py-2 text-base placeholder:text-ink-muted/70 focus:outline-none focus:border-classic-accent"
            />

            {selectedCategory !== 'all' && (
              <p className="mt-4 text-base text-ink-muted">
                Chủ đề: <span className="font-bold text-ink">{getCategoryLabel(selectedCategory)}</span>{' '}
                <button onClick={() => setSelectedCategory('all')} className="text-classic-accent underline hover:no-underline">
                  (xem tất cả)
                </button>
              </p>
            )}

            {blogsByYear.length === 0 ? (
              <p className="mt-10 text-ink-muted">Không tìm thấy bài viết nào.</p>
            ) : (
              blogsByYear.map(({ year, posts }) => (
                <section key={year}>
                  <h2 className="mt-10 mb-4 border-b border-paper-border pb-1 text-2xl font-bold">{year}</h2>
                  <ul className="space-y-6">
                    {posts.map((blog) => (
                      <li key={blog.id} className="sm:flex sm:gap-4">
                        <time dateTime={blog.date} className="block shrink-0 pt-1 font-fira text-sm text-ink-muted sm:w-24">
                          {formatDate(blog.date)}
                        </time>
                        <div>
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="text-xl font-bold leading-snug text-classic-accent hover:underline"
                          >
                            {blog.title}
                          </Link>
                          <p className="mt-1 text-base text-ink-muted">{blog.summary}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </>
        ) : (
          /* ================= Article view (/blog/[slug]) ================= */
          <article className="mt-8">
            <Link href="/blog" className="font-fira text-sm text-classic-accent hover:underline">
              ← ~/blog
            </Link>

            <header className="mt-6 mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{activeBlog.title}</h1>
              <p className="mt-3 font-fira text-[13px] text-ink-muted">
                <time dateTime={activeBlog.date}>{formatDate(activeBlog.date)}</time>
                {' · '}
                {activeBlog.readTime}
                {' · '}
                {getCategoryLabel(activeBlog.category)}
              </p>
              <p className="mt-5 italic text-ink-muted">{activeBlog.summary}</p>
            </header>

            <div>{renderMarkdownContent(activeBlog.content)}</div>

            <footer className="mt-12 border-t border-paper-border pt-6 text-base">
              <p className="text-ink-muted">
                Tags:{' '}
                {activeBlog.tags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && ', '}
                    <Link
                      href="/blog"
                      onClick={() => {
                        setSelectedCategory('all')
                        setSearchQuery(tag)
                      }}
                      className="text-classic-accent hover:underline"
                    >
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

              <p className="mt-8 text-sm text-ink-muted">© 2026 Nguyen Hong Hai</p>
            </footer>
          </article>
        )}
      </div>
    </div>
  )
}
