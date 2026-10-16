import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About Me',
  description: 'Background, experience and skills of Nguyen Hong Hai (Smile), a Full-stack developer.',
  path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
