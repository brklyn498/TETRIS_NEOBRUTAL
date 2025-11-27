export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const CELL_SIZE = 28; // pixels

export const INITIAL_DROP_SPEED = 1000; // milliseconds
export const MIN_DROP_SPEED = 100; // fastest speed
export const SPEED_DECREMENT = 75; // ms faster per level

export const LINES_PER_LEVEL = 10;

// Points for clearing 1, 2, 3, 4 lines respectively
export const POINTS_TABLE = [0, 100, 300, 500, 800];

// Starting position for new pieces (top center)
export const SPAWN_POSITION = {
  x: Math.floor(BOARD_WIDTH / 2) - 1,
  y: 0,
};
