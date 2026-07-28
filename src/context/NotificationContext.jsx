import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { fetchNotifications, markNotificationRead, pushNotification } from '../api/notificationApi';
import { useAuthContext } from './AuthContext';

const NotificationContext = createContext(null);

// "Real-time" here is simulated with a short poll interval. Swap the
// interval effect below for a WebSocket/SSE subscription when the backend
// supports one — the rest of the app only depends on `notifications`
// and `addLocal`, so that swap is isolated to this file.
const POLL_INTERVAL_MS = 15000;

export function NotificationProvider({ children }) {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetchNotifications(user.id);
      setNotifications(res);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user, refresh]);

  const markRead = useCallback(async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await markNotificationRead(id);
  }, []);

  // Used right after a complaint mutation to give the affected user instant
  // feedback instead of waiting for the next poll.
  const addLocal = useCallback(
    ({ userId, complaintId, ticketId, message }) => {
      const notification = pushNotification({ userId, complaintId, ticketId, message });
      if (userId === user?.id) {
        setNotifications((prev) => [notification, ...prev]);
      }
      return notification;
    },
    [user]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = { notifications, unreadCount, loading, refresh, markRead, addLocal };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider');
  return ctx;
}
