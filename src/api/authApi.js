import { request, mockRequest, USE_MOCKS } from './client';
import { mockUsers } from './mockData';

// Replace bodies of these functions with the commented `request(...)` calls
// once your REST endpoints exist. Signatures are designed to match typical
// Express/Django/Rails auth routes.

export async function login({ email, password }) {
  if (USE_MOCKS) {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      return mockRequest(null, { shouldFail: true, failMessage: 'Invalid email or password.' });
    }
    const { password: _pw, ...safeUser } = user;
    return mockRequest({ user: safeUser, token: `mock-token-${user.id}` });
  }
  // return request('/auth/login', { method: 'POST', body: { email, password } });
}

export async function signup({ name, email, password }) {
  if (USE_MOCKS) {
    if (mockUsers.some((u) => u.email === email)) {
      return mockRequest(null, { shouldFail: true, failMessage: 'An account with this email already exists.' });
    }
    const newUser = { id: `u${mockUsers.length + 1}`, name, email, password, role: 'user' };
    mockUsers.push(newUser);
    const { password: _pw, ...safeUser } = newUser;
    return mockRequest({ user: safeUser, token: `mock-token-${newUser.id}` });
  }
  // return request('/auth/signup', { method: 'POST', body: { name, email, password } });
}

export async function fetchCurrentUser(userId) {
  if (USE_MOCKS) {
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) return mockRequest(null, { shouldFail: true, failMessage: 'Session expired.' });
    const { password: _pw, ...safeUser } = user;
    return mockRequest({ user: safeUser }, { delay: 200 });
  }
  // return request('/auth/me');
}
