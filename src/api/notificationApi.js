import { mockRequest, USE_MOCKS } from './client';
import { mockNotifications } from './mockData';

export async function fetchNotifications(userId) {
  if (USE_MOCKS) {
    const results = mockNotifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return mockRequest(results, { delay: 250 });
  }
  // return request(`/notifications?userId=${userId}`);
}

export async function markNotificationRead(id) {
  if (USE_MOCKS) {
    const notification = mockNotifications.find((n) => n.id === id);
    if (notification) notification.read = true;
    return mockRequest(notification, { delay: 150 });
  }
  // return request(`/notifications/${id}/read`, { method: 'PATCH' });
}

// Called internally whenever a complaint changes so the affected user sees it.
export function pushNotification({ userId, complaintId, ticketId, message }) {
  const notification = {
    id: `n${Date.now()}`,
    userId,
    complaintId,
    ticketId,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  mockNotifications.unshift(notification);
  return notification;
}
