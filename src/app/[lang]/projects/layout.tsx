import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

const meta = {
  vi: { title: 'Dự án', description: 'Các dự án web của haismile: cửa hàng thương mại điện tử, ứng dụng quản lý công việc và ứng dụng full-stack.' },
  en: { title: 'Projects', description: 'Selected web projects by haismile: eCommerce stores, task management and full-stack applications.' },
} satisfies Record<Locale, { title: string; description: string }>

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  return pageMetadata({ ...meta[params.lang], path: '/projects', lang: params.lang })
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
