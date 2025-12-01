export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const CELL_SIZE = 28; // pixels

export const MIN_DROP_SPEED = 100; // fastest speed
export const DIFFICULTY_SETTINGS = {
  EASY: {
    initialSpeed: 1000,
    decrement: 50,
  },
  MEDIUM: {
    initialSpeed: 800,
    decrement: 75,
  },
  HARD: {
    initialSpeed: 500,
    decrement: 100,
  },
};

export const LINES_PER_LEVEL = 10;

// Points for clearing 1, 2, 3, 4 lines respectively
export const POINTS_TABLE = [0, 100, 300, 500, 800];

// Starting position for new pieces (top center)
export const SPAWN_POSITION = {
  x: Math.floor(BOARD_WIDTH / 2) - 1,
  y: 0,
};
