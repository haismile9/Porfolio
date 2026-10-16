import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Get in touch with Nguyen Hong Hai (Smile), Full-stack developer, for work or collaboration.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
