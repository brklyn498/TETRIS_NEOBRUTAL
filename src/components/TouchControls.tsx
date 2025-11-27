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
