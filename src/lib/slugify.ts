// Turns Vietnamese text into a URL-safe slug without diacritics,
// e.g. "Kiến trúc Next.js 14" -> "kien-truc-next-js-14"
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
