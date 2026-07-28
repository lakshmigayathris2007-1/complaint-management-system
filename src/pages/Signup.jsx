import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AlertBanner from '../components/common/AlertBanner';
import { validateSignup, hasErrors } from '../utils/validators';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateSignup(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setFormError('');
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Resolve</h1>
          <p className="mt-1 text-sm text-ink-muted">Create an account to submit and track complaints</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
          {formError && <AlertBanner tone="error">{formError}</AlertBanner>}

          <Input
            label="Full name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            required
            autoComplete="new-password"
            hint="At least 8 characters."
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            error={errors.password}
          />
          <Input
            label="Confirm password"
            type="password"
            required
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
          />

          <Button type="submit" loading={submitting} className="mt-2 w-full">
            Create account
          </Button>

          <p className="text-center text-sm text-ink-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
