import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'admin_token';
const ADMIN_KEY = 'admin_info';

export interface AdminInfo {
  id: string;
  username: string;
  name: string;
  role: string;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAdmin(): AdminInfo | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminInfo;
  } catch {
    return null;
  }
}

export function setAdmin(admin: AdminInfo): void {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function removeAdmin(): void {
  localStorage.removeItem(ADMIN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function clearAuth(): void {
  removeToken();
  removeAdmin();
}

export function useAdminAuth() {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [admin, setAdminState] = useState<AdminInfo | null>(() => getAdmin());

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY) {
        setTokenState(e.newValue);
      }
      if (e.key === ADMIN_KEY) {
        setAdminState(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback((tokenVal: string, adminInfo: AdminInfo) => {
    setToken(tokenVal);
    setAdmin(adminInfo);
    setTokenState(tokenVal);
    setAdminState(adminInfo);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setTokenState(null);
    setAdminState(null);
  }, []);

  return {
    token,
    admin,
    isLoggedIn: !!token,
    login,
    logout,
  };
}
