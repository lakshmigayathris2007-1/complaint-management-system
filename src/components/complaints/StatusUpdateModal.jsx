import React, { useState } from 'react';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import AlertBanner from '../common/AlertBanner';
import { STATUS_TRANSITIONS } from '../../constants';
import { toTitleCase } from '../../utils/formatters';

export default function StatusUpdateModal({ open, onClose, complaint, onConfirm }) {
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!complaint) return null;

  const options = (STATUS_TRANSITIONS[complaint.status] || []).map((s) => ({ value: s, label: toTitleCase(s) }));

  async function handleConfirm() {
    if (!status) {
      setError('Choose the new status.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onConfirm(status, comment);
      setStatus('');
      setComment('');
      onClose();
    } catch (err) {
      setError(err.message || 'Could not update status. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Update status — ${complaint.ticketId}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} loading={submitting}>Save update</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {error && <AlertBanner tone="error">{error}</AlertBanner>}
        <p className="text-sm text-ink-muted">
          Current status: <span className="font-medium text-ink">{toTitleCase(complaint.status)}</span>
        </p>
        <Select
          label="New status"
          required
          options={options}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Select new status"
        />
        <Textarea
          label="Note (optional)"
          placeholder="Add context for this update — visible in the audit trail."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </Modal>
  );
}
