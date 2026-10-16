'use client'

import { useState } from 'react'
import { SnakeGame } from '@/components/SnakeGame'
import { SudokuGame } from '@/components/sudoku'
import { BreakoutGame } from '@/components/breakout/BreakoutGame'
import type { Locale } from '@/i18n/config'

interface Game {
  id: string
  name: string
  description: Record<Locale, string>
  controls: Record<Locale, string>
  component: React.ComponentType<{ className?: string }>
}

const copy = {
  vi: {
    title: 'Trò chơi',
    subtitle: 'Vài trò chơi nhỏ trong trang này',
    intro: 'Mình tự viết bằng React và Canvas API cho vui. Chọn một trò để chơi.',
    controls: 'Điều khiển',
    close: 'đóng',
  },
  en: {
    title: 'Games',
    subtitle: 'Small games built into this site',
    intro: 'Built from scratch with React and the Canvas API, for fun. Pick one to play.',
    controls: 'Controls',
    close: 'close',
  },
} satisfies Record<Locale, unknown>

const games: Game[] = [
  {
    id: 'snake',
    name: 'Snake',
    description: {
      vi: 'Trò kinh điển: ăn mồi, dài ra, và đừng tự cắn vào mình.',
      en: 'The classic: eat the food, grow longer, and avoid running into yourself.',
    },
    controls: { vi: 'Phím mũi tên', en: 'Arrow keys' },
    component: SnakeGame,
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: {
      vi: 'Điền lưới 9×9 sao cho mỗi hàng, mỗi cột và mỗi ô 3×3 đều có đủ các số từ 1 đến 9.',
      en: 'Fill the 9×9 grid so every row, column and box contains the digits 1 to 9.',
    },
    controls: { vi: 'Chuột hoặc bàn phím', en: 'Mouse or keyboard' },
    component: SudokuGame,
  },
  {
    id: 'breakout',
    name: 'Breakout',
    description: {
      vi: 'Đỡ bóng bằng thanh trượt và phá hết các viên gạch.',
      en: 'Bounce the ball off your paddle and break all the bricks.',
    },
    controls: { vi: 'Chuột hoặc phím mũi tên', en: 'Mouse or arrow keys' },
    component: BreakoutGame,
  },
]

export default function GamesPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const t = copy[lang]
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedGame = games.find((game) => game.id === selectedId)

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">{t.title}</h1>
        <p className="mt-2 font-bold">{t.subtitle}</p>
        <p className="mt-3">{t.intro}</p>
      </header>

      <ul className="space-y-4">
        {games.map((game) => (
          <li key={game.id}>
            <button
              onClick={() => setSelectedId(game.id === selectedId ? null : game.id)}
              className="text-xl font-bold text-classic-accent hover:underline"
            >
              {game.name}
            </button>
            <p>{game.description[lang]}</p>
            <p className="font-fira text-[13px] text-ink-muted">
              {t.controls}: {game.controls[lang]}
            </p>
          </li>
        ))}
      </ul>

      {selectedGame && (
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold">{selectedGame.name}</h2>
            <button onClick={() => setSelectedId(null)} className="font-fira text-sm text-classic-accent hover:underline">
              {t.close}
            </button>
          </div>
          {/* The games keep their own dark styling, so they sit on a dark "screen" */}
          <div className="-mx-4 sm:mx-0 overflow-x-auto bg-dark-bg p-4 sm:rounded font-fira text-base leading-normal text-text-primary">
            <div className="flex justify-center">
              <selectedGame.component className="w-full" />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
