const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Permanent redirects for renamed blog posts: every slug listed under `previousSlugs`
// in a post's frontmatter, plus the post's file name (the very first URL format),
// points to the current slug.
function blogRedirects() {
  const dir = path.join(__dirname, 'src/content/blogs')
  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .flatMap((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      if (!data.slug) return []
      const oldSlugs = new Set([...(data.previousSlugs ?? []), file.replace(/\.mdx?$/, '')])
      oldSlugs.delete(data.slug)
      return [...oldSlugs].map((oldSlug) => ({
        source: `/blog/${oldSlug}`,
        destination: `/blog/${data.slug}`,
        permanent: true,
      }))
    })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  experimental: {
    // Load @vercel/og natively: the copy bundled in next/og builds file URLs with
    // path.join, which breaks on Windows ("Invalid URL")
    serverComponentsExternalPackages: ['@vercel/og'],
  },
  async redirects() {
    return [
      ...blogRedirects(),
      // Posts and tag pages are Vietnamese only, so English URLs point to the originals
      { source: '/en/blog/:slug', destination: '/blog/:slug', permanent: false },
      { source: '/en/blog/tag/:tag', destination: '/blog/tag/:tag', permanent: false },
    ]
  },
}

module.exports = nextConfig
