import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

const meta = {
  vi: { title: 'Giới thiệu', description: 'Kinh nghiệm, học vấn và kỹ năng của Nguyễn Hồng Hải (Smile), lập trình viên full-stack ở TP.HCM.' },
  en: { title: 'About Me', description: 'Background, experience and skills of Nguyen Hong Hai (Smile), a Full-stack developer in Ho Chi Minh City.' },
} satisfies Record<Locale, { title: string; description: string }>

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  return pageMetadata({ ...meta[params.lang], path: '/about', lang: params.lang })
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
