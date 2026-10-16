import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

const meta = {
  vi: { title: 'Trò chơi', description: 'Chơi Snake, Sudoku và Breakout ngay trên trang haismile.dev.' },
  en: { title: 'Games', description: 'Play Snake, Sudoku and Breakout built into the haismile.dev site.' },
} satisfies Record<Locale, { title: string; description: string }>

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  return pageMetadata({ ...meta[params.lang], path: '/games', lang: params.lang })
}

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children
}
