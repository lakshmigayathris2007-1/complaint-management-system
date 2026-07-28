import React from 'react';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between border-t border-border pt-3" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded px-3 py-1.5 text-sm text-ink-muted hover:bg-paper disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-primary"
      >
        ← Previous
      </button>
      <span className="text-sm text-ink-muted">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded px-3 py-1.5 text-sm text-ink-muted hover:bg-paper disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-primary"
      >
        Next →
      </button>
    </nav>
  );
}
