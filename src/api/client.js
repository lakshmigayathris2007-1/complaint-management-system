// Thin wrapper around fetch. Swap USE_MOCKS to false once real endpoints
// exist, and set VITE_API_BASE_URL in your .env file.
//
// Every api/*Api.js module is written against this client so wiring in a
// real backend later only means changing this file, not every caller.

export const USE_MOCKS = true;

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function getToken() {
  return localStorage.getItem('cms_token');
}

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body (e.g. 204) — that's fine.
  }

  if (!response.ok) {
    throw new ApiError(data?.message || response.statusText, response.status, data);
  }

  return data;
}

// Simulates network latency + the shape of a real response for the mock layer.
export function mockRequest(data, { delay = 500, shouldFail = false, failMessage = 'Request failed' } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new ApiError(failMessage, 400));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

export { ApiError };
