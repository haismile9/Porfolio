'use client';

import { motion } from 'framer-motion';
import { SudokuSubgrid } from './SudokuSubgrid';
import { SudokuBoard } from './sudoku-utils';

interface SudokuGridProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  errors: boolean[][];
}

export function SudokuGrid({
  board,
  initialBoard,
  selectedCell,
  onCellClick,
  errors
}: SudokuGridProps) {
  const subgrids = [];
  
  for (let subgridRow = 0; subgridRow < 3; subgridRow++) {
    for (let subgridCol = 0; subgridCol < 3; subgridCol++) {
      const startRow = subgridRow * 3;
      const startCol = subgridCol * 3;
      
      subgrids.push(
        <SudokuSubgrid
          key={`${subgridRow}-${subgridCol}`}
          board={board}
          initialBoard={initialBoard}
          selectedCell={selectedCell}
          onCellClick={onCellClick}
          startRow={startRow}
          startCol={startCol}
          errors={errors}
        />
      );
    }
  }

  return (
    <motion.div
      className="grid grid-cols-3 gap-2 p-4 bg-gray-100 rounded-lg border-4 border-gray-800"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {subgrids}
    </motion.div>
  );
}
