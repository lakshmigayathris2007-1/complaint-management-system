import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDate, toTitleCase } from '../../utils/formatters';

export default function ComplaintTable({ complaints, showRequester = false }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
            <th scope="col" className="px-4 py-3 font-medium">Ticket</th>
            <th scope="col" className="px-4 py-3 font-medium">Title</th>
            {showRequester && <th scope="col" className="px-4 py-3 font-medium">Requester</th>}
            <th scope="col" className="px-4 py-3 font-medium">Category</th>
            <th scope="col" className="px-4 py-3 font-medium">Priority</th>
            <th scope="col" className="px-4 py-3 font-medium">Status</th>
            <th scope="col" className="px-4 py-3 font-medium">Assigned to</th>
            <th scope="col" className="px-4 py-3 font-medium">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id} className="border-b border-border last:border-0 hover:bg-paper">
              <td className="px-4 py-3">
                <Link
                  to={`/complaints/${c.id}`}
                  className="font-mono text-xs text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  {c.ticketId}
                </Link>
              </td>
              <td className="max-w-[220px] truncate px-4 py-3 font-medium text-ink">{c.title}</td>
              {showRequester && <td className="px-4 py-3 text-ink-muted">{c.createdByName}</td>}
              <td className="px-4 py-3 text-ink-muted">{toTitleCase(c.category)}</td>
              <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
              <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
              <td className="px-4 py-3 text-ink-muted">{c.assignedToName || '—'}</td>
              <td className="px-4 py-3 text-ink-muted">{formatDate(c.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
