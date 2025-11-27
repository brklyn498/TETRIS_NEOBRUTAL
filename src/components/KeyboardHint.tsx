import { Panel } from './ui/Panel';

export function KeyboardHint() {
  const controls = [
    { key: '←/→', action: 'Move' },
    { key: '↓', action: 'Soft Drop' },
    { key: '↑', action: 'Rotate' },
    { key: 'Space', action: 'Hard Drop' },
    { key: 'P', action: 'Pause' },
  ];

  return (
    <Panel title="Controls">
      <div className="space-y-1 text-sm">
        {controls.map(({ key, action }) => (
          <div key={key} className="flex justify-between">
            <span className="font-bold">{key}</span>
            <span>{action}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
