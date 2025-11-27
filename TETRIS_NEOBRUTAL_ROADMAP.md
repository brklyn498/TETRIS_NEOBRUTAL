# 🎮 Tetris Neobrutalist — Development Roadmap

> **Repository:** https://github.com/brklyn498/tetris_neobrutal  
> **AI Agent:** Gemini CLI  
> **Design System:** Neobrutalism

---

## 📋 Project Overview

A fully functional Tetris game featuring bold Neobrutalist UI design. All code must be created and committed directly to the GitHub repository from the very first step.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18+ |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Management | React useReducer |
| Version Control | Git + GitHub |

---

## 🎨 Neobrutalism Design Principles

```
- Thick black borders (3-4px solid black)
- Hard drop shadows (no blur, offset 4-8px)
- Bold saturated colors (yellow, cyan, magenta, red)
- Monospace or bold sans-serif typography
- High contrast (black on bright colors)
- Raw, unpolished aesthetic
- Interactive states: shadows shift on hover/click
```

---

## 📁 Project Structure

```
tetris_neobrutal/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── Panel.tsx
│   │   ├── GameBoard.tsx
│   │   ├── ActivePiece.tsx
│   │   ├── NextPiece.tsx
│   │   ├── ScorePanel.tsx
│   │   ├── LevelPanel.tsx
│   │   ├── Controls.tsx
│   │   └── GameOver.tsx
│   ├── hooks/
│   │   ├── useGame.ts
│   │   └── useGameReducer.ts
│   ├── utils/
│   │   └── gameUtils.ts
│   ├── constants/
│   │   ├── tetrominoes.ts
│   │   └── game.ts
│   ├── types/
│   │   └── game.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

# 🚀 PHASE 1: Repository & Project Setup

## Step 1.1 — Clone and Initialize Repository

```prompt
Clone the repository https://github.com/brklyn498/tetris_neobrutal to your local environment. 
If the repository is empty, create a README.md with the project title "Tetris Neobrutalist".
All files must be created inside this repository and committed to GitHub.

Commit message: "docs: initialize repository with README"
```

---

## Step 1.2 — Create Vite React TypeScript Project

```prompt
Inside the cloned tetris_neobrutal repository, initialize a Vite project with React and TypeScript.
Run the following commands in the repository root (not a subdirectory):

npm create vite@latest . -- --template react-ts
npm install

Remove any default Vite boilerplate content from App.tsx (keep minimal structure).
Delete App.css file (we will use Tailwind).

Commit message: "chore: initialize Vite React TypeScript project"
```

---

## Step 1.3 — Install Tailwind CSS

```prompt
Install Tailwind CSS and its dependencies:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

This creates tailwind.config.js and postcss.config.js files.

Commit message: "chore: install Tailwind CSS"
```

---

## Step 1.4 — Configure Tailwind for Neobrutalism

```prompt
Update tailwind.config.js with the following configuration:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FFDD00',
        'neo-cyan': '#00FFFF',
        'neo-magenta': '#FF00FF',
        'neo-red': '#FF3333',
        'neo-green': '#00FF66',
        'neo-orange': '#FF9933',
        'neo-blue': '#3366FF',
        'neo-white': '#FFFFFF',
        'neo-black': '#000000',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-pressed': '2px 2px 0px 0px #000000',
      },
      fontFamily: {
        'mono': ['Space Mono', 'Courier New', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}

Commit message: "style: configure Tailwind with Neobrutalist theme"
```

---

## Step 1.5 — Setup Base Styles

```prompt
Replace the contents of src/index.css with:

@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-mono bg-neo-yellow text-neo-black;
  }
}

@layer components {
  .neo-border {
    @apply border-4 border-neo-black;
  }
  
  .neo-shadow {
    @apply shadow-brutal;
  }
  
  .neo-panel {
    @apply neo-border neo-shadow bg-neo-white p-4;
  }
  
  .neo-button {
    @apply neo-border shadow-brutal bg-neo-white px-4 py-2 font-bold uppercase 
           hover:shadow-brutal-pressed hover:translate-x-1 hover:translate-y-1 
           active:shadow-none active:translate-x-1 active:translate-y-1
           transition-all duration-100;
  }
}

