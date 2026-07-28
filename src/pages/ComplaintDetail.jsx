import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useComplaints } from '../hooks/useComplaints';
import StatusBadge from '../components/complaints/StatusBadge';
import PriorityBadge from '../components/complaints/PriorityBadge';
import AuditTrail from '../components/complaints/AuditTrail';
import StatusUpdateModal from '../components/complaints/StatusUpdateModal';
import AssignModal from '../components/complaints/AssignModal';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import AlertBanner from '../components/common/AlertBanner';
import { formatDateTime, formatFileSize, toTitleCase } from '../utils/formatters';
import { mockUsers } from '../api/mockData';

const admins = mockUsers.filter((u) => u.role === 'admin');

export default function ComplaintDetail() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { getComplaint, changeStatus, assignComplaintTo } = useComplaints();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getComplaint(id)
      .then((res) => { if (!cancelled) setComplaint(res); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, getComplaint]);

  if (loading) return <Spinner label="Loading complaint…" />;
  if (error) return <AlertBanner tone="error">{error}</AlertBanner>;
  if (!complaint) return null;

  async function handleStatusConfirm(status, comment) {
    const updated = await changeStatus(complaint.id, status, comment);
    setComplaint(updated);
  }

  async function handleAssignConfirm(assigneeId, assigneeName) {
    const updated = await assignComplaintTo(complaint.id, assigneeId, assigneeName);
    setComplaint(updated);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link to={isAdmin ? '/admin' : '/dashboard'} className="text-sm text-primary underline underline-offset-2 w-fit">
        ← Back
      </Link>

      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="ticket-id">{complaint.ticketId}</span>
            <h1 className="mt-1 font-display text-xl font-semibold text-ink">{complaint.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={complaint.priority} />
            <StatusBadge status={complaint.status} />
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Category</dt>
            <dd className="mt-0.5 text-ink">{toTitleCase(complaint.category)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Submitted by</dt>
            <dd className="mt-0.5 text-ink">{complaint.createdByName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Assigned to</dt>
            <dd className="mt-0.5 text-ink">{complaint.assignedToName || 'Unassigned'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-muted">Submitted</dt>
            <dd className="mt-0.5 text-ink">{formatDateTime(complaint.createdAt)}</dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-border pt-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-ink-muted">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{complaint.description}</p>
        </div>

        {complaint.attachments.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <h2 className="text-xs font-medium uppercase tracking-wide text-ink-muted">Attachments</h2>
            <ul className="mt-2 flex flex-col gap-1">
              {complaint.attachments.map((file, i) => (
                <li key={i} className="flex items-center justify-between rounded border border-border px-3 py-2 text-sm">
                  <span className="text-ink">{file.name}</span>
                  <span className="text-xs text-ink-muted">{formatFileSize(file.size)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isAdmin && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            <Button onClick={() => setStatusModalOpen(true)}>Update status</Button>
            <Button variant="secondary" onClick={() => setAssignModalOpen(true)}>
              {complaint.assignedToName ? 'Reassign' : 'Assign'}
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">History &amp; audit trail</h2>
        <AuditTrail history={complaint.history} />
      </div>

      <StatusUpdateModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        complaint={complaint}
        onConfirm={handleStatusConfirm}
      />
      <AssignModal
        open={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        complaint={complaint}
        admins={admins}
        onConfirm={handleAssignConfirm}
      />
    </div>
  );
}
