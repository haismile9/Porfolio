// Vietnamese is the default language and lives at the root (/about);
// English lives under /en (/en/about). Blog posts are Vietnamese only.
export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'vi'

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value)

// "/about" in the given language: "/about" (vi) or "/en/about" (en)
export function localePath(lang: Locale, path: string) {
  if (lang === defaultLocale) return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

// The path without its language prefix: "/en/about" -> "/about". Also strips "/vi":
// on pages served through the middleware rewrite, usePathname() can return "/vi/...".
export function stripLocale(pathname: string) {
  const match = pathname.match(/^\/(?:en|vi)(?=\/|$)/)
  return match ? pathname.slice(match[0].length) || '/' : pathname
}

// hreflang alternates for a page that exists in both languages
export function languageAlternates(path: string) {
  return {
    vi: localePath('vi', path),
    en: localePath('en', path),
    'x-default': localePath('vi', path),
  }
}
