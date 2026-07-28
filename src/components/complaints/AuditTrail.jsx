import React from 'react';
import { formatDateTime } from '../../utils/formatters';

const ACTION_DOT = {
  created: 'bg-status-open',
  assigned: 'bg-status-progress',
  'status-change': 'bg-primary',
};

// Styled like a log/ledger — monospace timestamps reinforce that every
// change to a complaint is recorded and traceable.
export default function AuditTrail({ history }) {
  const sorted = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <ol className="flex flex-col gap-0">
      {sorted.map((entry, index) => (
        <li key={entry.id} className="relative flex gap-3 pb-5 last:pb-0">
          {index !== sorted.length - 1 && (
            <span className="absolute left-[5px] top-3 h-full w-px bg-border" aria-hidden="true" />
          )}
          <span
            className={`z-10 mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${ACTION_DOT[entry.action] || 'bg-ink-muted'}`}
            aria-hidden="true"
          />
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm text-ink">{entry.note}</p>
              <span className="font-mono text-xs text-ink-muted whitespace-nowrap">{formatDateTime(entry.timestamp)}</span>
            </div>
            <p className="text-xs text-ink-muted">by {entry.actor}</p>
            {entry.comment && (
              <p className="mt-1 rounded border border-border bg-paper px-3 py-2 text-sm text-ink">{entry.comment}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
