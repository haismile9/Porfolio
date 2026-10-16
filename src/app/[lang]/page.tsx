import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogs'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'
import { localePath, type Locale } from '@/i18n/config'

const linkClass = 'text-classic-accent underline underline-offset-2 hover:no-underline'

const copy = {
  vi: {
    greeting: 'Xin chào, mình là',
    name: 'Nguyễn Hồng Hải',
    role: 'Full-stack Developer · TP. Hồ Chí Minh',
    recentPosts: 'Bài viết mới',
    allPosts: 'Xem tất cả bài viết →',
    selectedProjects: 'Dự án tiêu biểu',
    allProjects: 'Xem tất cả dự án →',
  },
  en: {
    greeting: 'Hi all. I am',
    name: 'Nguyen Hong Hai',
    role: 'Full-stack Developer · Ho Chi Minh City, Vietnam',
    recentPosts: 'Recent posts (in Vietnamese)',
    allPosts: 'All posts →',
    selectedProjects: 'Selected projects',
    allProjects: 'All projects →',
  },
} satisfies Record<Locale, unknown>

// Structured data: WebSite lets search engines show a site name, Person ties the profiles together
const jsonLd = (lang: Locale) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'Smile',
      alternateName: ['haismile.dev', siteConfig.title[lang]],
      inLanguage: lang,
      author: { '@id': `${siteConfig.url}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author,
      alternateName: 'Smile',
      url: siteConfig.url,
      image: `${siteConfig.url}/icon.png`,
      jobTitle: 'Full-stack Developer',
      address: { '@type': 'PostalAddress', addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' },
      sameAs: [
        'https://github.com/haismile9',
        'https://linkedin.com/in/smile9/',
        'https://dev.to/nguyn_hi_e2ccd6e16c6b77',
      ],
    },
  ],
})

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const t = copy[lang]
  const href = (path: string) => localePath(lang, path)
  const recentPosts = [...getAllBlogs()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />

      <header className="mb-8">
        <p className="font-fira text-sm text-ink-muted">{t.greeting}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl font-bold leading-tight">{t.name}</h1>
        <p className="mt-2 font-bold">{t.role}</p>
      </header>

      {lang === 'vi' ? (
        <>
          <p className="my-4">
            Mình làm web từ đầu đến cuối: React và Next.js ở phía giao diện, Node.js và NestJS ở phía server,
            PostgreSQL và Redis cho dữ liệu, Docker và Nginx để triển khai. Hiện mình đang làm một hệ thống quản lý
            thiết bị y tế theo thời gian thực.
          </p>
          <p className="my-4">
            Đây là nơi mình lưu lại các <Link href={href('/projects')} className={linkClass}>dự án</Link>, viết{' '}
            <Link href={href('/blog')} className={linkClass}>ghi chép lập trình cho người mới bắt đầu</Link>, và giấu
            vài <Link href={href('/games')} className={linkClass}>trò chơi nhỏ</Link>. Đọc thêm về mình ở{' '}
            <Link href={href('/about')} className={linkClass}>trang giới thiệu</Link>, hoặc xem code của mình trên{' '}
            <a href="https://github.com/haismile9" target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <p className="my-4">
            I build web applications end to end: React and Next.js on the front, Node.js and NestJS on the back,
            PostgreSQL and Redis for data, and Docker and Nginx to ship it. Right now I work on a real-time medical
            device management system.
          </p>
          <p className="my-4">
            This site is where I keep my <Link href={href('/projects')} className={linkClass}>projects</Link>, write{' '}
            <Link href={href('/blog')} className={linkClass}>beginner-friendly notes</Link> (in Vietnamese), and hide
            a few <Link href={href('/games')} className={linkClass}>small games</Link>. More about me on the{' '}
            <Link href={href('/about')} className={linkClass}>about page</Link>, or find my code on{' '}
            <a href="https://github.com/haismile9" target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            .
          </p>
        </>
      )}

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-4 border-b border-paper-border pb-1">{t.recentPosts}</h2>
      <ul className="space-y-3">
        {recentPosts.map((post) => (
          <li key={post.id} className="sm:flex sm:gap-4">
            <time dateTime={post.date} className="block shrink-0 pt-1 font-fira text-sm text-ink-muted sm:w-24">
              {post.date.replace(/-/g, '/')}
            </time>
            {/* Posts exist only in Vietnamese */}
            <Link href={`/blog/${post.slug}`} hrefLang="vi" className="text-classic-accent hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-base">
        <Link href={href('/blog')} className={linkClass}>{t.allPosts}</Link>
      </p>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-4 border-b border-paper-border pb-1">{t.selectedProjects}</h2>
      <ul className="space-y-3">
        {featuredProjects.map((project) => (
          <li key={project.title}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-bold text-classic-accent hover:underline">
              {project.title}
            </a>
            <span className="text-ink-muted"> · {project.description[lang]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-base">
        <Link href={href('/projects')} className={linkClass}>{t.allProjects}</Link>
      </p>
    </>
  )
}
