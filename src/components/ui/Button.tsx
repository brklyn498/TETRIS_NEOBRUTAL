import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-neo-cyan',
  secondary: 'bg-neo-white',
  danger: 'bg-neo-red',
};

const sizeStyles = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        border-4 border-neo-black
        shadow-brutal
        font-bold uppercase tracking-wide
        hover:shadow-brutal-pressed hover:translate-x-1 hover:translate-y-1
        active:shadow-none active:translate-x-1 active:translate-y-1
        transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
