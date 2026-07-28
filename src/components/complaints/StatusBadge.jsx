import React from 'react';
import Badge from '../common/Badge';
import { STATUS } from '../../constants';
import { toTitleCase } from '../../utils/formatters';

const STYLES = {
  [STATUS.OPEN]: 'bg-status-open-bg text-status-open',
  [STATUS.IN_PROGRESS]: 'bg-status-progress-bg text-status-progress',
  [STATUS.RESOLVED]: 'bg-status-resolved-bg text-status-resolved',
  [STATUS.CLOSED]: 'bg-status-closed-bg text-status-closed',
};

export default function StatusBadge({ status }) {
  return (
    <Badge className={STYLES[status] || STYLES[STATUS.OPEN]}>
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {toTitleCase(status)}
    </Badge>
  );
}
