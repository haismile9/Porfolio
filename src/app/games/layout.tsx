import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Games',
  description: 'Play Snake and Sudoku built into the haismile.dev portfolio.',
  path: '/games',
})

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children
}
