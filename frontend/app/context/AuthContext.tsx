/**
 * Author: Miriam Abbas
 * Auth Context - Globaler Authentifizierungsstatus
 */

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  // Beim Laden: Token aus LocalStorage holen und verifizieren
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      
      if (storedToken) {
        try {
          // Token beim Backend verifizieren
          const res = await fetch(`${backendUrl}/api/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (res.ok) {
            const data = await res.json();
            setToken(storedToken);
            setUser(data.user);
          } else {
            // Token ungültig oder abgelaufen
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [backendUrl]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${backendUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Anmeldung fehlgeschlagen' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Verbindungsfehler zum Server' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      isAuthenticated: !!token && !!user,
      login,
      logout
    }}>
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

// Helper-Funktion für authentifizierte API-Aufrufe
export function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}
