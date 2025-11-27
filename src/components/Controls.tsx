import { Button } from './ui/Button';
import type { GameStatus } from '../types/game';

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
