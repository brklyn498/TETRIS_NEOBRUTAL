import { Panel } from './ui/Panel';
import { Cell } from './Cell';
import type { Tetromino } from '../types/game';

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
