import React, { useId } from 'react';

export default function Input({ label, error, hint, type = 'text', required, className = '', ...rest }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`rounded border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-primary ${
          error ? 'border-accent' : 'border-border'
        }`}
        {...rest}
      />
      {hint && !error && <p id={hintId} className="text-xs text-ink-muted">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-accent" role="alert">{error}</p>}
    </div>
  );
}
