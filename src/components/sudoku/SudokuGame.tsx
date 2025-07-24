'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SudokuGrid } from './SudokuGrid';
import { SudokuGenerator, SudokuBoard } from './sudoku-utils';

type GameState = 'menu' | 'playing' | 'completed' | 'paused';
type Difficulty = 'easy' | 'medium' | 'hard';

interface SudokuGameProps {
  className?: string;
}

export function SudokuGame({ className = '' }: SudokuGameProps) {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [initialBoard, setInitialBoard] = useState<SudokuBoard>([]);
  const [solution, setSolution] = useState<SudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hints, setHints] = useState(3);

  // Initialize empty error matrix
  const initializeErrors = () => {
    return Array(9).fill(null).map(() => Array(9).fill(false));
  };

  // Start new game
  const startNewGame = useCallback((selectedDifficulty: Difficulty = difficulty) => {
    const generator = new SudokuGenerator();
    const { puzzle, solution: gameSolution } = generator.generateSudoku(selectedDifficulty);
    
    setBoard(puzzle.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSolution(gameSolution);
    setErrors(initializeErrors());
    setSelectedCell(null);
    setMistakes(0);
    setElapsedTime(0);
    setHints(3);
    setGameState('playing');
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState !== 'playing' || initialBoard[row][col] !== null) return;
    setSelectedCell({ row, col });
  }, [gameState, initialBoard]);

  // Handle number input
  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== null) return;

    const newBoard = board.map(r => [...r]);
    
    if (num === 0) {
      // Clear cell
      newBoard[row][col] = null;
    } else {
      newBoard[row][col] = num;
    }
    
    setBoard(newBoard);
    
    // Calculate errors for the entire board
    const newErrors = SudokuGenerator.getBoardErrors(newBoard);
    setErrors(newErrors);
    
    // Count mistakes (only count new errors)
    const errorCount = newErrors.flat().filter(Boolean).length;
    const previousErrorCount = errors.flat().filter(Boolean).length;
    if (errorCount > previousErrorCount) {
      setMistakes(prev => prev + (errorCount - previousErrorCount));
    }
    
    // Check if game is completed
    if (SudokuGenerator.isBoardComplete(newBoard) && !newErrors.some(row => row.some(cell => cell))) {
      setGameState('completed');
    }
  }, [selectedCell, gameState, board, initialBoard, errors]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const key = e.key;
      if (key >= '1' && key <= '9') {
        handleNumberInput(parseInt(key));
      } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        handleNumberInput(0);
      } else if (key === 'Escape') {
        setSelectedCell(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handleNumberInput]);

  // Use hint
  const useHint = () => {
    if (hints <= 0 || !selectedCell || gameState !== 'playing') return;
    
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== null || board[row][col] !== null) return;
    
    const correctValue = solution[row][col];
    if (correctValue) {
      handleNumberInput(correctValue);
      setHints(prev => prev - 1);
    }
  };

  // Render number pad
  const renderNumberPad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    return (
      <div className="grid grid-cols-3 gap-2 max-w-[120px]">
        {numbers.map((num) => (
          <motion.button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={gameState !== 'playing'}
          >
            {num}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6 p-8 bg-dark-secondary rounded-lg border border-border-primary"
          >
            <h2 className="text-2xl font-bold text-white">Sudoku</h2>
            <p className="text-text-secondary">Choose your difficulty level</p>
            
            <div className="space-y-3">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <motion.button
                  key={diff}
                  onClick={() => {
                    setDifficulty(diff);
                    startNewGame(diff);
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    diff === 'easy' 
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : diff === 'medium'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Game Stats */}
            <div className="flex justify-between items-center bg-dark-secondary rounded-lg p-4 border border-border-primary">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Time</div>
                <div className="text-lg font-bold text-white">{formatTime(elapsedTime)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Mistakes</div>
                <div className="text-lg font-bold text-red-400">{mistakes}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Hints</div>
                <div className="text-lg font-bold text-yellow-400">{hints}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary capitalize">{difficulty}</div>
                <div className="text-lg font-bold text-accent-primary">Level</div>
              </div>
            </div>

            {/* Game Grid */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <SudokuGrid
                board={board}
                initialBoard={initialBoard}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
                errors={errors}
              />
              
              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Numbers</h3>
                  {renderNumberPad()}
                </div>
                
                <div className="space-y-2">
                  <motion.button
                    onClick={() => handleNumberInput(0)}
                    className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear
                  </motion.button>
                  
                  <motion.button
                    onClick={useHint}
                    disabled={hints <= 0 || !selectedCell}
                    className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
                    whileHover={{ scale: hints > 0 && selectedCell ? 1.02 : 1 }}
                    whileTap={{ scale: hints > 0 && selectedCell ? 0.98 : 1 }}
                  >
                    Hint ({hints})
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setGameState('menu')}
                    className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    New Game
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6 p-8 bg-dark-secondary rounded-lg border border-border-primary"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
              <p className="text-text-secondary mt-2">You solved the {difficulty} puzzle!</p>
            </motion.div>
            
            <div className="bg-dark-primary rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Time:</span>
                <span className="text-white font-medium">{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Mistakes:</span>
                <span className="text-white font-medium">{mistakes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Hints Used:</span>
                <span className="text-white font-medium">{3 - hints}</span>
              </div>
            </div>
            
            <motion.button
              onClick={() => setGameState('menu')}
              className="py-3 px-6 bg-accent-primary hover:bg-accent-secondary text-dark-primary rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
