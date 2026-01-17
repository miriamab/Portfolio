/**
 * Author: Miriam Abbas
 * Login Page - Anmeldeseite für JWT-Authentifizierung
 */

"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Während Auth lädt, Ladebildschirm anzeigen
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <p style={{ textAlign: 'center', color: '#451eff' }}>Laden...</p>
        </div>
      </div>
    );
  }

  // Wenn bereits eingeloggt, zur Startseite weiterleiten
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Anmeldung fehlgeschlagen');
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>Melden Sie sich an, um fortzufahren</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>E-Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="ihre@email.de"
              required
              disabled={isLoading}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>

        <p style={styles.hint}>
          Noch kein Konto? Registrierung über API möglich.
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 10,
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '2.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(69, 30, 255, 0.1)',
    border: '1px solid rgba(69, 30, 255, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 400,
    fontFamily: 'Gasoek One',
    color: '#451eff',
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#451eff',
  },
  input: {
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: 'IBM Plex Mono, monospace',
  },
  button: {
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    backgroundColor: '#451eff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem',
    fontFamily: 'IBM Plex Mono, monospace',
  },
  error: {
    padding: '0.875rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '4px',
    fontSize: '0.9rem',
    textAlign: 'center' as const,
  },
  hint: {
    fontSize: '0.85rem',
    color: '#888',
    textAlign: 'center' as const,
    marginTop: '1.5rem',
  },
};
