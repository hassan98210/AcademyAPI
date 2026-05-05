import api from './api';

export const login = (credentials) => api.post('/api/auth/login', credentials).then((response) => response.data);

export function decodeJwt(token) {
  if (!token) return {};
  const payload = token.split('.')[1];
  if (!payload) return {};

  try {
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded;
  } catch (error) {
    return {};
  }
}
