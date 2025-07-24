'use client';

import { motion } from 'framer-motion';
import { SudokuCell } from './SudokuCell';
import { SudokuBoard } from './sudoku-utils';

interface SudokuSubgridProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  startRow: number;
  startCol: number;
  errors: boolean[][];
}

export function SudokuSubgrid({
  board,
  initialBoard,
  selectedCell,
  onCellClick,
  startRow,
  startCol,
  errors
}: SudokuSubgridProps) {
  const cells = [];
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const row = startRow + i;
      const col = startCol + j;
      const value = board[row][col];
      const isInitial = initialBoard[row][col] !== null;
      const isSelected = selectedCell?.row === row && selectedCell?.col === col;
      const isHighlighted = selectedCell && (
        selectedCell.row === row || 
        selectedCell.col === col ||
        (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && 
         Math.floor(selectedCell.col / 3) === Math.floor(col / 3)) ||
        (value !== null && value === board[selectedCell.row][selectedCell.col])
      );
      const hasError = errors[row][col];
      
      cells.push(
        <SudokuCell
          key={`${row}-${col}`}
          value={value}
          isInitial={isInitial}
          isSelected={isSelected}
          isHighlighted={!!isHighlighted}
          hasError={hasError}
          onClick={() => onCellClick(row, col)}
          row={row}
          col={col}
        />
      );
    }
  }

  return (
    <motion.div
      className="grid grid-cols-3 gap-0 border-2 border-gray-600 bg-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (startRow / 3) * 0.1 + (startCol / 3) * 0.05 }}
    >
      {cells}
    </motion.div>
  );
}
