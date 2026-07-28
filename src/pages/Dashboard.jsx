import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useComplaints } from '../hooks/useComplaints';
import { useDebounce } from '../hooks/useDebounce';
import ComplaintFilters from '../components/complaints/ComplaintFilters';
import ComplaintCard from '../components/complaints/ComplaintCard';
import ComplaintTable from '../components/complaints/ComplaintTable';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import AlertBanner from '../components/common/AlertBanner';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';

const PAGE_SIZE = 6;

export default function Dashboard() {
  const { user } = useAuth();
  const { complaints, loading, error, loadComplaints } = useComplaints();

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 350);

  useEffect(() => {
    loadComplaints({ ...filters, search: debouncedSearch, mine: true, userId: user.id });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.category, filters.priority, filters.dateFrom, filters.dateTo, debouncedSearch, user.id]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return complaints.slice(start, start + PAGE_SIZE);
  }, [complaints, page]);

  const totalPages = Math.max(1, Math.ceil(complaints.length / PAGE_SIZE));

  const summary = useMemo(() => {
    const counts = { open: 0, 'in-progress': 0, resolved: 0, closed: 0 };
    complaints.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return counts;
  }, [complaints]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">My complaints</h1>
          <p className="text-sm text-ink-muted">Track the status of everything you've submitted.</p>
        </div>
        <Link to="/submit">
          <Button>Submit a complaint</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="Open" value={summary.open} tone="bg-status-open-bg text-status-open" />
        <SummaryCard label="In progress" value={summary['in-progress']} tone="bg-status-progress-bg text-status-progress" />
        <SummaryCard label="Resolved" value={summary.resolved} tone="bg-status-resolved-bg text-status-resolved" />
        <SummaryCard label="Closed" value={summary.closed} tone="bg-status-closed-bg text-status-closed" />
      </div>

      <ComplaintFilters filters={filters} onChange={setFilters} onReset={() => setFilters({})} />

      {error && <AlertBanner tone="error">{error}</AlertBanner>}

      {loading ? (
        <Spinner label="Loading your complaints…" />
      ) : complaints.length === 0 ? (
        <EmptyState
          title="No complaints match these filters"
          description="Try clearing your filters, or submit a new complaint if this is a fresh issue."
          action={<Link to="/submit"><Button variant="secondary">Submit a complaint</Button></Link>}
        />
      ) : (
        <>
          <div className="hidden md:block">
            <ComplaintTable complaints={paginated} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {paginated.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}

function SummaryCard({ label, value, tone }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-1 inline-flex rounded px-1.5 font-display text-2xl font-semibold ${tone}`}>{value || 0}</p>
    </div>
  );
}
