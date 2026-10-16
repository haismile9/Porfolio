import Link from 'next/link'
import { ClassicShell } from '@/components/classic/ClassicShell'
import { ClassicSidebar } from '@/components/classic/ClassicSidebar'

export default function NotFound() {
  return (
    <ClassicShell sidebar={<ClassicSidebar />}>
      <h1 className="text-4xl font-bold leading-tight">404</h1>
      <p className="mt-2 font-bold">Page not found</p>
      <p className="mt-3">
        The page you are looking for doesn&apos;t exist or has been moved. Try the{' '}
        <Link href="/" className="text-classic-accent underline underline-offset-2 hover:no-underline">
          home page
        </Link>{' '}
        or the{' '}
        <Link href="/blog" className="text-classic-accent underline underline-offset-2 hover:no-underline">
          blog
        </Link>
        .
      </p>
    </ClassicShell>
  )
}
