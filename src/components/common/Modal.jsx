import React, { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children, footer }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl focus:outline-none"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 id="modal-title" className="font-display text-lg font-semibold text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
