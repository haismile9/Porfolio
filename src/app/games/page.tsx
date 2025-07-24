'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SnakeGame } from '@/components/SnakeGame';
import { SudokuGame } from '@/components/sudoku';
import { 
  TetrisGameComponent, 
  PongGameComponent, 
  BreakoutGameComponent, 
  SpaceInvadersGameComponent,
  SudokuGameComponent 
} from '@/components/GameComponents';

interface Game {
  id: string;
  name: string;
  description: string;
  tags: string[];
  component: React.ComponentType<{ className?: string }>;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const games: Game[] = [
  {
    id: 'snake',
    name: 'Snake Game',
    description: 'Classic snake game with modern controls. Eat food to grow longer!',
    tags: ['JavaScript', 'Canvas', 'Game'],
    component: SnakeGame,
    image: '/game-snake.svg',
    difficulty: 'Easy'
  },
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'The classic falling blocks puzzle game. Clear lines to score!',
    tags: ['TypeScript', 'Canvas', 'Puzzle'],
    component: TetrisGameComponent,
    image: '/game-tetris.svg',
    difficulty: 'Medium'
  },
  {
    id: 'pong',
    name: 'Pong',
    description: 'The original arcade game. Control your paddle and beat the AI!',
    tags: ['JavaScript', 'Canvas', 'Classic'],
    component: PongGameComponent,
    image: '/game-pong.svg',
    difficulty: 'Easy'
  },
  {
    id: 'breakout',
    name: 'Breakout',
    description: 'Break all the bricks with your ball and paddle!',
    tags: ['Canvas', 'Physics', 'Arcade'],
    component: BreakoutGameComponent,
    image: '/game-breakout.svg',
    difficulty: 'Medium'
  },
  {
    id: 'space-invaders',
    name: 'Space Invaders',
    description: 'Defend Earth from alien invasion! Shoot them all!',
    tags: ['JavaScript', 'Canvas', 'Shooter'],
    component: SpaceInvadersGameComponent,
    image: '/game-space.svg',
    difficulty: 'Hard'
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Classic number puzzle game. Fill the 9x9 grid with digits!',
    tags: ['Puzzle', 'Logic', 'TypeScript'],
    component: SudokuGame,
    image: '/game-sudoku.svg',
    difficulty: 'Medium'
  }
];

const allTags = Array.from(new Set(games.flatMap(game => game.tags)));

export default function GamesPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameExpanded, setIsGameExpanded] = useState(true);

  const filteredGames = selectedTag === 'all' 
    ? games 
    : games.filter(game => game.tags.includes(selectedTag));

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex flex-col">
      <Header activeTab="_games" />
      
      <main className="flex-1 flex">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-[311px] border-r border-border-primary"
        >
          {/* Games Section */}
          <div className="border-b border-border-primary">
            <button
              onClick={() => setIsGameExpanded(!isGameExpanded)}
              className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-dark-secondary transition-colors"
            >
              <motion.svg
                animate={{ rotate: isGameExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4 6l4 4 4-4H4z"/>
              </motion.svg>
              <span className="text-white">games</span>
            </button>
            <AnimatePresence>
              {isGameExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-2 space-y-2">
                    {games.map((game) => (
                      <motion.button
                        key={game.id}
                        onClick={() => handlePlayGame(game)}
                        whileHover={{ x: 4 }}
                        className="w-full text-left flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                        </svg>
                        <span>{game.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedGame ? (
              <motion.div
                key="game-player"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Game Header */}
                <div className="border-b border-border-primary p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedGame.name}</h2>
                    <p className="text-text-secondary mt-1">{selectedGame.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-sm ${getDifficultyColor(selectedGame.difficulty)}`}>
                        {selectedGame.difficulty}
                      </span>
                      <div className="flex gap-2">
                        {selectedGame.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-dark-secondary text-text-secondary rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseGame}
                    className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* Game Content */}
                <div className="flex-1 p-6 flex items-center justify-center bg-dark-secondary">
                  <div className="w-full max-w-2xl">
                    <selectedGame.component className="w-full" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="game-gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Filter Tabs */}
                <div className="border-b border-border-primary">
                  <div className="flex">
                    <motion.button
                      onClick={() => setSelectedTag('all')}
                      className={`px-6 py-3 text-sm border-r border-border-primary transition-colors ${
                        selectedTag === 'all'
                          ? 'bg-dark-secondary text-white'
                          : 'text-text-secondary hover:text-white'
                      }`}
                      whileHover={{ backgroundColor: selectedTag === 'all' ? undefined : 'rgba(255, 255, 255, 0.05)' }}
                    >
                      all
                    </motion.button>
                    {allTags.map((tag) => (
                      <motion.button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-6 py-3 text-sm border-r border-border-primary transition-colors ${
                          selectedTag === tag
                            ? 'bg-dark-secondary text-white'
                            : 'text-text-secondary hover:text-white'
                        }`}
                        whileHover={{ backgroundColor: selectedTag === tag ? undefined : 'rgba(255, 255, 255, 0.05)' }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Games Grid */}
                <div className="flex-1 p-8">
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                  >
                    <AnimatePresence>
                      {filteredGames.map((game, index) => (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          layout
                          className="bg-dark-secondary rounded-lg border border-border-primary overflow-hidden hover:border-accent-primary transition-colors group cursor-pointer"
                          onClick={() => handlePlayGame(game)}
                          whileHover={{ y: -4 }}
                        >
                          {/* Game Image */}
                          <div className="h-48 bg-dark-primary flex items-center justify-center">
                            <svg className="w-16 h-16 text-accent-primary" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 3a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5H8zM7 8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8z"/>
                              <circle cx="10" cy="10" r="1"/>
                              <circle cx="14" cy="10" r="1"/>
                              <circle cx="10" cy="14" r="1"/>
                              <circle cx="14" cy="14" r="1"/>
                            </svg>
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-white group-hover:text-accent-primary transition-colors">
                                {game.name}
                              </h3>
                              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(game.difficulty)} bg-opacity-20`}>
                                {game.difficulty}
                              </span>
                            </div>
                            
                            <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                              {game.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {game.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-dark-primary text-text-secondary rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <button className="w-full py-2 bg-accent-primary text-dark-primary rounded hover:bg-accent-secondary transition-colors font-medium">
                              Play Game
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
