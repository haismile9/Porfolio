import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

const meta = {
  vi: { title: 'Liên hệ', description: 'Liên hệ với Nguyễn Hồng Hải (Smile), lập trình viên full-stack, về công việc hoặc hợp tác.' },
  en: { title: 'Contact', description: 'Get in touch with Nguyen Hong Hai (Smile), Full-stack developer, for work or collaboration.' },
} satisfies Record<Locale, { title: string; description: string }>

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  return pageMetadata({ ...meta[params.lang], path: '/contact', lang: params.lang })
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
