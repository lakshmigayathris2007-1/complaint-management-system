// Sample data so the whole flow — submit, track, filter, assign, resolve —
// is visible without a backend connected yet. Replace with real API
// responses once USE_MOCKS is turned off in client.js.

export let mockUsers = [
  { id: 'u1', name: 'Priya Nair', email: 'priya@example.com', password: 'password123', role: 'user' },
  { id: 'u2', name: 'Arjun Mehta', email: 'arjun@example.com', password: 'password123', role: 'user' },
  { id: 'admin1', name: 'Deepa Krishnan', email: 'admin@example.com', password: 'admin123', role: 'admin' },
];

export let mockComplaints = [
  {
    id: 'c1',
    ticketId: 'CMP-2026-1001',
    title: 'Charged twice for the same order',
    description:
      'I was billed two times for order #48213 placed on July 20. The duplicate charge has not been reversed yet.',
    category: 'billing',
    priority: 'high',
    status: 'in-progress',
    createdBy: 'u1',
    createdByName: 'Priya Nair',
    assignedTo: 'admin1',
    assignedToName: 'Deepa Krishnan',
    attachments: [{ name: 'bank-statement.pdf', size: 214000 }],
    createdAt: '2026-07-21T09:14:00Z',
    updatedAt: '2026-07-23T11:02:00Z',
    history: [
      { id: 'h1', action: 'created', actor: 'Priya Nair', timestamp: '2026-07-21T09:14:00Z', note: 'Complaint submitted' },
      { id: 'h2', action: 'assigned', actor: 'Deepa Krishnan', timestamp: '2026-07-21T14:00:00Z', note: 'Assigned to Deepa Krishnan' },
      { id: 'h3', action: 'status-change', actor: 'Deepa Krishnan', timestamp: '2026-07-23T11:02:00Z', note: 'Status changed from open to in-progress' },
    ],
  },
  {
    id: 'c2',
    ticketId: 'CMP-2026-1002',
    title: 'Package arrived damaged',
    description: 'The parcel for order #48390 arrived with a crushed corner and the item inside was cracked.',
    category: 'delivery',
    priority: 'medium',
    status: 'open',
    createdBy: 'u1',
    createdByName: 'Priya Nair',
    assignedTo: null,
    assignedToName: null,
    attachments: [{ name: 'damaged-box.jpg', size: 890000 }],
    createdAt: '2026-07-25T16:40:00Z',
    updatedAt: '2026-07-25T16:40:00Z',
    history: [
      { id: 'h4', action: 'created', actor: 'Priya Nair', timestamp: '2026-07-25T16:40:00Z', note: 'Complaint submitted' },
    ],
  },
  {
    id: 'c3',
    ticketId: 'CMP-2026-0987',
    title: 'Support agent was dismissive on call',
    description: 'Called support about a refund and the agent hung up before resolving the issue.',
    category: 'staff-conduct',
    priority: 'critical',
    status: 'resolved',
    createdBy: 'u2',
    createdByName: 'Arjun Mehta',
    assignedTo: 'admin1',
    assignedToName: 'Deepa Krishnan',
    attachments: [],
    createdAt: '2026-07-15T10:05:00Z',
    updatedAt: '2026-07-18T08:30:00Z',
    history: [
      { id: 'h5', action: 'created', actor: 'Arjun Mehta', timestamp: '2026-07-15T10:05:00Z', note: 'Complaint submitted' },
      { id: 'h6', action: 'assigned', actor: 'Deepa Krishnan', timestamp: '2026-07-15T13:00:00Z', note: 'Assigned to Deepa Krishnan' },
      { id: 'h7', action: 'status-change', actor: 'Deepa Krishnan', timestamp: '2026-07-16T09:00:00Z', note: 'Status changed from open to in-progress' },
      { id: 'h8', action: 'status-change', actor: 'Deepa Krishnan', timestamp: '2026-07-18T08:30:00Z', note: 'Status changed from in-progress to resolved', comment: 'Escalated to team lead; refund issued and agent coached.' },
    ],
  },
  {
    id: 'c4',
    ticketId: 'CMP-2026-0954',
    title: 'App crashes when uploading receipt',
    description: 'The mobile app closes unexpectedly every time I try to attach a photo to a reimbursement request.',
    category: 'technical',
    priority: 'medium',
    status: 'closed',
    createdBy: 'u2',
    createdByName: 'Arjun Mehta',
    assignedTo: 'admin1',
    assignedToName: 'Deepa Krishnan',
    attachments: [],
    createdAt: '2026-07-10T12:00:00Z',
    updatedAt: '2026-07-14T09:00:00Z',
    history: [
      { id: 'h9', action: 'created', actor: 'Arjun Mehta', timestamp: '2026-07-10T12:00:00Z', note: 'Complaint submitted' },
      { id: 'h10', action: 'status-change', actor: 'Deepa Krishnan', timestamp: '2026-07-12T09:00:00Z', note: 'Status changed from open to resolved', comment: 'Fixed in app version 4.2.1' },
      { id: 'h11', action: 'status-change', actor: 'Deepa Krishnan', timestamp: '2026-07-14T09:00:00Z', note: 'Status changed from resolved to closed' },
    ],
  },
  {
    id: 'c5',
    ticketId: 'CMP-2026-1010',
    title: 'Requesting refund policy clarification',
    description: 'The refund policy page contradicts what I was told over email. Could someone confirm the correct window?',
    category: 'other',
    priority: 'low',
    status: 'open',
    createdBy: 'u1',
    createdByName: 'Priya Nair',
    assignedTo: null,
    assignedToName: null,
    attachments: [],
    createdAt: '2026-07-27T08:00:00Z',
    updatedAt: '2026-07-27T08:00:00Z',
    history: [
      { id: 'h12', action: 'created', actor: 'Priya Nair', timestamp: '2026-07-27T08:00:00Z', note: 'Complaint submitted' },
    ],
  },
];

export let mockNotifications = [
  {
    id: 'n1',
    userId: 'u1',
    complaintId: 'c1',
    ticketId: 'CMP-2026-1001',
    message: 'Your complaint "Charged twice for the same order" moved to In progress.',
    read: false,
    createdAt: '2026-07-23T11:02:00Z',
  },
  {
    id: 'n2',
    userId: 'u2',
    complaintId: 'c3',
    ticketId: 'CMP-2026-0987',
    message: 'Your complaint "Support agent was dismissive on call" was resolved.',
    read: true,
    createdAt: '2026-07-18T08:30:00Z',
  },
];

export function nextTicketId() {
  const year = new Date().getFullYear();
  const num = 1000 + mockComplaints.length + 1;
  return `CMP-${year}-${num}`;
}
