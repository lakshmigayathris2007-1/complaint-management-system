// Central source of truth for enums used across forms, filters, and badges.
// Keep this in sync with whatever your backend returns for these fields.

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

export const STATUS_OPTIONS = [
  { value: STATUS.OPEN, label: 'Open' },
  { value: STATUS.IN_PROGRESS, label: 'In progress' },
  { value: STATUS.RESOLVED, label: 'Resolved' },
  { value: STATUS.CLOSED, label: 'Closed' },
];

// Valid forward transitions — used to stop an admin from, say, moving
// a closed complaint back to "open" by accident. Reopening is explicit.
export const STATUS_TRANSITIONS = {
  [STATUS.OPEN]: [STATUS.IN_PROGRESS, STATUS.CLOSED],
  [STATUS.IN_PROGRESS]: [STATUS.RESOLVED, STATUS.OPEN],
  [STATUS.RESOLVED]: [STATUS.CLOSED, STATUS.IN_PROGRESS],
  [STATUS.CLOSED]: [STATUS.OPEN],
};

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW, label: 'Low' },
  { value: PRIORITY.MEDIUM, label: 'Medium' },
  { value: PRIORITY.HIGH, label: 'High' },
  { value: PRIORITY.CRITICAL, label: 'Critical' },
];

export const CATEGORY_OPTIONS = [
  { value: 'billing', label: 'Billing & payments' },
  { value: 'product-quality', label: 'Product quality' },
  { value: 'service', label: 'Service experience' },
  { value: 'delivery', label: 'Delivery & logistics' },
  { value: 'staff-conduct', label: 'Staff conduct' },
  { value: 'technical', label: 'Technical issue' },
  { value: 'other', label: 'Other' },
];

export const MAX_ATTACHMENT_SIZE_MB = 5;
export const MAX_ATTACHMENTS = 3;
export const ACCEPTED_ATTACHMENT_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
