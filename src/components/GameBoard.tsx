import { Cell } from './Cell';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from '../constants/game';
import type { Board, Tetromino, CellValue } from '../types/game';
import { getGhostPosition } from '../utils/gameUtils';

interface GameBoardProps {
  board: Board;
  currentPiece: Tetromino | null;
}

export function GameBoard({ board, currentPiece }: GameBoardProps) {
  // Create a display board that includes the current piece and ghost
  const displayBoard: CellValue[][] = board.map(row => [...row]);
  const ghostBoard: boolean[][] = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => false)
  );

  // Add ghost piece
  if (currentPiece) {
    const ghostPos = getGhostPosition(board, currentPiece);

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = ghostPos.y + y;
          const boardX = ghostPos.x + x;

          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH &&
            !displayBoard[boardY][boardX]
          ) {
            ghostBoard[boardY][boardX] = true;
            displayBoard[boardY][boardX] = currentPiece.type;
          }
        }
      }
    }
  }

  // Add current piece (overwrites ghost)
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;

          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            displayBoard[boardY][boardX] = currentPiece.type;
            ghostBoard[boardY][boardX] = false;
          }
        }
      }
    }
  }

  return (
    <div
      className="border-4 border-neo-black shadow-brutal-lg bg-gray-200 p-1"
      style={{
        width: BOARD_WIDTH * CELL_SIZE + 8,
      }}
    >
      <div className="flex flex-col">
        {displayBoard.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                value={cell}
                isGhost={ghostBoard[y][x]}
                size={CELL_SIZE}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
