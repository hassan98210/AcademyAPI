import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginApi, decodeJwt } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('academy_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('academy_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user && token) {
      const decoded = decodeJwt(token);
      if (decoded?.sub) {
        const authUser = { id: decoded.sub, email: decoded.email, role: decoded.role };
        setUser(authUser);
        localStorage.setItem('academy_user', JSON.stringify(authUser));
      }
    }
  }, [token, user]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginApi(credentials);
      const decoded = decodeJwt(result.token);
      const authUser = { id: decoded.sub, email: result.email, role: result.role };

      localStorage.setItem('academy_token', result.token);
      localStorage.setItem('academy_user', JSON.stringify(authUser));

      setToken(result.token);
      setUser(authUser);
      return authUser;
    } catch (err) {
      setError(err?.response?.data || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('academy_token');
    localStorage.removeItem('academy_user');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, error, login, logout, isAuthenticated: Boolean(user) }),
    [user, token, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
