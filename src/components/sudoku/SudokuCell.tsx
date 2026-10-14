'use client';

import { motion } from 'framer-motion';

interface SudokuCellProps {
  value: number | null;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  hasError: boolean;
  onClick: () => void;
  row: number;
  col: number;
}

export function SudokuCell({
  value,
  isInitial,
  isSelected,
  isHighlighted,
  hasError,
  onClick,
  row,
  col
}: SudokuCellProps) {
  const getBorderClasses = () => {
    const borders = [];
    
    // Thick borders for 3x3 subgrids
    if (row % 3 === 0) borders.push('border-t-2');
    if (row === 8) borders.push('border-b-2');
    if (col % 3 === 0) borders.push('border-l-2');
    if (col === 8) borders.push('border-r-2');
    
    // Regular borders
    if (row % 3 !== 0) borders.push('border-t');
    if (row !== 8) borders.push('border-b');
    if (col % 3 !== 0) borders.push('border-l');
    if (col !== 8) borders.push('border-r');
    
    return borders.join(' ');
  };

  const getCellClasses = () => {
    const baseClasses = `
      w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-sm lg:text-base font-medium
      cursor-pointer transition-all duration-200 relative
    `;
    
    let bgClasses = '';
    let textClasses = '';
    let borderClasses = 'border-gray-400';
    
    if (isSelected) {
      bgClasses = 'bg-blue-100';
      textClasses = hasError ? 'text-red-600 font-bold' : isInitial ? 'text-gray-800 font-bold' : 'text-blue-600 font-semibold';
      borderClasses = 'border-blue-500 border-2';
    } else if (isHighlighted) {
      bgClasses = 'bg-blue-50 hover:bg-blue-100';
      textClasses = hasError ? 'text-red-600 font-bold' : isInitial ? 'text-gray-800 font-bold' : 'text-blue-500';
    } else {
      bgClasses = 'bg-white hover:bg-gray-50';
      textClasses = hasError ? 'text-red-600 font-bold' : isInitial ? 'text-gray-800 font-bold' : 'text-blue-600';
    }
    
    return `${baseClasses} ${bgClasses} ${textClasses} ${borderClasses} ${getBorderClasses()}`;
  };

  return (
    <motion.button
      onClick={onClick}
      className={getCellClasses()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (row * 9 + col) * 0.01 }}
    >
      {value && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {value}
        </motion.span>
      )}
      
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
    </motion.button>
  );
}
