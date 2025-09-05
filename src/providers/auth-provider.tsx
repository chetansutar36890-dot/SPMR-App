'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserRole } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Mock user database
const users: User[] = [
  { id: '1', username: 'Admin User', email: 'admin@spmr.com', role: 'admin' },
  { id: '2', username: 'Doctor Smith', email: 'doctor@spmr.com', role: 'doctor' },
  { id: '3', username: 'Patient John', email: 'patient@spmr.com', role: 'patient' },
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('spmr-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from session storage', error);
      sessionStorage.removeItem('spmr-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login logic
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      // In a real app, you'd also verify the password
      setUser(foundUser);
      sessionStorage.setItem('spmr-user', JSON.stringify(foundUser));
      toast({ title: 'Login successful', description: `Welcome back, ${foundUser.username}!` });
      
      switch (foundUser.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'doctor':
          router.push('/doctor/dashboard');
          break;
        case 'patient':
          router.push('/patient/dashboard');
          break;
        default:
          router.push('/login');
      }
    } else {
      toast({ variant: 'destructive', title: 'Login failed', description: 'Invalid email or password.' });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (username: string, email: string, role: UserRole) => {
    // Mock registration logic
    if (users.some((u) => u.email === email)) {
       toast({ variant: 'destructive', title: 'Registration failed', description: 'Email already in use.' });
      throw new Error('Email already in use');
    }
    const newUser: User = { id: String(users.length + 1), username, email, role };
    users.push(newUser); // In a real app, this would be a DB call
    toast({ title: 'Registration successful', description: 'You can now log in.' });
    router.push('/login');
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('spmr-user');
    router.push('/login');
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
