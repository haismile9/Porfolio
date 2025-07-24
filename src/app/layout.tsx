import type { Metadata } from 'next'
import { PageTransition } from '@/components/PageTransition'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Smile - Front-end Developer',
  description: 'Portfolio website of Smile, a front-end developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-text-primary font-fira antialiased">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
