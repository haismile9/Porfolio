// Sudoku game types and utilities

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

// Calculate real cell index from subgrid and cell indices
export function calcCellRealIndex(subgridIndex: number, cellIndex: number): [number, number] {
  const startx = subgridIndex % 3;
  const starty = Math.floor(subgridIndex / 3);

  const cellx = cellIndex % 3;
  const celly = Math.floor(cellIndex / 3);

  return [startx * 3 + cellx, starty * 3 + celly];
}

// Check if a row is valid (no duplicate numbers)
function isRowValid(board: number[][], rowIndex: number): boolean {
  let numbersBitset = 0;

  for (let i = 0; i < 9; i++) {
    const cellValue = board[rowIndex][i];
    if (cellValue === 0 || cellValue === null) {
      continue;
    }

    if (numbersBitset & (1 << cellValue)) {
      return false;
    }

    numbersBitset |= (1 << cellValue);
  }

  return true;
}

// Check if a column is valid (no duplicate numbers)
function isColumnValid(board: number[][], columnIndex: number): boolean {
  let numbersBitset = 0;

  for (let i = 0; i < 9; i++) {
    const cellValue = board[i][columnIndex];
    if (cellValue === 0 || cellValue === null) {
      continue;
    }

    if (numbersBitset & (1 << cellValue)) {
      return false;
    }

    numbersBitset |= (1 << cellValue);
  }

  return true;
}

// Check if a 3x3 subgrid is valid (no duplicate numbers)
function isSubgridValid(board: number[][], subgridIndex: number): boolean {
  let numbersBitset = 0;

  for (let i = 0; i < 9; i++) {
    const [x, y] = calcCellRealIndex(subgridIndex, i);
    const cellValue = board[y][x];
    
    if (cellValue === 0 || cellValue === null) {
      continue;
    }

    if (numbersBitset & (1 << cellValue)) {
      return false;
    }

    numbersBitset |= (1 << cellValue);
  }

  return true;
}

// Get valid cells in a subgrid for a specific answer
function getSubgridValidCells(board: number[][], subgridIndex: number, answer: number): [number, number][] {
  let indices: [number, number][] = [];

  for (let i = 0; i < 9; i++) {
    const cellIndex = calcCellRealIndex(subgridIndex, i);
    const originalCellValue = board[cellIndex[1]][cellIndex[0]];

    if (originalCellValue !== 0 && originalCellValue !== null) {
      continue;
    }
    
    board[cellIndex[1]][cellIndex[0]] = answer;

    if (isRowValid(board, cellIndex[1]) && isColumnValid(board, cellIndex[0])) {
      indices.push(cellIndex);
    }

    board[cellIndex[1]][cellIndex[0]] = originalCellValue;
  }

  return indices;
}

function randrange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// Generate a complete Sudoku board
export function generateBoard(): number[][] {
  function generateBoardUncertain(): number[][] | null {
    let board: number[][] = [];

    for (let j = 0; j < 9; j++) {
      let row: number[] = [];
      for (let i = 0; i < 9; i++) {
        row.push(0);
      }
      board.push(row);
    }

    for (let digit = 1; digit <= 9; digit++) {
      for (let subgridIndex = 0; subgridIndex < 9; subgridIndex++) {
        const validCells = getSubgridValidCells(board, subgridIndex, digit);

        if (validCells.length === 0) {
          return null;
        }

        const cellIndex = randrange(0, validCells.length);
        const cell = validCells[cellIndex];
        board[cell[1]][cell[0]] = digit;
      }
    }

    return board;
  }

  let board: number[][] | null = null;
  while (board === null) {
    board = generateBoardUncertain();
  }

  return board;
}

// Remove cells from board to create puzzle
export function removeCellsFromBoard(board: number[][], numberOfCells: number): void {
  const availableCells: number[] = Array.from({ length: 81 }, (_, index) => index);

  for (let i = 0; i < numberOfCells; i++) {
    const cellListIndex = randrange(0, availableCells.length);
    const cellIndex = availableCells[cellListIndex];

    const cellX = cellIndex % 9;
    const cellY = Math.floor(cellIndex / 9);
    
    board[cellY][cellX] = 0;
    availableCells.splice(cellListIndex, 1);
  }
}

// Convert 0s to nulls for our board format
function convertBoard(board: number[][]): SudokuBoard {
  return board.map(row => row.map(cell => cell === 0 ? null : cell));
}

export class SudokuGenerator {
  private board: SudokuBoard;
  private solution: SudokuBoard;

  constructor() {
    this.board = this.createEmptyBoard();
    this.solution = this.createEmptyBoard();
  }

  private createEmptyBoard(): SudokuBoard {
    return Array(9).fill(null).map(() => Array(9).fill(null));
  }

  private isValid(board: SudokuBoard, row: number, col: number, num: number): boolean {
    // Convert to number format for validation
    const numBoard = board.map(r => r.map(c => c === null ? 0 : c));
    numBoard[row][col] = num;
    
    return isRowValid(numBoard, row) && 
           isColumnValid(numBoard, col) && 
           isSubgridValid(numBoard, Math.floor(row / 3) * 3 + Math.floor(col / 3));
  }

  public generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): { puzzle: SudokuBoard; solution: SudokuBoard } {
    // Generate a complete solution using the optimized algorithm
    const solution = generateBoard();
    
    // Create a puzzle by removing numbers
    const puzzle = solution.map(row => [...row]);
    
    const cellsToRemove = {
      easy: 35,
      medium: 45,
      hard: 55
    }[difficulty];

    removeCellsFromBoard(puzzle, cellsToRemove);

    return { 
      puzzle: convertBoard(puzzle), 
      solution: convertBoard(solution) 
    };
  }

  public static isValidMove(board: SudokuBoard, row: number, col: number, num: number): boolean {
    // Convert to number format for validation
    const numBoard = board.map(r => r.map(c => c === null ? 0 : c));
    numBoard[row][col] = num;
    
    return isRowValid(numBoard, row) && 
           isColumnValid(numBoard, col) && 
           isSubgridValid(numBoard, Math.floor(row / 3) * 3 + Math.floor(col / 3));
  }

  public static isBoardComplete(board: SudokuBoard): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) return false;
      }
    }
    return true;
  }

  public static getBoardErrors(board: SudokuBoard): boolean[][] {
    const errors = Array(9).fill(null).map(() => Array(9).fill(false));
    const numBoard = board.map(r => r.map(c => c === null ? 0 : c));

    // Check each cell for conflicts
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = numBoard[row][col];
        if (value === 0) continue;

        // Temporarily remove the value to check for conflicts
        numBoard[row][col] = 0;
        
        // Check if placing the value would be valid
        if (!isRowValid([...numBoard.map(r => [...r])].map((r, i) => 
          i === row ? r.map((c, j) => j === col ? value : c) : r
        ), row) ||
        !isColumnValid([...numBoard.map(r => [...r])].map(r => 
          r.map((c, j) => j === col ? (numBoard.findIndex(row => row === r) === row ? value : c) : c)
        ), col) ||
        !isSubgridValid([...numBoard.map(r => [...r])].map((r, i) => 
          r.map((c, j) => (i === row && j === col) ? value : c)
        ), Math.floor(row / 3) * 3 + Math.floor(col / 3))) {
          errors[row][col] = true;
        }

        // Restore the value
        numBoard[row][col] = value;
      }
    }

    return errors;
  }
}
