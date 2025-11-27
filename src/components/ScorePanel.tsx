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
