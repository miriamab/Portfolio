"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [smtpNotConfigured, setSmtpNotConfigured] = useState(false);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const openMailClient = () => {
    const to = 'miriam.abbas@hm.edu';
    const subject = encodeURIComponent(formData.name ? `Message from ${formData.name}` : 'Portfolio contact');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSmtpNotConfigured(false);

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    try {
      setStatus('sending');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Parse JSON if possible
      let data: any = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // non-JSON response (e.g., server error HTML) — fall through
      }

      if (res.status === 501) {
        // SMTP not configured on server — offer mailto fallback
        setSmtpNotConfigured(true);
        setStatus('idle');
        setErrorMessage(data?.error || 'SMTP not configured on server.');
        return;
      }

      if (res.status === 400) {
        // Invalid email (server-side validation or recipient rejected)
        setStatus('idle');
        setErrorMessage(data?.error || 'Invalid email address.');
        return;
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Unknown error');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Beim Senden ist ein Fehler aufgetreten.');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Contact</h2>
        <p style={styles.description}>
          Interested in working together? Let me know!
        </p>

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
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={formData.email && !isValidEmail(formData.email) ? { ...styles.input, ...styles.inputInvalid } : styles.input}
              required
              aria-invalid={formData.email ? (!isValidEmail(formData.email)).toString() : 'false'}
              aria-describedby="email-error"
            />
            {formData.email && !isValidEmail(formData.email) && (
              <p id="email-error" style={styles.error} role="alert">Please enter a valid email address.</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              rows={5}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton} disabled={status === 'sending' || !isValidEmail(formData.email)}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && <p style={styles.success}>Nachricht gesendet — danke!</p>}
          {status === 'error' && <p style={styles.error}>{errorMessage || 'Fehler beim Senden'}</p>}
          {errorMessage && status === 'idle' && <p style={styles.error}>{errorMessage}</p>}

          {smtpNotConfigured && (
            <div style={{ marginTop: '1rem' }}>
              <p style={styles.error}>SMTP ist nicht konfiguriert. Du kannst stattdessen dein Mailprogramm öffnen:</p>
              <button type="button" onClick={openMailClient} style={{ ...styles.submitButton, marginTop: '0.5rem' }}>Mail öffnen</button>
            </div>
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
};
