import React from 'react';
import Navbar from './Navbar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
