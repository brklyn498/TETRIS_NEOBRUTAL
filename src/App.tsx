import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { NextPiece } from './components/NextPiece';
import { Controls } from './components/Controls';
import { GameOver } from './components/GameOver';
import { KeyboardHint } from './components/KeyboardHint';
import { TouchControls } from './components/TouchControls';
import { DifficultySelector } from './components/DifficultySelector';

function App() {
  const { state, actions } = useGame();

  return (
    <div className="min-h-screen bg-neo-yellow flex items-center justify-center p-4">
      <div className="flex gap-6">
        {/* Left sidebar - Score */}
        <div className="w-48">
          <ScorePanel
            score={state.score}
            level={state.level}
            lines={state.lines}
          />
        </div>

        {/* Center - Game Board */}
        <div className="relative">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-bold uppercase tracking-wider border-4 border-neo-black bg-neo-white shadow-brutal px-4 py-2 inline-block">
              Tetris
            </h1>
          </div>

          <GameBoard
            board={state.board}
            currentPiece={state.currentPiece}
          />

          {state.status === 'gameover' && (
            <GameOver score={state.score} onRestart={actions.restart} />
          )}

          {state.status === 'paused' && (
            <div className="absolute inset-0 bg-neo-black/60 flex items-center justify-center">
              <div className="border-4 border-neo-black shadow-brutal bg-neo-yellow px-8 py-4">
                <p className="text-3xl font-bold uppercase">Paused</p>
              </div>
            </div>
          )}

          {/* Touch Controls (Mobile) */}
          <TouchControls
            onLeft={actions.moveLeft}
            onRight={actions.moveRight}
            onDown={actions.moveDown}
            onRotate={actions.rotate}
            onDrop={actions.hardDrop}
          />
        </div>

        {/* Right sidebar - Next piece & Controls */}
        <div className="w-48 space-y-4">
          <NextPiece piece={state.nextPiece} />
          <Controls
            status={state.status}
            onStart={actions.start}
            onPause={actions.pause}
            onResume={actions.resume}
            onRestart={actions.restart}
          />
          <DifficultySelector
            currentDifficulty={state.difficulty}
            onSelect={actions.setDifficulty}
            disabled={state.status === 'playing' || state.status === 'paused'}
          />
          <KeyboardHint />
        </div>
      </div>
    </div>
  );
}

export default App;
