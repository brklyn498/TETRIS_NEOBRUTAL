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
