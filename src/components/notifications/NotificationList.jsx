import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import { formatRelativeTime } from '../../utils/formatters';
import EmptyState from '../common/EmptyState';

export default function NotificationList({ onNavigate }) {
  const { notifications, markRead, loading } = useNotifications();

  if (loading && notifications.length === 0) {
    return <p className="p-4 text-sm text-ink-muted">Loading notifications…</p>;
  }

  if (notifications.length === 0) {
    return (
      <div className="p-2">
        <EmptyState title="No notifications yet" description="Updates on your complaints will show up here." />
      </div>
    );
  }

  return (
    <ul className="max-h-96 overflow-y-auto py-1">
      {notifications.map((n) => (
        <li key={n.id}>
          <Link
            to={`/complaints/${n.complaintId}`}
            onClick={() => {
              if (!n.read) markRead(n.id);
              onNavigate?.();
            }}
            className={`flex flex-col gap-1 px-4 py-3 text-sm hover:bg-paper focus-visible:outline-2 focus-visible:outline-primary ${
              n.read ? 'text-ink-muted' : 'text-ink'
            }`}
          >
            <div className="flex items-start gap-2">
              {!n.read && <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />}
              <span className={n.read ? '' : 'font-medium'}>{n.message}</span>
            </div>
            <span className="font-mono text-xs text-ink-muted">{formatRelativeTime(n.createdAt)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
