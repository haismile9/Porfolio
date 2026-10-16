'use client'

import { useEffect, useRef } from 'react'

// giscus comments, stored in this repo's GitHub Discussions (one thread per article URL).
// Renders nothing until the NEXT_PUBLIC_GISCUS_* variables are configured.
const config = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
}

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isConfigured = Boolean(config.repo && config.repoId && config.category && config.categoryId)

  useEffect(() => {
    const container = containerRef.current
    if (!isConfigured || !container) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    Object.entries({
      'data-repo': config.repo!,
      'data-repo-id': config.repoId!,
      'data-category': config.category!,
      'data-category-id': config.categoryId!,
      'data-mapping': 'pathname',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'light',
      'data-lang': 'vi',
      'data-loading': 'lazy',
    }).forEach(([key, value]) => script.setAttribute(key, value))

    container.appendChild(script)
    return () => {
      container.innerHTML = ''
    }
  }, [isConfigured])

  if (!isConfigured) return null

  return (
    <section className="mt-12 border-t border-paper-border pt-6">
      <h2 className="mb-4 text-2xl font-bold">Bình luận</h2>
      <div ref={containerRef} className="giscus" />
    </section>
  )
}
