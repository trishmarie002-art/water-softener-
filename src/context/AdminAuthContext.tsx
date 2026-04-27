import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (session) {
      const { expiry } = JSON.parse(session);
      if (expiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        const session = {
          expiry: Date.now() + SESSION_DURATION,
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
