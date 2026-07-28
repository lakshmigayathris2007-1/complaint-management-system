import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';
import { useDebounce } from '../hooks/useDebounce';
import ComplaintFilters from '../components/complaints/ComplaintFilters';
import ComplaintTable from '../components/complaints/ComplaintTable';
import StatusBadge from '../components/complaints/StatusBadge';
import PriorityBadge from '../components/complaints/PriorityBadge';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import AlertBanner from '../components/common/AlertBanner';
import Pagination from '../components/common/Pagination';
import { formatDate } from '../utils/formatters';

const PAGE_SIZE = 8;

export default function AdminPanel() {
  const { complaints, loading, error, loadComplaints } = useComplaints();
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 350);

  useEffect(() => {
    loadComplaints({ ...filters, search: debouncedSearch });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.category, filters.priority, filters.dateFrom, filters.dateTo, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return complaints.slice(start, start + PAGE_SIZE);
  }, [complaints, page]);

  const totalPages = Math.max(1, Math.ceil(complaints.length / PAGE_SIZE));

  const unassignedCount = complaints.filter((c) => !c.assignedTo && c.status !== 'closed').length;
  const criticalOpenCount = complaints.filter((c) => c.priority === 'critical' && c.status !== 'closed').length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink">Admin panel</h1>
        <p className="text-sm text-ink-muted">Review, assign, and update every complaint in the system.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">Total complaints</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{complaints.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">Unassigned</p>
          <p className="mt-1 font-display text-2xl font-semibold text-status-open">{unassignedCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">Critical &amp; open</p>
          <p className="mt-1 font-display text-2xl font-semibold text-priority-critical">{criticalOpenCount}</p>
        </div>
      </div>

      <ComplaintFilters filters={filters} onChange={setFilters} onReset={() => setFilters({})} />

      {error && <AlertBanner tone="error">{error}</AlertBanner>}

      {loading ? (
        <Spinner label="Loading complaints…" />
      ) : complaints.length === 0 ? (
        <EmptyState title="No complaints match these filters" description="Try clearing filters to see all complaints." />
      ) : (
        <>
          <div className="hidden md:block">
            <ComplaintTable complaints={paginated} showRequester />
          </div>
          <ul className="flex flex-col gap-3 md:hidden">
            {paginated.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/complaints/${c.id}`}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="flex items-center justify-between">
                    <span className="ticket-id">{c.ticketId}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="font-medium text-ink">{c.title}</p>
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <PriorityBadge priority={c.priority} />
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    {c.createdByName} · {c.assignedToName ? `Assigned to ${c.assignedToName}` : 'Unassigned'}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
