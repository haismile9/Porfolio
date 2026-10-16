import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogs'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'
import { localePath, type Locale } from '@/i18n/config'

const linkClass = 'text-classic-accent underline underline-offset-2 hover:no-underline'

const copy = {
  vi: {
    greeting: 'Xin chào, mình là',
    name: 'Smile',
    role: 'Full-stack Developer · TP. Hồ Chí Minh',
    recentPosts: 'Bài viết mới',
    allPosts: 'Xem tất cả bài viết →',
    selectedProjects: 'Dự án tiêu biểu',
    allProjects: 'Xem tất cả dự án →',
  },
  en: {
    greeting: "Hi, I'm",
    name: 'Smile',
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
        <p className="my-4">
          Tốt nghiệp cao đẳng, đi làm được hơn một năm, hiện đang học liên thông tại HCMUTE. Ở đây có mấy{' '}
          <Link href={href('/projects')} className={linkClass}>dự án</Link> mình từng làm,{' '}
          <Link href={href('/blog')} className={linkClass}>blog</Link> nơi mình viết lại những thứ vừa học cho người
          mới, và vài <Link href={href('/games')} className={linkClass}>trò chơi nhỏ</Link> làm cho vui. Code thì nằm
          hết trên{' '}
          <a href="https://github.com/haismile9" target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          .
        </p>
      ) : (
        <p className="my-4">
          College graduate, a little over a year into working as a developer, and now studying for my bachelor&apos;s
          degree at HCMUTE. Here you&apos;ll find some <Link href={href('/projects')} className={linkClass}>projects</Link>{' '}
          I&apos;ve built, a <Link href={href('/blog')} className={linkClass}>blog</Link> (in Vietnamese) where I rewrite
          what I&apos;ve just learned for beginners, and a few <Link href={href('/games')} className={linkClass}>small games</Link>{' '}
          made for fun. The code is all on{' '}
          <a href="https://github.com/haismile9" target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          .
        </p>
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
