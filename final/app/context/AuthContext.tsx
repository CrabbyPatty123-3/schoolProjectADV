'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User, rememberMe?: boolean) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount (for "Remember me")
  useEffect(() => {
    const savedUser = localStorage.getItem('savedUser');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberMe && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('savedUser');
        localStorage.removeItem('rememberMe');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = (userData: User, rememberMe: boolean = false) => {
    setUser(userData);
    
    if (rememberMe) {
      localStorage.setItem('savedUser', JSON.stringify(userData));
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('savedUser');
      localStorage.removeItem('rememberMe');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('savedUser');
    localStorage.removeItem('rememberMe');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

