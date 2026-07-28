import React, { createContext, useContext, useCallback, useState } from 'react';
import {
  fetchComplaints,
  fetchComplaintById,
  createComplaint as createComplaintApi,
  updateComplaintStatus as updateStatusApi,
  assignComplaint as assignApi,
} from '../api/complaintApi';
import { useAuthContext } from './AuthContext';
import { useNotificationContext } from './NotificationContext';

const ComplaintContext = createContext(null);

export function ComplaintProvider({ children }) {
  const { user } = useAuthContext();
  const { addLocal } = useNotificationContext();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComplaints = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchComplaints(filters);
      setComplaints(res);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getComplaint = useCallback(async (id) => {
    // Prefer the already-loaded copy so the detail page opens instantly;
    // fall back to a fetch if the user landed here via a direct link.
    const cached = complaints.find((c) => c.id === id);
    if (cached) return cached;
    return fetchComplaintById(id);
  }, [complaints]);

  const submitComplaint = useCallback(
    async ({ title, description, category, priority, attachments }) => {
      const complaint = await createComplaintApi({
        title,
        description,
        category,
        priority,
        attachments,
        userId: user.id,
        userName: user.name,
      });
      setComplaints((prev) => [complaint, ...prev]);
      return complaint;
    },
    [user]
  );

  const changeStatus = useCallback(
    async (id, status, comment) => {
      const updated = await updateStatusApi({ id, status, actorName: user.name, comment });
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
      addLocal({
        userId: updated.createdBy,
        complaintId: updated.id,
        ticketId: updated.ticketId,
        message: `Your complaint "${updated.title}" moved to ${statusLabel(status)}.`,
      });
      return updated;
    },
    [user, addLocal]
  );

  const assignComplaintTo = useCallback(
    async (id, assigneeId, assigneeName) => {
      const updated = await assignApi({ id, assigneeId, assigneeName, actorName: user.name });
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    },
    [user]
  );

  const value = {
    complaints,
    loading,
    error,
    loadComplaints,
    getComplaint,
    submitComplaint,
    changeStatus,
    assignComplaintTo,
  };

  return <ComplaintContext.Provider value={value}>{children}</ComplaintContext.Provider>;
}

function statusLabel(status) {
  return status.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function useComplaintContext() {
  const ctx = useContext(ComplaintContext);
  if (!ctx) throw new Error('useComplaintContext must be used within ComplaintProvider');
  return ctx;
}
