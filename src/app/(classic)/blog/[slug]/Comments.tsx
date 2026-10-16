'use client'

import { useEffect, useRef } from 'react'

// giscus comments, stored in this repo's GitHub Discussions (one thread per article URL).
// The IDs are public (they end up in the page HTML anyway); NEXT_PUBLIC_GISCUS_* can override them.
const config = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'haismile9/Porfolio',
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOPSTnIA',
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements',
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOPSTnIM4DIlQG',
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
