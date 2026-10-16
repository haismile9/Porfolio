import { getAllBlogs } from '@/lib/blogs'
import { getCategoryLabel } from '@/lib/categories'
import { siteConfig } from '@/lib/site'

// RSS 2.0 feed of blog posts, generated at build time
export const dynamic = 'force-static'

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function GET() {
  const posts = [...getAllBlogs()].sort((a, b) => b.date.localeCompare(a.date))

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`
      const categories = [getCategoryLabel(post.category), ...post.tags]
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join('\n')
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
${categories}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} · Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Ghi chép kỹ thuật về Next.js, NestJS, cơ sở dữ liệu và kiến trúc hệ thống.</description>
    <language>vi</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].publishedAt).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
