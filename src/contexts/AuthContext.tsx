// src/contexts/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // ✅ THAY ĐỔI: Ưu tiên đọc token từ cookie trước
      const storedToken = Cookies.get('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to load auth data from storage", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        Cookies.remove('authToken');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token)
    Cookies.set('authToken', newToken, { expires: 7, path: '/' }); 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    localStorage.removeItem('authUser');
    Cookies.remove('authToken', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!token,
      user,
      token,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};