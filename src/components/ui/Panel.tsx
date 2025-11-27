import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Panel({ children, className = '', title }: PanelProps) {
  return (
    <div
      className={`
        border-4 border-neo-black
        shadow-brutal
        bg-neo-white
        ${className}
      `}
    >
      {title && (
        <div className="border-b-4 border-neo-black bg-neo-black px-3 py-1">
          <h3 className="font-bold text-neo-white uppercase text-sm tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}
