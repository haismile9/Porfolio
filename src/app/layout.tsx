import type { Metadata } from 'next'
import { PageTransition } from '@/components/PageTransition'
import '@/styles/globals.css'

import { ClientShell } from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Smile - Full-tack developer',
  description: 'Portfolio website of Smile, a Full-tack developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-text-primary font-fira antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
