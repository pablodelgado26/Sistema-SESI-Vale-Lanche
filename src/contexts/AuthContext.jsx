'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se está autenticado no localStorage
    const checkAuth = () => {
      const authStatus = localStorage.getItem('sesi-auth');
      setIsAuthenticated(authStatus === 'true');
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (email, password) => {
    const validEmail = process.env.NEXT_PUBLIC_LOGIN_EMAIL;
    const validPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('sesi-auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('sesi-auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
