import { renderOgImage } from '@/lib/og'

// Default share image for pages without their own (home, about, projects…)
export const dynamic = 'force-static'

export function GET() {
  return renderOgImage({
    label: '~/hello',
    title: 'haismile',
    subtitle: 'Trên con đường trở thành một lập trình viên giỏi. Ghi chép về Next.js, NestJS, PostgreSQL và Redis.',
  })
}
