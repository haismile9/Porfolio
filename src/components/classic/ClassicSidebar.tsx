import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogs'
import { categories } from '@/lib/categories'

// Left-hand "widget" sidebar in the spirit of Twenty Fourteen, shown on a dark background:
// a short bio, links, blog topics and a monthly archive.

const elsewhere = [
  { label: 'GitHub', href: 'https://github.com/haismile9' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/smile9/' },
  { label: 'dev.to', href: 'https://dev.to/nguyn_hi_e2ccd6e16c6b77' },
  { label: 'Email', href: 'mailto:smilenotdev@gmail.com' },
]

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const headingClass = 'mb-2 text-sm font-bold uppercase tracking-wide text-white'
const linkClass = 'text-sidebar-link hover:text-white hover:underline'

export function ClassicSidebar() {
  const blogs = getAllBlogs()

  const topics = categories
    .map((cat) => ({ ...cat, count: blogs.filter((b) => b.category === cat.id).length }))
    .filter((cat) => cat.count > 0)

  // "2026-07" -> count, newest month first
  const archive = Object.entries(
    blogs.reduce<Record<string, number>>((acc, blog) => {
      const month = blog.date.slice(0, 7)
      acc[month] = (acc[month] ?? 0) + 1
      return acc
    }, {})
  ).sort(([a], [b]) => b.localeCompare(a))

  return (
    <div className="space-y-8 text-[15px] leading-relaxed text-sidebar-text">
      <section>
        <Image src="/images/Smile_logo.png" alt="Smile logo" width={56} height={56} className="mb-3 h-14 w-14 object-contain" />
        <p className="font-bold text-white">Nguyen Hong Hai</p>
        <p>Full-stack developer in Ho Chi Minh City. Writing about Next.js, NestJS and databases.</p>
        <p className="mt-1">
          <a href="/CV/FullStack.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Download CV
          </a>
        </p>
      </section>

      <section>
        <h2 className={headingClass}>Elsewhere</h2>
        <ul>
          {elsewhere.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={linkClass}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={headingClass}>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/blog?category=${topic.id}`} className={linkClass}>
                {topic.label}
              </Link>{' '}
              ({topic.count})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={headingClass}>Archive</h2>
        <ul>
          {archive.map(([month, count]) => (
            <li key={month}>
              <Link href={`/blog?month=${month}`} className={linkClass}>
                {monthNames[Number(month.slice(5, 7)) - 1]} {month.slice(0, 4)}
              </Link>{' '}
              ({count})
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
