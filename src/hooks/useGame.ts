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
          if (state.status === 'idle' || (state.status as string) === 'gameover') {
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
