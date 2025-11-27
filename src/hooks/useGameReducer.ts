import type { GameState, GameAction } from '../types/game';
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
