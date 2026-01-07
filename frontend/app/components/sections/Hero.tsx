export default function Hero() {
  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <h1 style={styles.title}>Miriam Abbas</h1>
        <p style={styles.subtitle}>Web Developer & Designer</p>
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
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: 400,
    opacity: 0.9,
  },
};
