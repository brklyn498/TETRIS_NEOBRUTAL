import type { Difficulty } from '../types/game';

interface DifficultySelectorProps {
    currentDifficulty: Difficulty;
    onSelect: (difficulty: Difficulty) => void;
    disabled?: boolean;
}

export function DifficultySelector({
    currentDifficulty,
    onSelect,
    disabled = false,
}: DifficultySelectorProps) {
    const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

    const getColorClasses = (diff: Difficulty, isSelected: boolean) => {
        switch (diff) {
            case 'EASY':
                return isSelected
                    ? 'bg-neo-green text-black translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-neo-white hover:bg-neo-green/20';
            case 'MEDIUM':
                return isSelected
                    ? 'bg-neo-blue text-white translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-neo-white hover:bg-neo-blue/20';
            case 'HARD':
                return isSelected
                    ? 'bg-neo-red text-white translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-neo-white hover:bg-neo-red/20';
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold uppercase mb-2">Difficulty</h3>
            <div className="flex flex-col gap-2">
                {difficulties.map((diff) => (
                    <button
                        key={diff}
                        onClick={() => onSelect(diff)}
                        disabled={disabled}
                        className={`
              px-4 py-2 font-bold uppercase border-2 border-neo-black shadow-brutal transition-all
              ${getColorClasses(diff, currentDifficulty === diff)}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                    >
                        {diff}
                    </button>
                ))}
            </div>
        </div>
    );
}