Commit message: "style: add Neobrutalist base styles and utilities"
```

---

# 🧩 PHASE 2: Core Game Architecture

## Step 2.1 — Define TypeScript Types

```prompt
Create the file src/types/game.ts with the following content:

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type CellValue = TetrominoType | null;

export type Board = CellValue[][];

export type Shape = number[][];

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: Shape;
  type: TetrominoType;
  position: Position;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

export interface GameState {
  board: Board;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  status: GameStatus;
}

export type GameAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'ROTATE' }
  | { type: 'HARD_DROP' }
  | { type: 'TICK' };

Commit message: "feat: add TypeScript type definitions for game"
```

---

## Step 2.2 — Create Tetromino Definitions

```prompt
Create the file src/constants/tetrominoes.ts with the following content:

import { TetrominoType, Shape } from '../types/game';

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

Commit message: "feat: add tetromino shape and color definitions"
```

---

## Step 2.3 — Create Game Constants

```prompt
Create the file src/constants/game.ts with the following content:

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

Commit message: "feat: add game configuration constants"
```

---

# ⚙️ PHASE 3: Game Logic

## Step 3.1 — Create Game Utility Functions

```prompt
Create the file src/utils/gameUtils.ts with the following content:

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

Commit message: "feat: implement core game utility functions"
```

---

## Step 3.2 — Create Game Reducer

```prompt
Create the file src/hooks/useGameReducer.ts with the following content:

import { GameState, GameAction, Tetromino } from '../types/game';
import {
  createEmptyBoard,
  createRandomTetromino,
  checkCollision,
  rotatePiece,
  mergePieceToBoard,
  clearLines,
  calculateScore,
  calculateLevel,
} from '../utils/gameUtils';

export function createInitialState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    status: 'idle',
  };
}

function spawnNewPiece(state: GameState): GameState {
  const newPiece = state.nextPiece || createRandomTetromino();
  const nextPiece = createRandomTetromino();

  // Check if spawn position is blocked (game over)
  if (checkCollision(state.board, newPiece.shape, newPiece.position)) {
    return {
      ...state,
      status: 'gameover',
    };
  }

  return {
    ...state,
    currentPiece: newPiece,
    nextPiece,
  };
}

function lockPiece(state: GameState): GameState {
  if (!state.currentPiece) return state;

  const newBoard = mergePieceToBoard(state.board, state.currentPiece);
  const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

  const newLines = state.lines + linesCleared;
  const newLevel = calculateLevel(newLines);
  const newScore = state.score + calculateScore(linesCleared, state.level);

  const stateAfterLock: GameState = {
    ...state,
    board: clearedBoard,
    currentPiece: null,
    score: newScore,
    level: newLevel,
    lines: newLines,
  };

  return spawnNewPiece(stateAfterLock);
}

function movePiece(state: GameState, dx: number, dy: number): GameState {
  if (!state.currentPiece || state.status !== 'playing') return state;

  const newPosition = {
    x: state.currentPiece.position.x + dx,
    y: state.currentPiece.position.y + dy,
  };

  if (checkCollision(state.board, state.currentPiece.shape, newPosition)) {
    // If moving down and collision, lock the piece
    if (dy > 0) {
      return lockPiece(state);
    }
    return state;
  }

  return {
    ...state,
    currentPiece: {
      ...state.currentPiece,
      position: newPosition,
    },
  };
}

function rotatePieceAction(state: GameState): GameState {
  if (!state.currentPiece || state.status !== 'playing') return state;

  const rotatedShape = rotatePiece(state.currentPiece.shape);

  // Try normal rotation
  if (!checkCollision(state.board, rotatedShape, state.currentPiece.position)) {
    return {
      ...state,
      currentPiece: {
        ...state.currentPiece,
        shape: rotatedShape,
      },
    };
  }

  // Wall kick: try moving left or right
  const kicks = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -2, y: 0 },
    { x: 2, y: 0 },
  ];

  for (const kick of kicks) {
    const kickedPosition = {
      x: state.currentPiece.position.x + kick.x,
      y: state.currentPiece.position.y + kick.y,
    };

    if (!checkCollision(state.board, rotatedShape, kickedPosition)) {
      return {
        ...state,
        currentPiece: {
          ...state.currentPiece,
          shape: rotatedShape,
          position: kickedPosition,
        },
      };
    }
  }

  return state;
}

