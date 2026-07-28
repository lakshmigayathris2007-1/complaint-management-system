export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email) errors.email = 'Enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

export function validateSignup({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!email) errors.email = 'Enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Choose a password.';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export function validateComplaint({ title, description, category, priority }) {
  const errors = {};
  if (!title || title.trim().length < 5) errors.title = 'Give your complaint a short, descriptive title (5+ characters).';
  if (!description || description.trim().length < 20) errors.description = 'Describe the issue in at least 20 characters so it can be reviewed accurately.';
  if (!category) errors.category = 'Select a category.';
  if (!priority) errors.priority = 'Select a priority level.';
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
