/**
 * Author: Miriam Abbas
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, getAuthHeaders } from "../../context/AuthContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};

    // Name-Validierung
    if (!formData.name.trim()) {
      errors.name = 'Name ist erforderlich';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name muss mindestens 2 Zeichen lang sein';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name darf maximal 100 Zeichen lang sein';
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein';
    }

    // Nachricht-Validierung
    if (!formData.message.trim()) {
      errors.message = 'Nachricht ist erforderlich';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
    } else if (formData.message.trim().length > 2000) {
      errors.message = 'Nachricht darf maximal 2000 Zeichen lang sein';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});

    // Frontend-Validierung
    if (!validateForm()) {
      return;
    }

    try {
      setStatus('sending');

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Bei 401 (Unauthorized) zur Login-Seite weiterleiten
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Senden der Nachricht');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Beim Senden ist ein Fehler aufgetreten.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Contact</h2>
        <p style={styles.description}>
          Interested in working together? Let me know!
        </p>

        {/* Login-Hinweis wenn nicht eingeloggt */}
        {!isAuthenticated && (
          <div style={styles.loginNotice}>
            <p>
              Bitte <a href="/login" style={styles.loginLink}>melden Sie sich an</a>, um das Kontaktformular zu nutzen.
            </p>
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={validationErrors.name ? { ...styles.input, ...styles.inputInvalid } : styles.input}
              required
            />
            {validationErrors.name && (
              <p style={styles.error} role="alert">{validationErrors.name}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={validationErrors.email ? { ...styles.input, ...styles.inputInvalid } : styles.input}
              required
            />
            {validationErrors.email && (
              <p style={styles.error} role="alert">{validationErrors.email}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={validationErrors.message ? { ...styles.textarea, ...styles.inputInvalid } : styles.textarea}
              rows={5}
              required
            />
            {validationErrors.message && (
              <p style={styles.error} role="alert">{validationErrors.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            style={styles.submitButton} 
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Wird gesendet…' : 'Nachricht senden'}
          </button>

          {status === 'success' && (
            <p style={styles.success}>✓ Nachricht erfolgreich gesendet!</p>
          )}
          {status === 'error' && errorMessage && (
            <p style={styles.error}>{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '4rem 2rem',
    color: '#451eff',
    position: 'relative' as const,
    zIndex: 1,
  },
  content: {
    maxWidth: '800px',
  },
  title: {
    fontSize: 'clamp(2rem, 10vw, 3.5rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontFamily: 'Gasoek One',
    marginBottom: '1rem',
    textAlign: 'left' as const,
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
  },
  contactLinks: {
    display: 'flex' as const,
    gap: '1.5rem',
    flexWrap: 'wrap' as const,
  },
  link: {
    padding: '0.75rem 1.5rem',
    border: '1px solid #451eff',
    borderRadius: '4px',
    textDecoration: 'none',
    color: '#451eff',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#451eff',
      color: '#fbfbfb',
    },
  },
  form: {
    marginTop: '3rem',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#451eff',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    borderRadius: '6px',
    fontFamily: 'IBM Plex Mono, monospace',
    color: '#451eff',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(69, 30, 255, 0.1)',
    },
  },
  textarea: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    borderRadius: '6px',
    fontFamily: 'IBM Plex Mono, monospace',
    color: '#451eff',
    transition: 'all 0.3s ease',
    resize: 'none' as const,
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(69, 30, 255, 0.1)',
    },
  },
  success: {
    color: '#0b9b3a',
    marginTop: '0.75rem',
  },
  error: {
    color: '#d64545',
    marginTop: '0.75rem',
  },
  inputInvalid: {
    borderColor: '#d64545',
    boxShadow: '0 0 0 3px rgba(214, 69, 69, 0.08)',
  },
  submitButton: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#451eff',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'IBM Plex Mono, monospace',
    ':hover': {
      backgroundColor: '#ffffff',
      color: '#451eff',
    },
  },
  loginNotice: {
    backgroundColor: 'rgba(69, 30, 255, 0.1)',
    border: '1px solid #451eff',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
    color: '#451eff',
  },
  loginLink: {
    color: '#451eff',
    fontWeight: 600,
    textDecoration: 'underline',
  },
};
