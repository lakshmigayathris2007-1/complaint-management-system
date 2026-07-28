import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-4 text-center">
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-muted">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/dashboard">
        <Button className="mt-2">Back to dashboard</Button>
      </Link>
    </div>
  );
}
