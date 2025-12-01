import { describe, it, expect } from 'vitest';
import { gameReducer, createInitialState } from './useGameReducer';
import type { GameAction } from '../types/game';
import { BOARD_HEIGHT } from '../constants/game';

describe('gameReducer', () => {
  it('should initialize state correctly', () => {
    const initialState = createInitialState();
    expect(initialState.board).toHaveLength(BOARD_HEIGHT);
    expect(initialState.score).toBe(0);
    expect(initialState.status).toBe('idle');
  });

  it('should handle START action', () => {
    const initialState = createInitialState();
    const action: GameAction = { type: 'START' };
    const newState = gameReducer(initialState, action);

    expect(newState.status).toBe('playing');
    expect(newState.currentPiece).not.toBeNull();
    expect(newState.nextPiece).not.toBeNull();
  });

  it('should handle MOVE_DOWN action', () => {
    const initialState = createInitialState();
    // Start game to get a piece
    let state = gameReducer(initialState, { type: 'START' });
    const initialY = state.currentPiece!.position.y;

    state = gameReducer(state, { type: 'MOVE_DOWN' });

    expect(state.currentPiece!.position.y).toBe(initialY + 1);
  });

  it('should handle MOVE_LEFT action', () => {
    const initialState = createInitialState();
    let state = gameReducer(initialState, { type: 'START' });
    // Move piece to somewhere we can move left (spawn is center)
    const initialX = state.currentPiece!.position.x;

    state = gameReducer(state, { type: 'MOVE_LEFT' });

    expect(state.currentPiece!.position.x).toBe(initialX - 1);
  });

  it('should handle MOVE_RIGHT action', () => {
    const initialState = createInitialState();
    let state = gameReducer(initialState, { type: 'START' });
    const initialX = state.currentPiece!.position.x;

    state = gameReducer(state, { type: 'MOVE_RIGHT' });

    expect(state.currentPiece!.position.x).toBe(initialX + 1);
  });

  it('should handle PAUSE and RESUME', () => {
    const initialState = createInitialState();
    let state = gameReducer(initialState, { type: 'START' });

    state = gameReducer(state, { type: 'PAUSE' });
    expect(state.status).toBe('paused');

    state = gameReducer(state, { type: 'RESUME' });
    expect(state.status).toBe('playing');
  });

  it('should handle HARD_DROP', () => {
    const initialState = createInitialState();
    let state = gameReducer(initialState, { type: 'START' });

    // Hard drop should lock the piece and spawn a new one
    // We can verify this by checking if the current piece changed (reference equality check might fail if random generates same type,
    // but position reset or new object reference is key)
    const pieceBefore = state.currentPiece;

    state = gameReducer(state, { type: 'HARD_DROP' });

    // After hard drop, a new piece is spawned.
    // The previous piece should be merged into the board?
    // It's hard to check exact board state without knowing random piece,
    // but we can check that we have a new current piece.
    expect(state.currentPiece).not.toBe(pieceBefore);
    expect(state.status).toBe('playing');
  });
});
