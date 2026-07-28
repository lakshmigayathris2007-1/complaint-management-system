import React from 'react';

const TONES = {
  error: 'bg-accent-light text-accent border-accent/30',
  info: 'bg-primary-light text-primary-dark border-primary/30',
  success: 'bg-status-resolved-bg text-status-resolved border-status-resolved/30',
};

export default function AlertBanner({ tone = 'error', children }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded border px-4 py-3 text-sm ${TONES[tone]}`}>
      {children}
    </div>
  );
}
