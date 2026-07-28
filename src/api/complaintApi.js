import { request, mockRequest, USE_MOCKS } from './client';
import { mockComplaints, nextTicketId } from './mockData';

// --- Query --------------------------------------------------------------

// filters: { status, category, priority, search, dateFrom, dateTo, mine, userId }
export async function fetchComplaints(filters = {}) {
  if (USE_MOCKS) {
    let results = [...mockComplaints];

    if (filters.mine && filters.userId) {
      results = results.filter((c) => c.createdBy === filters.userId);
    }
    if (filters.status) {
      results = results.filter((c) => c.status === filters.status);
    }
    if (filters.category) {
      results = results.filter((c) => c.category === filters.category);
    }
    if (filters.priority) {
      results = results.filter((c) => c.priority === filters.priority);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) => c.title.toLowerCase().includes(q) || c.ticketId.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }
    if (filters.dateFrom) {
      results = results.filter((c) => new Date(c.createdAt) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      results = results.filter((c) => new Date(c.createdAt) <= new Date(filters.dateTo));
    }

    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return mockRequest(results, { delay: 400 });
  }
  // const params = new URLSearchParams(filters).toString();
  // return request(`/complaints?${params}`);
}

export async function fetchComplaintById(id) {
  if (USE_MOCKS) {
    const complaint = mockComplaints.find((c) => c.id === id);
    if (!complaint) return mockRequest(null, { shouldFail: true, failMessage: 'Complaint not found.' });
    return mockRequest(complaint, { delay: 300 });
  }
  // return request(`/complaints/${id}`);
}

// --- Mutations ------------------------------------------------------------

export async function createComplaint({ title, description, category, priority, attachments, userId, userName }) {
  if (USE_MOCKS) {
    const now = new Date().toISOString();
    const complaint = {
      id: `c${mockComplaints.length + 1}`,
      ticketId: nextTicketId(),
      title,
      description,
      category,
      priority,
      status: 'open',
      createdBy: userId,
      createdByName: userName,
      assignedTo: null,
      assignedToName: null,
      attachments: attachments || [],
      createdAt: now,
      updatedAt: now,
      history: [{ id: `h${Date.now()}`, action: 'created', actor: userName, timestamp: now, note: 'Complaint submitted' }],
    };
    mockComplaints.unshift(complaint);
    return mockRequest(complaint, { delay: 500 });
  }
  // return request('/complaints', { method: 'POST', body: { title, description, category, priority, attachments } });
}

export async function updateComplaintStatus({ id, status, actorName, comment }) {
  if (USE_MOCKS) {
    const complaint = mockComplaints.find((c) => c.id === id);
    if (!complaint) return mockRequest(null, { shouldFail: true, failMessage: 'Complaint not found.' });
    const now = new Date().toISOString();
    const previousStatus = complaint.status;
    complaint.status = status;
    complaint.updatedAt = now;
    complaint.history.push({
      id: `h${Date.now()}`,
      action: 'status-change',
      actor: actorName,
      timestamp: now,
      note: `Status changed from ${previousStatus} to ${status}`,
      comment,
    });
    return mockRequest(complaint, { delay: 400 });
  }
  // return request(`/complaints/${id}/status`, { method: 'PATCH', body: { status, comment } });
}

export async function assignComplaint({ id, assigneeId, assigneeName, actorName }) {
  if (USE_MOCKS) {
    const complaint = mockComplaints.find((c) => c.id === id);
    if (!complaint) return mockRequest(null, { shouldFail: true, failMessage: 'Complaint not found.' });
    const now = new Date().toISOString();
    complaint.assignedTo = assigneeId;
    complaint.assignedToName = assigneeName;
    complaint.updatedAt = now;
    complaint.history.push({
      id: `h${Date.now()}`,
      action: 'assigned',
      actor: actorName,
      timestamp: now,
      note: `Assigned to ${assigneeName}`,
    });
    return mockRequest(complaint, { delay: 400 });
  }
  // return request(`/complaints/${id}/assign`, { method: 'PATCH', body: { assigneeId } });
}
