import type { TetrominoType, Shape } from '../types/game';

interface TetrominoDefinition {
  shape: Shape;
  color: string;
}

export const TETROMINOES: Record<TetrominoType, TetrominoDefinition> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'neo-cyan',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'neo-yellow',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'neo-magenta',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'neo-green',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'neo-red',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'neo-blue',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'neo-orange',
  },
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: 'bg-neo-cyan',
  O: 'bg-neo-yellow',
  T: 'bg-neo-magenta',
  S: 'bg-neo-green',
  Z: 'bg-neo-red',
  J: 'bg-neo-blue',
  L: 'bg-neo-orange',
};

const TETROMINO_TYPES: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

export function getRandomTetrominoType(): TetrominoType {
  return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
}
