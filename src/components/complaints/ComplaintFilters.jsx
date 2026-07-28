import React from 'react';
import { STATUS_OPTIONS, CATEGORY_OPTIONS, PRIORITY_OPTIONS } from '../../constants';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';

export default function ComplaintFilters({ filters, onChange, onReset }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Input
          label="Search"
          placeholder="Title, description, or ticket ID"
          value={filters.search || ''}
          onChange={(e) => update('search', e.target.value)}
          className="lg:col-span-2"
        />
        <Select
          label="Status"
          placeholder="All statuses"
          options={STATUS_OPTIONS}
          value={filters.status || ''}
          onChange={(e) => update('status', e.target.value)}
        />
        <Select
          label="Category"
          placeholder="All categories"
          options={CATEGORY_OPTIONS}
          value={filters.category || ''}
          onChange={(e) => update('category', e.target.value)}
        />
        <Select
          label="Priority"
          placeholder="All priorities"
          options={PRIORITY_OPTIONS}
          value={filters.priority || ''}
          onChange={(e) => update('priority', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Input
          label="From date"
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => update('dateFrom', e.target.value)}
        />
        <Input
          label="To date"
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => update('dateTo', e.target.value)}
        />
        <div className="flex items-end">
          <Button variant="secondary" onClick={onReset} className="w-full sm:w-auto">
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}
