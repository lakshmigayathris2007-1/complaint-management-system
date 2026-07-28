import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AlertBanner from '../components/common/AlertBanner';
import { validateLogin, hasErrors } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setFormError('');
    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Resolve</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in to track or manage complaints</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
          {formError && <AlertBanner tone="error">{formError}</AlertBanner>}

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
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            error={errors.password}
          />

          <Button type="submit" loading={submitting} className="mt-2 w-full">
            Sign in
          </Button>

          <p className="text-center text-sm text-ink-muted">
            No account?{' '}
            <Link to="/signup" className="font-medium text-primary underline underline-offset-2">
              Create one
            </Link>
          </p>
        </form>

        <div className="mt-4 rounded-lg border border-dashed border-border bg-surface p-3 text-xs text-ink-muted">
          <p className="font-medium text-ink">Demo accounts</p>
          <p>Member: priya@example.com / password123</p>
          <p>Admin: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
