import { NextResponse, type NextRequest } from 'next/server'

// Vietnamese is served at the root: "/about" is rendered by app/[lang]/about with lang = "vi".
// English URLs ("/en/about") already carry their language and pass through unchanged.
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next()

  // "/vi/about" would duplicate "/about": send it to the canonical URL
  if (pathname === '/vi' || pathname.startsWith('/vi/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/vi${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip API routes, Next.js internals, generated images/feeds and any file with an extension
  matcher: ['/((?!api|_next|og|feed\\.xml|sitemap\\.xml|robots\\.txt|.*\\..*).*)'],
}
