import { Board, CellValue, Tetromino, Position, Shape, TetrominoType } from '../types/game';
import { BOARD_WIDTH, BOARD_HEIGHT, SPAWN_POSITION, POINTS_TABLE } from '../constants/game';
import { TETROMINOES, getRandomTetrominoType } from '../constants/tetrominoes';

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

export function createTetromino(type: TetrominoType): Tetromino {
  return {
    shape: TETROMINOES[type].shape.map(row => [...row]),
    type,
    position: { ...SPAWN_POSITION },
  };
}

export function createRandomTetromino(): Tetromino {
  return createTetromino(getRandomTetrominoType());
}

export function checkCollision(
  board: Board,
  shape: Shape,
  position: Position
): boolean {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return true;
        }

        // Check collision with existing pieces (only if within board)
        if (newY >= 0 && board[newY][newX] !== null) {
          return true;
        }
      }
    }
  }
  return false;
}

export function rotatePiece(shape: Shape): Shape {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: Shape = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  );

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      rotated[x][rows - 1 - y] = shape[y][x];
    }
  }

  return rotated;
}

export function mergePieceToBoard(board: Board, piece: Tetromino): Board {
  const newBoard = board.map(row => [...row]);
  const { shape, type, position } = piece;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardY = position.y + y;
        const boardX = position.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = type;
        }
      }
    }
  }

  return newBoard;
}

export function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }

  return { newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  return POINTS_TABLE[linesCleared] * (level + 1);
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

export function getGhostPosition(board: Board, piece: Tetromino): Position {
  let ghostY = piece.position.y;

  while (!checkCollision(board, piece.shape, { x: piece.position.x, y: ghostY + 1 })) {
    ghostY++;
  }

  return { x: piece.position.x, y: ghostY };
}
