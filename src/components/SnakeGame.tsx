'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER'

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 20
const INITIAL_SNAKE = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 }
]
const INITIAL_DIRECTION: Direction = 'RIGHT'

// Animation variants
const gameVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
  exit: { opacity: 0, scale: 0.8 }
}

const snakeSegmentVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
}

const foodVariants = {
  hidden: { scale: 0, rotate: 0 },
  visible: { 
    scale: 1, 
    rotate: 360,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 10
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>('MENU')
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 0, y: 0 })
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [score, setScore] = useState(0)
  const [foodLeft, setFoodLeft] = useState(10)

  const generateFood = useCallback((): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setScore(0)
    setFoodLeft(10)
    // Generate initial food
    const initialFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    setFood(initialFood)
  }, [])

  const startGame = () => {
    resetGame()
    setGameState('PLAYING')
  }

  const skipGame = () => {
    setGameState('GAME_OVER')
    setScore(10) // Simulate completing the game
    setFoodLeft(0)
  }

  const moveSnake = useCallback(() => {
    if (gameState !== 'PLAYING') return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('GAME_OVER')
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('GAME_OVER')
        return currentSnake
      }

      // Add new head
      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        // Don't remove tail (snake grows)
        setScore(s => s + 1)
        setFoodLeft(f => {
          const newFoodLeft = f - 1
          if (newFoodLeft <= 0) {
            setGameState('GAME_OVER')
          }
          return newFoodLeft
        })
        
        // Generate new food
        setTimeout(() => {
          setFood(generateFood())
        }, 0)
      } else {
        // Remove tail (snake doesn't grow)
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameState, generateFood])

  // Game loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return

    const gameInterval = setInterval(moveSnake, 200) // Slower speed for better playability
    return () => clearInterval(gameInterval)
  }, [moveSnake, gameState])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setDirection(current => current !== 'DOWN' ? 'UP' : current)
          break
        case 'ArrowDown':
          e.preventDefault()
          setDirection(current => current !== 'UP' ? 'DOWN' : current)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setDirection(current => current !== 'RIGHT' ? 'LEFT' : current)
          break
        case 'ArrowRight':
          e.preventDefault()
          setDirection(current => current !== 'LEFT' ? 'RIGHT' : current)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState])

  const renderGrid = () => {
    const grid = []
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y
        const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y)
        const isFood = food.x === x && food.y === y

        grid.push(
          <motion.div
            key={`${x}-${y}`}
            className={`w-1.5 h-1.5 lg:w-2 lg:h-2 ${
              isSnakeHead 
                ? 'bg-accent-teal border border-accent-teal/50 rounded-sm shadow-lg' 
                : isSnakeBody 
                ? 'bg-accent-teal/80 rounded-sm'
                : isFood
                ? 'bg-red-500 rounded-full'
                : 'bg-transparent'
            }`}
            variants={isSnakeHead || isSnakeBody ? snakeSegmentVariants : isFood ? foodVariants : {}}
            initial={isSnakeHead || isSnakeBody || isFood ? "hidden" : "visible"}
            animate={
              isFood 
                ? "pulse" 
                : isSnakeHead || isSnakeBody 
                ? "visible" 
                : "visible"
            }
            layout
            transition={{
              layout: { duration: 0.1 }
            }}
          />
        )
      }
    }
    return grid
  }

  const FoodDot = () => (
    <div className="relative w-5 h-5">
      <div className="absolute inset-0 bg-accent-teal opacity-10 rounded-full" />
      <div className="absolute inset-[3px] bg-accent-teal opacity-20 rounded-full" />
      <div className="absolute inset-[6px] bg-accent-teal rounded-full" />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-8 bg-gradient-to-br from-[#175553] to-[#43D9AD]/13 border border-dark-border rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.3)] backdrop-blur-[64px] max-w-full"
    >
      {/* Game Area */}
      <div className="relative mx-auto lg:mx-0">
        <div className="w-[200px] lg:w-[239px] h-[320px] lg:h-[405px] bg-code-surface rounded-lg shadow-[inset_1px_5px_11px_0px_rgba(2,18,27,0.71)] overflow-hidden">
          <AnimatePresence mode="wait">
            {gameState === 'MENU' ? (
              <motion.div
                key="menu"
                variants={gameVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center h-full gap-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-accent-teal text-lg font-bold mb-2">Snake Game</h3>
                  <p className="text-text-secondary text-xs">Use arrow keys to play</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={startGame}
                    variant="primary"
                    className="px-3 py-2.5 text-sm"
                  >
                    start-game
                  </Button>
                </motion.div>
              </motion.div>
            ) : gameState === 'GAME_OVER' ? (
              <motion.div
                key="gameover"
                variants={gameVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center h-full gap-4 p-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="text-center"
                >
                  <p className="text-accent-orange font-fira text-sm mb-2">Game Over!</p>
                  <p className="text-text-secondary font-fira text-xs">Score: {score}/10</p>
                  {score >= 10 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-accent-green font-fira text-xs mt-1"
                    >
                      🎉 Perfect!
                    </motion.p>
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={startGame}
                    variant="primary"
                    className="px-3 py-2.5 text-xs"
                  >
                    play-again
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2 lg:p-4 h-full flex flex-col"
              >
                <div className="grid grid-cols-20 gap-px flex-1">
                  {renderGrid()}
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs text-text-secondary font-fira">Score: {score}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative bolts */}
        <div className="absolute top-3 left-3 w-3 h-3">
          <div className="w-full h-full bg-gradient-radial from-[#196C6A] to-[#114B4A] rounded-full shadow-[2px_2px_4px_0px_rgba(13,67,65,1),inset_0px_1px_2px_0px_rgba(26,130,119,1)]" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3">
          <div className="w-full h-full bg-gradient-radial from-[#164C51] to-[#0D3A40] rounded-full shadow-[2px_2px_4px_0px_rgba(9,45,50,1),inset_0px_1px_2px_0px_rgba(22,100,92,1)]" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3">
          <div className="w-full h-full bg-gradient-radial from-[#234B7C] to-[#122E4F] rounded-full shadow-[2px_2px_4px_0px_rgba(18,44,78,1),inset_0px_1px_2px_0px_rgba(44,88,141,1)]" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3">
          <div className="w-full h-full bg-gradient-radial from-[#217D7A] to-[#114B4A] rounded-full shadow-[2px_2px_4px_0px_rgba(13,67,65,1),inset_0px_1px_2px_0px_rgba(31,129,119,1)]" />
        </div>
      </div>

      {/* Controls & Info */}
      <div className="flex flex-row lg:flex-col justify-between lg:justify-between lg:h-[320px] xl:h-[405px] gap-4 lg:gap-0">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Game Controls */}
          <div className="flex flex-col items-center gap-2 lg:gap-3 p-2 lg:p-2.5 bg-code-surface rounded-lg">
            <p className="text-xs lg:text-sm font-fira text-text-primary leading-[1.4] text-center">
              {/* use keyboard */}<br />
              {/* arrows to play */}
            </p>
            
            <div className="flex flex-col items-center gap-1 lg:gap-2">
              {/* Up arrow */}
              <button
                onClick={() => setDirection(current => current !== 'DOWN' ? 'UP' : current)}
                className="w-8 lg:w-12 h-6 lg:h-8 bg-black border border-dark-border rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Image
                  src="/images/arrow-icon.svg"
                  alt="Up"
                  width={14}
                  height={14}
                  className="lg:w-[18px] lg:h-[18px] rotate-180"
                />
              </button>
              
              {/* Bottom row */}
              <div className="flex gap-1 lg:gap-2">
                <button
                  onClick={() => setDirection(current => current !== 'RIGHT' ? 'LEFT' : current)}
                  className="w-8 lg:w-12 h-6 lg:h-8 bg-black border border-dark-border rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src="/images/arrow-icon.svg"
                    alt="Left"
                    width={14}
                    height={14}
                    className="lg:w-[18px] lg:h-[18px] rotate-90"
                  />
                </button>
                <button
                  onClick={() => setDirection(current => current !== 'UP' ? 'DOWN' : current)}
                  className="w-8 lg:w-12 h-6 lg:h-8 bg-black border border-dark-border rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src="/images/arrow-icon.svg"
                    alt="Down"
                    width={14}
                    height={14}
                    className="lg:w-[18px] lg:h-[18px]"
                  />
                </button>
                <button
                  onClick={() => setDirection(current => current !== 'LEFT' ? 'RIGHT' : current)}
                  className="w-8 lg:w-12 h-6 lg:h-8 bg-black border border-dark-border rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src="/images/arrow-icon.svg"
                    alt="Right"
                    width={14}
                    height={14}
                    className="lg:w-[18px] lg:h-[18px] -rotate-90"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Food Left */}
          <div className="flex flex-col items-center gap-2 px-2.5">
            <p className="text-xs lg:text-sm font-fira text-text-primary leading-[1.4]">
              {/* food left */}
            </p>
            <div className="flex flex-col gap-2 w-[100px] lg:w-[136px]">
              <div className="flex gap-1 lg:gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`${i < foodLeft ? 'opacity-100' : 'opacity-30'}`}>
                    <FoodDot />
                  </div>
                ))}
              </div>
              <div className="flex gap-1 lg:gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i + 5} className={`${i + 5 < foodLeft ? 'opacity-100' : 'opacity-30'}`}>
                    <FoodDot />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="flex flex-col gap-2">
          <Button 
            onClick={skipGame}
            variant="ghost-outline"
            className="px-3 py-2.5 text-sm self-center lg:self-stretch w-auto lg:w-full"
          >
            skip
          </Button>
          {gameState === 'GAME_OVER' && (
            <Button 
              onClick={() => setGameState('MENU')}
              variant="primary"
              className="px-3 py-2.5 text-xs self-center lg:self-stretch w-auto lg:w-full"
            >
              menu
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
