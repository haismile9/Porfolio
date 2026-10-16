'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ref, query, limitToLast, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { ChatBox } from '@/components/ChatBox'
import { localePath, locales, stripLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Classic, text-focused shell (inspired by Hugo Classic / Twenty Fourteen):
// a single narrow serif column on a light background with one accent colour.

const navItems = [
  { label: '~/hello', href: '/' },
  { label: '~/about', href: '/about' },
  { label: '~/projects', href: '/projects' },
  { label: '~/blog', href: '/blog' },
  { label: '~/games', href: '/games' },
  { label: '~/contact', href: '/contact' },
]

const footerLinks = (lang: Locale) => {
  const t = getDictionary(lang).footer
  return [
    { label: 'GitHub', href: 'https://github.com/haismile9' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/smile9/' },
    { label: 'Email', href: 'mailto:smilenotdev@gmail.com' },
    { label: t.cv, href: '/CV/FullStack.pdf' },
    { label: t.rss, href: '/feed.xml' },
  ]
}

// The same page in the other language. Blog posts are Vietnamese only,
// so from an article the English link goes to the English blog index.
const switchLanguagePath = (pathname: string, target: Locale) => {
  const path = stripLocale(pathname)
  if (target !== 'vi' && path.startsWith('/blog/')) return localePath(target, '/blog')
  return localePath(target, path)
}

const LAST_SEEN_KEY = 'chat_last_seen'

const readLastSeen = () => {
  try {
    const saved = Number(localStorage.getItem(LAST_SEEN_KEY))
    if (saved) return saved
    // First visit: only messages from now on count as unread
    const now = Date.now()
    localStorage.setItem(LAST_SEEN_KEY, String(now))
    return now
  } catch {
    return Date.now()
  }
}

const writeLastSeen = (time: number) => {
  try {
    localStorage.setItem(LAST_SEEN_KEY, String(time))
  } catch {
    // Storage unavailable (private mode): the unread dot just won't persist
  }
}

export function ClassicShell({
  children,
  sidebar,
  lang,
}: {
  children: React.ReactNode
  sidebar?: React.ReactNode
  lang: Locale
}) {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [latestMessageAt, setLatestMessageAt] = useState(0)
  const [lastSeenAt, setLastSeenAt] = useState(Number.MAX_SAFE_INTEGER)

  const currentPath = stripLocale(pathname)
  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath === href || currentPath.startsWith(`${href}/`)

  // Watch only the newest chat message, to show an unread dot on the toggle
  useEffect(() => {
    setLastSeenAt(readLastSeen())
    if (!db) return
    const unsubscribe = onValue(query(ref(db, 'messages'), limitToLast(1)), (snapshot) => {
      snapshot.forEach((child) => {
        setLatestMessageAt(Number(child.val()?.createdAt) || 0)
      })
    })
    return () => unsubscribe()
  }, [])

  // While the chat is open everything counts as seen
  useEffect(() => {
    if (!isChatOpen) return
    const now = Math.max(Date.now(), latestMessageAt)
    setLastSeenAt(now)
    writeLastSeen(now)
  }, [isChatOpen, latestMessageAt])

  // Esc closes the chat
  useEffect(() => {
    if (!isChatOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChatOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isChatOpen])

  const hasUnread = !isChatOpen && latestMessageAt > lastSeenAt

  return (
    <div className={`classic-shell min-h-screen bg-paper text-ink font-serif ${sidebar ? 'xl:pl-[280px]' : ''}`}>
      {/* Dark widget sidebar pinned to the left edge on wide screens (Twenty Fourteen style) */}
      {sidebar && (
        <aside className="hidden xl:block fixed inset-y-0 left-0 w-[280px] overflow-y-auto bg-sidebar px-8 py-8">
          {sidebar}
        </aside>
      )}

      {/* Content column; on wide screens the track reserves ~240px on the right for the article TOC */}
      <div className="relative max-w-[720px] mx-auto px-4 sm:px-6 pt-6 pb-10 text-[17px] sm:text-[18px] leading-[1.7] xl:max-w-[960px] xl:pr-[264px]">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 bg-classic-accent px-3 py-1.5 font-fira text-[13px] text-white">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localePath(lang, item.href)}
              className={`hover:underline ${isActive(item.href) ? 'underline underline-offset-4' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language switch: same page in the other language */}
          <span className="ml-auto flex gap-1.5">
            {locales.map((locale, i) => (
              <span key={locale} className="flex gap-1.5">
                {i > 0 && <span aria-hidden="true">·</span>}
                {locale === lang ? (
                  <span className="font-bold" aria-current="true">
                    {locale.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    href={switchLanguagePath(pathname, locale)}
                    hrefLang={locale}
                    lang={locale}
                    title={getDictionary(locale).languageName}
                    className="opacity-80 hover:opacity-100 hover:underline"
                  >
                    {locale.toUpperCase()}
                  </Link>
                )}
              </span>
            ))}
          </span>
        </nav>

        <main className="mt-10">{children}</main>

        <footer className="mt-16 border-t border-paper-border pt-6 text-base text-ink-muted">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLinks(lang).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-classic-accent hover:underline"
              >
                {link.label}
              </a>
            ))}
          </p>
          <p className="mt-3 text-sm">© 2026 Nguyen Hong Hai · haismile.dev</p>
        </footer>
      </div>

      {/* Chat toggle, pinned to the bottom-right corner */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          aria-label={hasUnread ? 'Open chat (new messages)' : 'Open chat'}
          className="fixed bottom-4 right-4 z-40 bg-classic-accent px-3 py-1.5 font-fira text-[13px] text-white shadow-md hover:opacity-90"
        >
          ~/chat
          {hasUnread && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-paper bg-amber-500" />
          )}
        </button>
      )}

      {/* Global chat overlays the page: a right-hand panel on larger screens, a bottom sheet on phones */}
      {isChatOpen && (
        <aside className="fixed inset-x-0 bottom-0 z-50 h-[60vh] border-t border-paper-border bg-paper px-4 pt-3 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:inset-x-auto md:right-0 md:top-0 md:h-full md:w-[380px] md:border-t-0 md:border-l md:shadow-[-8px_0_24px_rgba(0,0,0,0.08)]">
          <ChatBox onClose={() => setIsChatOpen(false)} />
        </aside>
      )}
    </div>
  )
}
