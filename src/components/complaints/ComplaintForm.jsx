import React, { useState } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import AttachmentUploader from './AttachmentUploader';
import AlertBanner from '../common/AlertBanner';
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from '../../constants';
import { validateComplaint, hasErrors } from '../../utils/validators';

export default function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', category: '', priority: '' });
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateComplaint(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit({ ...form, attachments });
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong submitting your complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {submitError && <AlertBanner tone="error">{submitError}</AlertBanner>}

      <Input
        label="Title"
        required
        placeholder="e.g. Charged twice for the same order"
        value={form.title}
        onChange={(e) => update('title', e.target.value)}
        error={errors.title}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Category"
          required
          options={CATEGORY_OPTIONS}
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          error={errors.category}
        />
        <Select
          label="Priority"
          required
          options={PRIORITY_OPTIONS}
          value={form.priority}
          onChange={(e) => update('priority', e.target.value)}
          error={errors.priority}
          hint="How urgently does this need attention?"
        />
      </div>

      <Textarea
        label="Description"
        required
        placeholder="Describe what happened, when, and any order or reference numbers involved."
        value={form.description}
        onChange={(e) => update('description', e.target.value)}
        error={errors.description}
      />

      <AttachmentUploader files={attachments} onChange={setAttachments} />

      <div className="flex justify-end">
        <Button type="submit" loading={submitting}>
          Submit complaint
        </Button>
      </div>
    </form>
  );
}
