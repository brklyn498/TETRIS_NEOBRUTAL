import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  checkCollision,
  rotatePiece,
  clearLines,
  calculateScore,
} from './gameUtils';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/game';
import type { Shape } from '../types/game';

describe('gameUtils', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(BOARD_HEIGHT);
      expect(board[0].length).toBe(BOARD_WIDTH);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe('checkCollision', () => {
    const emptyBoard = createEmptyBoard();
    const shape: Shape = [
      [1, 1],
      [1, 1],
    ]; // O piece

    it('should not detect collision for valid position', () => {
      const position = { x: 0, y: 0 };
      expect(checkCollision(emptyBoard, shape, position)).toBe(false);
    });

    it('should detect collision with left wall', () => {
      const position = { x: -1, y: 0 };
      expect(checkCollision(emptyBoard, shape, position)).toBe(true);
    });

    it('should detect collision with right wall', () => {
      const position = { x: BOARD_WIDTH - 1, y: 0 };
      expect(checkCollision(emptyBoard, shape, position)).toBe(true);
    });

    it('should detect collision with floor', () => {
      const position = { x: 0, y: BOARD_HEIGHT - 1 };
      expect(checkCollision(emptyBoard, shape, position)).toBe(true);
    });

    it('should detect collision with another piece', () => {
      const board = createEmptyBoard();
      board[1][0] = 'I'; // Place a block at (0, 1)
      const position = { x: 0, y: 0 }; // Trying to place O piece at (0, 0), it occupies (0,0), (1,0), (0,1), (1,1)
      // The cell at (0,1) overlaps with the placed block
      expect(checkCollision(board, shape, position)).toBe(true);
    });
  });

  describe('rotatePiece', () => {
    it('should rotate a shape 90 degrees clockwise', () => {
      // T shape
      // 0 1 0
      // 1 1 1
      // 0 0 0
      const shape: Shape = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];

      // Expected after rotation:
      // 0 1 0
      // 0 1 1
      // 0 1 0
      const expected: Shape = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ];

      expect(rotatePiece(shape)).toEqual(expected);
    });
  });

  describe('clearLines', () => {
    it('should clear full lines and return new board with lines cleared count', () => {
      const board = createEmptyBoard();
      // Fill the last row
      board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill('I');

      const { newBoard, linesCleared } = clearLines(board);

      expect(linesCleared).toBe(1);
      // The last row should now be empty (actually, it shifts down, so top is empty)
      // The board size should remain same
      expect(newBoard.length).toBe(BOARD_HEIGHT);
      // The bottom row should be empty now because we only had one full row which got cleared
      // Wait, if we clear the bottom row, the row above it moves down.
      // Since the row above was empty (default), the new bottom row should be empty (null).
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
    });

    it('should return 0 lines cleared if no full lines', () => {
        const board = createEmptyBoard();
        const { linesCleared } = clearLines(board);
        expect(linesCleared).toBe(0);
    });
  });

  describe('calculateScore', () => {
    it('should calculate score correctly based on lines cleared and level', () => {
        // POINTS_TABLE = [0, 100, 300, 500, 800];
        // Score = POINTS_TABLE[linesCleared] * (level + 1)
        expect(calculateScore(1, 0)).toBe(100);
        expect(calculateScore(2, 0)).toBe(300);
        expect(calculateScore(4, 0)).toBe(800);
        expect(calculateScore(1, 1)).toBe(200); // 100 * 2
    });
  });
});
