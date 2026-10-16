import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogs'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'

// Structured data: WebSite lets search engines show a site name, Person ties the profiles together
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'Smile',
      alternateName: ['haismile.dev', siteConfig.name],
      inLanguage: 'vi',
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
}

const linkClass = 'text-classic-accent underline underline-offset-2 hover:no-underline'

export default function HomePage() {
  const recentPosts = [...getAllBlogs()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-8">
        <p className="font-fira text-sm text-ink-muted">Hi all. I am</p>
        <h1 className="mt-1 text-4xl sm:text-5xl font-bold leading-tight">Nguyen Hong Hai</h1>
        <p className="mt-2 font-bold">Full-stack Developer · Ho Chi Minh City, Vietnam</p>
      </header>

      <p className="my-4">
        I build web applications end to end: React and Next.js on the front, Node.js and NestJS on the back,
        PostgreSQL and Redis for data, and Docker and Nginx to ship it. Right now I work on a real-time medical
        device management system.
      </p>
      <p className="my-4">
        This site is where I keep my <Link href="/projects" className={linkClass}>projects</Link>, write{' '}
        <Link href="/blog" className={linkClass}>technical notes</Link>, and hide a few{' '}
        <Link href="/games" className={linkClass}>small games</Link>. More about me on the{' '}
        <Link href="/about" className={linkClass}>about page</Link>, or find my code on{' '}
        <a href="https://github.com/haismile9" target="_blank" rel="noopener noreferrer" className={linkClass}>
          GitHub
        </a>
        .
      </p>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-4 border-b border-paper-border pb-1">Recent posts</h2>
      <ul className="space-y-3">
        {recentPosts.map((post) => (
          <li key={post.id} className="sm:flex sm:gap-4">
            <time dateTime={post.date} className="block shrink-0 pt-1 font-fira text-sm text-ink-muted sm:w-24">
              {post.date.replace(/-/g, '/')}
            </time>
            <Link href={`/blog/${post.slug}`} className="text-classic-accent hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-base">
        <Link href="/blog" className={linkClass}>All posts →</Link>
      </p>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-4 border-b border-paper-border pb-1">Selected projects</h2>
      <ul className="space-y-3">
        {featuredProjects.map((project) => (
          <li key={project.title}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-bold text-classic-accent hover:underline">
              {project.title}
            </a>
            <span className="text-ink-muted"> · {project.description}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-base">
        <Link href="/projects" className={linkClass}>All projects →</Link>
      </p>
    </>
  )
}
