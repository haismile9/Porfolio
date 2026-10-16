import { renderOgImage } from '@/lib/og'

// Default share image for the English pages
export const dynamic = 'force-static'

export function GET() {
  return renderOgImage({
    label: '~/hello',
    title: 'Smile',
    subtitle: 'On the way to becoming a good developer. Beginner-friendly notes on Next.js, NestJS, PostgreSQL and Redis.',
  })
}
