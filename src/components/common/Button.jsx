import React from 'react';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark disabled:bg-primary/50',
  secondary: 'bg-surface text-ink border border-border hover:bg-paper disabled:opacity-50',
  danger: 'bg-accent text-white hover:opacity-90 disabled:opacity-50',
  ghost: 'text-ink-muted hover:text-ink hover:bg-paper disabled:opacity-50',
};

const SIZES = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
