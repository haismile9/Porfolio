import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Selected web projects by Nguyen Hong Hai: eCommerce stores, landing pages and full-stack applications.',
  path: '/projects',
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
