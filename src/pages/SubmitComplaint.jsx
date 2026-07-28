import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';
import ComplaintForm from '../components/complaints/ComplaintForm';
import AlertBanner from '../components/common/AlertBanner';

export default function SubmitComplaint() {
  const { submitComplaint } = useComplaints();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(null);

  async function handleSubmit(data) {
    const complaint = await submitComplaint(data);
    setSubmitted(complaint);
    setTimeout(() => navigate(`/complaints/${complaint.id}`), 1200);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-xl font-semibold text-ink">Submit a complaint</h1>
        <p className="text-sm text-ink-muted">
          Give as much detail as you can — it helps us route this to the right person faster.
        </p>
      </div>

      {submitted ? (
        <AlertBanner tone="success">
          Submitted as <span className="font-mono">{submitted.ticketId}</span>. Taking you to your complaint…
        </AlertBanner>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-6">
          <ComplaintForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}
