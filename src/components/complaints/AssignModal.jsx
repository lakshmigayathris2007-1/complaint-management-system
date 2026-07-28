import React, { useState } from 'react';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Button from '../common/Button';
import AlertBanner from '../common/AlertBanner';

// `admins` is the pool of assignable team members — passed in so this stays
// decoupled from where that list comes from (mock now, /users?role=admin later).
export default function AssignModal({ open, onClose, complaint, admins, onConfirm }) {
  const [assigneeId, setAssigneeId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!complaint) return null;

  const options = admins.map((a) => ({ value: a.id, label: a.name }));

  async function handleConfirm() {
    if (!assigneeId) {
      setError('Choose a team member to assign.');
      return;
    }
    const assignee = admins.find((a) => a.id === assigneeId);
    setSubmitting(true);
    setError('');
    try {
      await onConfirm(assignee.id, assignee.name);
      setAssigneeId('');
      onClose();
    } catch (err) {
      setError(err.message || 'Could not assign this complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Assign — ${complaint.ticketId}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} loading={submitting}>Assign</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {error && <AlertBanner tone="error">{error}</AlertBanner>}
        <p className="text-sm text-ink-muted">
          {complaint.assignedToName ? `Currently assigned to ${complaint.assignedToName}.` : 'Currently unassigned.'}
        </p>
        <Select
          label="Assign to"
          required
          options={options}
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          placeholder="Select team member"
        />
      </div>
    </Modal>
  );
}
