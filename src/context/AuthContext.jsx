import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { login as loginApi, signup as signupApi, fetchCurrentUser } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check for an existing session
  const [error, setError] = useState(null);

  // Restore session on first load, e.g. after a page refresh.
  useEffect(() => {
    const storedUserId = localStorage.getItem('cms_user_id');
    if (!storedUserId) {
      setLoading(false);
      return;
    }
    fetchCurrentUser(storedUserId)
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem('cms_token');
        localStorage.removeItem('cms_user_id');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const res = await loginApi({ email, password });
      localStorage.setItem('cms_token', res.token);
      localStorage.setItem('cms_user_id', res.user.id);
      setUser(res.user);
      return res.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setError(null);
    try {
      const res = await signupApi({ name, email, password });
      localStorage.setItem('cms_token', res.token);
      localStorage.setItem('cms_user_id', res.user.id);
      setUser(res.user);
      return res.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user_id');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
