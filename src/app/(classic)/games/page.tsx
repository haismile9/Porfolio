'use client'

import { useState } from 'react'
import { SnakeGame } from '@/components/SnakeGame'
import { SudokuGame } from '@/components/sudoku'
import { BreakoutGame } from '@/components/breakout/BreakoutGame'

interface Game {
  id: string
  name: string
  description: string
  controls: string
  component: React.ComponentType<{ className?: string }>
}

const games: Game[] = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'The classic: eat the food, grow longer, and avoid running into yourself.',
    controls: 'Arrow keys',
    component: SnakeGame,
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Fill the 9×9 grid so every row, column and box contains the digits 1 to 9.',
    controls: 'Mouse or keyboard',
    component: SudokuGame,
  },
  {
    id: 'breakout',
    name: 'Breakout',
    description: 'Bounce the ball off your paddle and break all the bricks.',
    controls: 'Mouse or arrow keys',
    component: BreakoutGame,
  },
]

export default function GamesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedGame = games.find((game) => game.id === selectedId)

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">Games</h1>
        <p className="mt-2 font-bold">Small games built into this site</p>
        <p className="mt-3">Built from scratch with React and the Canvas API, for fun. Pick one to play.</p>
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
            <p>{game.description}</p>
            <p className="font-fira text-[13px] text-ink-muted">Controls: {game.controls}</p>
          </li>
        ))}
      </ul>

      {selectedGame && (
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold">{selectedGame.name}</h2>
            <button onClick={() => setSelectedId(null)} className="font-fira text-sm text-classic-accent hover:underline">
              close
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
