export default function Contact() {
  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Contact</h2>
        <p style={styles.description}>
          Interested in working together? Let me know!
        </p>
        <div style={styles.contactLinks}>
          <a href="mailto:contact@example.com" style={styles.link}>Email</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.link}>GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    color: '#451eff',
    position: 'relative' as const,
    zIndex: 1,
  },
  content: {
    maxWidth: '800px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    opacity: 0.9,
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
};
