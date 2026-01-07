export default function Projects() {
  const projects = [
    { title: "Project 1", description: "Description of project 1" },
    { title: "Project 2", description: "Description of project 2" },
    { title: "Project 3", description: "Description of project 3" },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Projects</h2>
        <div style={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} style={styles.projectCard}>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectDescription}>{project.description}</p>
            </div>
          ))}
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
    maxWidth: '1000px',
    width: '100%',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '3rem',
    letterSpacing: '-0.02em',
  },
  projectsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  projectCard: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(69, 30, 255, 0.05)',
    border: '1px solid rgba(69, 30, 255, 0.2)',
  },
  projectTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  projectDescription: {
    fontSize: '0.95rem',
    opacity: 0.8,
  },
};
