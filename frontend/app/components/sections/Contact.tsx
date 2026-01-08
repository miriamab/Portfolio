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
};
