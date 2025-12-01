import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Tetris')).toBeInTheDocument();
  });

  it('shows start button initially', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });
});
