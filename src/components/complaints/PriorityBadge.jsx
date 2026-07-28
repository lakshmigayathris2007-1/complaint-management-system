import React from 'react';
import Badge from '../common/Badge';
import { PRIORITY } from '../../constants';
import { toTitleCase } from '../../utils/formatters';

const STYLES = {
  [PRIORITY.LOW]: 'bg-priority-low-bg text-priority-low',
  [PRIORITY.MEDIUM]: 'bg-priority-medium-bg text-priority-medium',
  [PRIORITY.HIGH]: 'bg-priority-high-bg text-priority-high',
  [PRIORITY.CRITICAL]: 'bg-priority-critical-bg text-priority-critical',
};

export default function PriorityBadge({ priority }) {
  return <Badge className={STYLES[priority] || STYLES[PRIORITY.LOW]}>{toTitleCase(priority)}</Badge>;
}
