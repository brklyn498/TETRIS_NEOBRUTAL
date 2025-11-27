import { TETROMINO_COLORS } from '../constants/tetrominoes';
import type { CellValue } from '../types/game';

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
