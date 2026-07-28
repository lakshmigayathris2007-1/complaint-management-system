import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { toTitleCase } from '../../utils/formatters';

export default function ComplaintCard({ complaint }) {
  return (
    <Link
      to={`/complaints/${complaint.id}`}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="ticket-id">{complaint.ticketId}</span>
        <StatusBadge status={complaint.status} />
      </div>
      <h3 className="font-display font-semibold text-ink leading-snug">{complaint.title}</h3>
      <p className="line-clamp-2 text-sm text-ink-muted">{complaint.description}</p>
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <PriorityBadge priority={complaint.priority} />
        <span className="text-xs text-ink-muted">{toTitleCase(complaint.category)}</span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-2 text-xs text-ink-muted">
        <span>{complaint.assignedToName ? `Assigned to ${complaint.assignedToName}` : 'Unassigned'}</span>
        <span>{formatRelativeTime(complaint.updatedAt)}</span>
      </div>
    </Link>
  );
}
