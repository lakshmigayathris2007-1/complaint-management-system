import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NotificationBell from '../notifications/NotificationBell';
import Button from '../common/Button';

const linkClass = ({ isActive }) =>
  `rounded px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
    isActive ? 'bg-primary-light text-primary-dark' : 'text-ink-muted hover:text-ink'
  }`;

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <NavLink to="/dashboard" className="font-display text-lg font-semibold text-ink">
            Resolve
          </NavLink>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            <NavLink to="/dashboard" className={linkClass}>My complaints</NavLink>
            <NavLink to="/submit" className={linkClass}>New complaint</NavLink>
            {isAdmin && <NavLink to="/admin" className={linkClass}>Admin panel</NavLink>}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink leading-none">{user?.name}</p>
            <p className="text-xs text-ink-muted leading-none mt-0.5">{isAdmin ? 'Admin' : 'Member'}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
      <nav className="flex items-center gap-1 border-t border-border px-4 py-2 sm:hidden" aria-label="Primary">
        <NavLink to="/dashboard" className={linkClass}>My complaints</NavLink>
        <NavLink to="/submit" className={linkClass}>New</NavLink>
        {isAdmin && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
      </nav>
    </header>
  );
}
