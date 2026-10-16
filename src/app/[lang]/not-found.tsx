'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// not-found.tsx receives no params, so the language is read from the URL
export default function NotFound() {
  const isEnglish = /^\/en(\/|$)/.test(usePathname() ?? '')
  const linkClass = 'text-classic-accent underline underline-offset-2 hover:no-underline'

  return isEnglish ? (
    <>
      <h1 className="text-4xl font-bold leading-tight">404</h1>
      <p className="mt-2 font-bold">Page not found</p>
      <p className="mt-3">
        The page you are looking for doesn&apos;t exist or has been moved. Try the{' '}
        <Link href="/en" className={linkClass}>home page</Link> or the <Link href="/en/blog" className={linkClass}>blog</Link>.
      </p>
    </>
  ) : (
    <>
      <h1 className="text-4xl font-bold leading-tight">404</h1>
      <p className="mt-2 font-bold">Không tìm thấy trang</p>
      <p className="mt-3">
        Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Thử quay lại{' '}
        <Link href="/" className={linkClass}>trang chủ</Link> hoặc xem <Link href="/blog" className={linkClass}>blog</Link>.
      </p>
    </>
  )
}