function hardDrop(state: GameState): GameState {
  if (!state.currentPiece || state.status !== 'playing') return state;

  let newY = state.currentPiece.position.y;

  while (
    !checkCollision(state.board, state.currentPiece.shape, {
      x: state.currentPiece.position.x,
      y: newY + 1,
    })
  ) {
    newY++;
  }

  const droppedState: GameState = {
    ...state,
    currentPiece: {
      ...state.currentPiece,
      position: { ...state.currentPiece.position, y: newY },
    },
  };

  return lockPiece(droppedState);
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START': {
      const freshState = createInitialState();
      return spawnNewPiece({
        ...freshState,
        status: 'playing',
        nextPiece: createRandomTetromino(),
      });
    }

    case 'PAUSE':
      if (state.status === 'playing') {
        return { ...state, status: 'paused' };
      }
      return state;

    case 'RESUME':
      if (state.status === 'paused') {
        return { ...state, status: 'playing' };
      }
      return state;

    case 'RESTART':
      return gameReducer(createInitialState(), { type: 'START' });

    case 'MOVE_LEFT':
      return movePiece(state, -1, 0);

    case 'MOVE_RIGHT':
      return movePiece(state, 1, 0);

    case 'MOVE_DOWN':
      return movePiece(state, 0, 1);

    case 'ROTATE':
      return rotatePieceAction(state);

    case 'HARD_DROP':
      return hardDrop(state);

    case 'TICK':
      if (state.status !== 'playing') return state;
      return movePiece(state, 0, 1);

    default:
      return state;
  }
}

Commit message: "feat: implement game state reducer with all actions"
```

---

## Step 3.3 — Create Main Game Hook

```prompt
Create the file src/hooks/useGame.ts with the following content:

import { useReducer, useEffect, useCallback } from 'react';
import { gameReducer, createInitialState } from './useGameReducer';
import { INITIAL_DROP_SPEED, MIN_DROP_SPEED, SPEED_DECREMENT } from '../constants/game';

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, createInitialState());

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const moveLeft = useCallback(() => dispatch({ type: 'MOVE_LEFT' }), []);
  const moveRight = useCallback(() => dispatch({ type: 'MOVE_RIGHT' }), []);
  const moveDown = useCallback(() => dispatch({ type: 'MOVE_DOWN' }), []);
  const rotate = useCallback(() => dispatch({ type: 'ROTATE' }), []);
  const hardDrop = useCallback(() => dispatch({ type: 'HARD_DROP' }), []);

  // Calculate drop speed based on level
  const dropSpeed = Math.max(
    MIN_DROP_SPEED,
    INITIAL_DROP_SPEED - state.level * SPEED_DECREMENT
  );

  // Game tick
  useEffect(() => {
    if (state.status !== 'playing') return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, dropSpeed);

    return () => clearInterval(interval);
  }, [state.status, dropSpeed]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status === 'gameover') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          if (state.status === 'playing') {
            pause();
          } else if (state.status === 'paused') {
            resume();
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (state.status === 'idle' || state.status === 'gameover') {
            start();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.status, moveLeft, moveRight, moveDown, rotate, hardDrop, pause, resume, start]);

  return {
    state,
    actions: {
      start,
      pause,
      resume,
      restart,
      moveLeft,
      moveRight,
      moveDown,
      rotate,
      hardDrop,
    },
  };
}

Commit message: "feat: create main game hook with keyboard controls and timing"
```

---

# 🎨 PHASE 4: UI Components

## Step 4.1 — Create Button Component

```prompt
Create the file src/components/ui/Button.tsx with the following content:

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-neo-cyan',
  secondary: 'bg-neo-white',
  danger: 'bg-neo-red',
};

const sizeStyles = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        border-4 border-neo-black
        shadow-brutal
        font-bold uppercase tracking-wide
        hover:shadow-brutal-pressed hover:translate-x-1 hover:translate-y-1
        active:shadow-none active:translate-x-1 active:translate-y-1
        transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

Commit message: "feat: add Neobrutalist Button component"
```

---

## Step 4.2 — Create Panel Component

```prompt
Create the file src/components/ui/Panel.tsx with the following content:

