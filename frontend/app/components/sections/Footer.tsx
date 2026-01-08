export default function Footer() {
  return (
    <footer id="footer" style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.socialLinks}>
          <a href="mailto:miriam.abbas@hm.edu" style={styles.link}>Email</a>
          <a href="https://github.com/miriamab" target="_blank" rel="noopener noreferrer" style={styles.link}>GitHub</a>
          <a href="https://www.linkedin.com/in/miriam-abbas-579104397/" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
        </div>
        <p style={styles.copyright}>2026 Miriam Abbas</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'transparent',
    borderTop: '1px solid #451eff',
    color: '#6b6bff',
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    marginTop: '4em',
    position: 'relative' as const,
    zIndex: 1,
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  socialLinks: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
  },
  link: {
    color: '#6b6bff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    borderBottom: '2px solid transparent',
    paddingBottom: '0.25rem',
    ':hover': {
      borderBottomColor: '#451eff',
      opacity: 0.9,
    },
  },
  copyright: {
    fontSize: '0.9rem',
    opacity: 0.9,
    margin: 0,
  },
};
