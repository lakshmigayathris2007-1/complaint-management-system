import React, { useId } from 'react';

export default function Select({ label, error, hint, required, options, placeholder = 'Select…', className = '', ...rest }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`rounded border bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-primary ${
          error ? 'border-accent' : 'border-border'
        }`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p id={errorId} className="text-xs text-accent" role="alert">{error}</p>}
    </div>
  );
}