import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Panel({ children, className = '', title }: PanelProps) {
  return (
    <div
      className={`
        border-4 border-neo-black
        shadow-brutal
        bg-neo-white
        ${className}
      `}
    >
      {title && (
        <div className="border-b-4 border-neo-black bg-neo-black px-3 py-1">
          <h3 className="font-bold text-neo-white uppercase text-sm tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

Commit message: "feat: add Neobrutalist Panel component"
```

---

## Step 4.3 — Create Cell Component

```prompt
Create the file src/components/Cell.tsx with the following content:

import React from 'react';
import { CellValue } from '../types/game';
import { TETROMINO_COLORS } from '../constants/tetrominoes';

interface CellProps {
  value: CellValue;
  isGhost?: boolean;
  size?: number;
}

export function Cell({ value, isGhost = false, size = 28 }: CellProps) {
  const baseClasses = `
    border-2 border-neo-black
    transition-colors duration-100
  `;

  if (!value) {
    return (
      <div
        className={`${baseClasses} bg-gray-100`}
        style={{ width: size, height: size }}
      />
    );
  }

  const colorClass = TETROMINO_COLORS[value];

  if (isGhost) {
    return (
      <div
        className={`${baseClasses} ${colorClass} opacity-30`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${colorClass}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full border-2 border-t-white/40 border-l-white/40 border-b-black/20 border-r-black/20" />
    </div>
  );
}

Commit message: "feat: add Cell component for board rendering"
```

---

## Step 4.4 — Create Game Board Component

```prompt
Create the file src/components/GameBoard.tsx with the following content:

import React from 'react';
import { Cell } from './Cell';
import { Board, Tetromino, CellValue } from '../types/game';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from '../constants/game';
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

Commit message: "feat: create GameBoard component with ghost piece"
```

---

## Step 4.5 — Create Score Panel Component

```prompt
Create the file src/components/ScorePanel.tsx with the following content:

import React from 'react';
import { Panel } from './ui/Panel';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
}

export function ScorePanel({ score, level, lines }: ScorePanelProps) {
  return (
    <div className="space-y-4">
      <Panel title="Score">
        <p className="text-2xl font-bold text-center tabular-nums">
          {score.toLocaleString()}
        </p>
      </Panel>
      
      <Panel title="Level">
        <p className="text-2xl font-bold text-center tabular-nums">
          {level}
        </p>
      </Panel>
      
      <Panel title="Lines">
        <p className="text-2xl font-bold text-center tabular-nums">
          {lines}
        </p>
      </Panel>
    </div>
  );
}

Commit message: "feat: add ScorePanel component"
```

---

## Step 4.6 — Create Next Piece Preview Component

```prompt
Create the file src/components/NextPiece.tsx with the following content:

import React from 'react';
import { Panel } from './ui/Panel';
import { Cell } from './Cell';
import { Tetromino } from '../types/game';

interface NextPieceProps {
  piece: Tetromino | null;
}

export function NextPiece({ piece }: NextPieceProps) {
  // Create a 4x4 grid for preview
  const previewSize = 4;
  const cellSize = 24;

  return (
    <Panel title="Next">
      <div
        className="flex items-center justify-center"
        style={{
          width: previewSize * cellSize,
          height: previewSize * cellSize,
        }}
      >
        {piece && (
          <div className="flex flex-col">
            {piece.shape.map((row, y) => (
              <div key={y} className="flex">
                {row.map((cell, x) => (
                  <Cell
                    key={`${x}-${y}`}
                    value={cell ? piece.type : null}
                    size={cellSize}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}

Commit message: "feat: add NextPiece preview component"
```

---

## Step 4.7 — Create Controls Component

```prompt
Create the file src/components/Controls.tsx with the following content:

import React from 'react';
import { Button } from './ui/Button';
import { GameStatus } from '../types/game';

interface ControlsProps {
  status: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function Controls({ status, onStart, onPause, onResume, onRestart }: ControlsProps) {
  return (
    <div className="space-y-3">
      {status === 'idle' && (
        <Button variant="primary" onClick={onStart} className="w-full">
          Start Game
        </Button>
      )}
      
      {status === 'playing' && (
        <Button variant="secondary" onClick={onPause} className="w-full">
          Pause
        </Button>
      )}
      
      {status === 'paused' && (
        <Button variant="primary" onClick={onResume} className="w-full">
          Resume
        </Button>
      )}
      
      {(status === 'playing' || status === 'paused' || status === 'gameover') && (
        <Button variant="danger" onClick={onRestart} className="w-full">
          Restart
        </Button>
      )}
    </div>
  );
}

Commit message: "feat: add Controls component"
```

---

## Step 4.8 — Create Game Over Overlay Component

```prompt
Create the file src/components/GameOver.tsx with the following content:

import React from 'react';
import { Button } from './ui/Button';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="absolute inset-0 bg-neo-black/80 flex items-center justify-center">
      <div className="border-4 border-neo-black shadow-brutal-lg bg-neo-white p-8 text-center">
        <h2 className="text-4xl font-bold uppercase mb-4 text-neo-red">
          Game Over
        </h2>
        <p className="text-xl mb-2">Final Score</p>
        <p className="text-4xl font-bold mb-6 tabular-nums">
          {score.toLocaleString()}
        </p>
        <Button variant="primary" size="lg" onClick={onRestart}>
          Play Again
        </Button>
      </div>
    </div>
  );
}

Commit message: "feat: add GameOver overlay component"
```

---

## Step 4.9 — Create Keyboard Instructions Component

```prompt
Create the file src/components/KeyboardHint.tsx with the following content:

import React from 'react';
import { Panel } from './ui/Panel';

export function KeyboardHint() {
  const controls = [
    { key: '←/→', action: 'Move' },
    { key: '↓', action: 'Soft Drop' },
    { key: '↑', action: 'Rotate' },
    { key: 'Space', action: 'Hard Drop' },
    { key: 'P', action: 'Pause' },
  ];

  return (
    <Panel title="Controls">
      <div className="space-y-1 text-sm">
        {controls.map(({ key, action }) => (
          <div key={key} className="flex justify-between">
            <span className="font-bold">{key}</span>
            <span>{action}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

Commit message: "feat: add KeyboardHint component"
```

---

# 🏗 PHASE 5: Main Application Assembly

## Step 5.1 — Create Main App Component

```prompt
Replace the contents of src/App.tsx with the following:

import React from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { NextPiece } from './components/NextPiece';
import { Controls } from './components/Controls';
import { GameOver } from './components/GameOver';
import { KeyboardHint } from './components/KeyboardHint';

function App() {
  const { state, actions } = useGame();

  return (
    <div className="min-h-screen bg-neo-yellow flex items-center justify-center p-4">
      <div className="flex gap-6">
        {/* Left sidebar - Score */}
        <div className="w-36">
          <ScorePanel
            score={state.score}
            level={state.level}
            lines={state.lines}
          />
        </div>

        {/* Center - Game Board */}
        <div className="relative">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-bold uppercase tracking-wider border-4 border-neo-black bg-neo-white shadow-brutal px-4 py-2 inline-block">
              Tetris
            </h1>
          </div>

          <GameBoard
            board={state.board}
            currentPiece={state.currentPiece}
          />

          {state.status === 'gameover' && (
            <GameOver score={state.score} onRestart={actions.restart} />
          )}

          {state.status === 'paused' && (
            <div className="absolute inset-0 bg-neo-black/60 flex items-center justify-center">
              <div className="border-4 border-neo-black shadow-brutal bg-neo-yellow px-8 py-4">
                <p className="text-3xl font-bold uppercase">Paused</p>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - Next piece & Controls */}
        <div className="w-36 space-y-4">
          <NextPiece piece={state.nextPiece} />
          <Controls
            status={state.status}
            onStart={actions.start}
            onPause={actions.pause}
            onResume={actions.resume}
            onRestart={actions.restart}
          />
          <KeyboardHint />
        </div>
      </div>
    </div>
  );
}

export default App;

Commit message: "feat: assemble main App component with full layout"
```

---

## Step 5.2 — Update Main Entry Point

```prompt
Ensure src/main.tsx contains the following:

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

Commit message: "chore: configure main entry point"
```

---

## Step 5.3 — Update README

```prompt
Replace README.md with the following content:

# 🎮 Tetris Neobrutalist

A fully functional Tetris game built with React, TypeScript, and Tailwind CSS featuring a bold Neobrutalist design aesthetic.

![Neobrutalist Design](https://img.shields.io/badge/Design-Neobrutalist-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)

## 🎯 Features

- Classic Tetris gameplay
- Bold Neobrutalist UI design
- Ghost piece preview
- Next piece preview
- Score, level, and lines tracking
- Keyboard controls
- Pause/Resume functionality
- Responsive design

## 🎨 Design

This project follows **Neobrutalism** design principles:
- Thick black borders
- Hard drop shadows (no blur)
- Bold, saturated colors
- Monospace typography
- High contrast elements
- Raw, unpolished aesthetic

## 🕹 Controls

| Key | Action |
|-----|--------|
| ← / → | Move left/right |
| ↓ | Soft drop |
| ↑ | Rotate |
| Space | Hard drop |
| P | Pause/Resume |
| Enter | Start game |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # Reusable UI components
│   └── ...        # Game components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── constants/     # Game constants
├── types/         # TypeScript types
└── App.tsx        # Main application
```

## 📝 License

MIT License

Commit message: "docs: update README with project documentation"
```

---

# ✅ PHASE 6: Testing & Polish

## Step 6.1 — Test the Application

```prompt
Run the development server to test the application:

npm run dev

Verify that:
1. The game board renders correctly with Neobrutalist styling
2. Start button initiates the game
3. Pieces fall at regular intervals
4. Arrow keys move and rotate pieces
5. Space bar performs hard drop
6. Lines clear when completed
7. Score, level, and lines update correctly
8. Game over triggers when pieces stack to top
9. Pause/Resume works with P key
10. Ghost piece shows where piece will land

Fix any issues found during testing.

Commit message: "test: verify game functionality"
```

---

## Step 6.2 — Add Mobile Touch Controls (Optional Enhancement)

```prompt
Create the file src/components/TouchControls.tsx with the following content:

import React from 'react';
import { Button } from './ui/Button';

interface TouchControlsProps {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onRotate: () => void;
  onDrop: () => void;
}

export function TouchControls({
  onLeft,
  onRight,
  onDown,
  onRotate,
  onDrop,
}: TouchControlsProps) {
  return (
    <div className="md:hidden mt-4 space-y-2">
      <div className="flex justify-center">
        <Button onClick={onRotate} className="px-8 py-4">
          ↻
        </Button>
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={onLeft} className="px-6 py-4">
          ←
        </Button>
        <Button onClick={onDown} className="px-6 py-4">
          ↓
        </Button>
        <Button onClick={onRight} className="px-6 py-4">
          →
        </Button>
      </div>
      <div className="flex justify-center">
        <Button onClick={onDrop} variant="primary" className="px-8 py-4">
          Drop
        </Button>
      </div>
    </div>
  );
}

Then add TouchControls to App.tsx below the game area for mobile users.

Commit message: "feat: add mobile touch controls"
```

---

## Step 6.3 — Final Commit and Push

```prompt
Ensure all files are committed and push to the repository:

git add .
git commit -m "chore: final cleanup and polish"
git push origin main

Verify the repository at https://github.com/brklyn498/tetris_neobrutal contains all files.
```

---

# 📊 Summary

| Phase | Steps | Description |
|-------|-------|-------------|
| 1 | 1.1 - 1.5 | Repository & project setup |
| 2 | 2.1 - 2.3 | Core game architecture |
| 3 | 3.1 - 3.3 | Game logic implementation |
| 4 | 4.1 - 4.9 | UI components |
| 5 | 5.1 - 5.3 | Main application assembly |
| 6 | 6.1 - 6.3 | Testing & polish |

**Total Commits:** ~20
**Estimated Time:** 2-4 hours with AI agent

---

## 🎨 Color Reference

| Name | Hex | Usage |
|------|-----|-------|
| neo-yellow | #FFDD00 | Background, O piece |
| neo-cyan | #00FFFF | Buttons, I piece |
| neo-magenta | #FF00FF | T piece |
| neo-red | #FF3333 | Danger, Z piece |
| neo-green | #00FF66 | S piece |
| neo-orange | #FF9933 | L piece |
| neo-blue | #3366FF | J piece |
| neo-black | #000000 | Borders, shadows |
| neo-white | #FFFFFF | Panels, backgrounds |
