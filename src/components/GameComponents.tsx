// Game Components
import { BreakoutGame } from './breakout/BreakoutGame';
export type SudokuBoard = (number | null)[][];
export type SudokuCell = {
  row: number;
  col: number;
  value: number | null;
  isInitial: boolean;
  isHighlighted: boolean;
  hasError: boolean;
};

export interface SudokuGameState {
  board: SudokuBoard;
  solution: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  mistakes: number;
  elapsedTime: number;
}

interface GameComponentProps {
  className?: string;
}


export function SudokuGameComponent({ className = '' }: GameComponentProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="text-center">
        <div className="text-lg font-bold text-white mb-2">Sudoku</div>
        <div className="w-80 h-80 border border-border-primary rounded-lg bg-dark-secondary flex items-center justify-center">
          <div className="text-text-secondary">Coming Soon!</div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <button
          disabled
          className="px-4 py-2 bg-gray-500 text-white rounded opacity-50 cursor-not-allowed"
        >
          Not Available Yet
        </button>
        <div className="text-xs text-text-secondary max-w-xs">
          Classic number puzzle game - In development
        </div>
      </div>
    </div>
  );
}

export function TetrisGameComponent({ className = '' }: GameComponentProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="text-center">
        <div className="text-lg font-bold text-white mb-2">Tetris</div>
        <div className="w-80 h-96 border border-border-primary rounded-lg bg-dark-secondary flex items-center justify-center">
          <div className="text-text-secondary">Coming Soon!</div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <button
          disabled
          className="px-4 py-2 bg-gray-500 text-white rounded opacity-50 cursor-not-allowed"
        >
          Not Available Yet
        </button>
        <div className="text-xs text-text-secondary max-w-xs">
          Classic Tetris gameplay - In development
        </div>
      </div>
    </div>
  );
}

export function PongGameComponent({ className = '' }: GameComponentProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="text-center">
        <div className="text-lg font-bold text-white mb-2">Pong</div>
        <div className="w-96 h-64 border border-border-primary rounded-lg bg-dark-secondary flex items-center justify-center">
          <div className="text-text-secondary">Coming Soon!</div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <button
          disabled
          className="px-4 py-2 bg-gray-500 text-white rounded opacity-50 cursor-not-allowed"
        >
          Not Available Yet
        </button>
        <div className="text-xs text-text-secondary max-w-xs">
          Classic Pong arcade game - In development
        </div>
      </div>
    </div>
  );
}

export function BreakoutGameComponent({ className = '' }: GameComponentProps) {
  return <BreakoutGame className={className} />;
}

export function SpaceInvadersGameComponent({ className = '' }: GameComponentProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="text-center">
        <div className="text-lg font-bold text-white mb-2">Space Invaders</div>
        <div className="w-80 h-96 border border-border-primary rounded-lg bg-dark-secondary flex items-center justify-center">
          <div className="text-text-secondary">Coming Soon!</div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <button
          disabled
          className="px-4 py-2 bg-gray-500 text-white rounded opacity-50 cursor-not-allowed"
        >
          Not Available Yet
        </button>
        <div className="text-xs text-text-secondary max-w-xs">
          Defend Earth from alien invasion! - In development
        </div>
      </div>
    </div>
  );
}
