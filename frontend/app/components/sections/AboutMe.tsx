export default function AboutMe() {
  const skills = [
    { name: 'Python', rating: 5 },
    { name: 'JavaScript', rating: 4 },
    { name: 'UI/UX Design', rating: 4 },
    { name: 'Agile Management', rating: 5 },
    { name: 'Generative AI', rating: 3 },
    { name: 'Version Control (Git)', rating: 4 },
    { name: 'HTML/CSS', rating: 4 },
  ];

  const renderRating = (rating: number) => {
    return (
      <span style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={styles.square}>
            {i <= rating ? '■' : '□'}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>About Me</h2>
        <div style={styles.boxesContainer}>
          <div style={styles.box}>
            <p style={styles.boxText}>Hi there, my name is Miriam! I am an Informatics and Design student specializing in the intersection of technical logic and user-centered design. With a focus on Python, JavaScript, and Generative AI, I build everything from interactive 3D web environments to intelligent chatbot systems. As an experienced Scrum Master, I combine my development skills with agile leadership to deliver robust, well-designed software solutions.</p>
          </div>
          <div style={styles.box}>
            <div style={styles.skillsList}>
              {skills.map((skill, index) => (
                <div key={index} style={styles.skillItem}>
                  <span style={styles.skillName}>{skill.name}</span>
                  {renderRating(skill.rating)}
                </div>
              ))}
            </div>
          </div>
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
    width: '100%',
  },
  title: {
    fontSize: 'clamp(2rem, 10vw, 3.5rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontFamily: 'Gasoek One',
    marginBottom: '1rem',
    textAlign: 'left' as const,
  },
  text: {
    fontSize: '1.1rem',
    fontWeight: 400,
    lineHeight: 1.8,
  },
  boxesContainer: {
    display: 'flex' as const,
    gap: '2rem',
    width: '100%',
    alignItems: 'stretch' as const,
    justifyContent: 'space-between' as const,
  },
  box: {
    backgroundColor: 'white',
    border: '2px solid #451eff',
    padding: '1.5rem',
    borderRadius: '4px',
    display: 'flex' as const,
    flexDirection: 'column' as const,
  },
  boxText: {
    fontSize: '1.1rem',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#451eff',
    maxWidth: '550px',
  },
  skillsList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1rem',
    minWidth: '300px',
  },
  skillItem: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    gap: '4rem',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    whiteSpace: 'nowrap' as const,
  },
  skillName: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#451eff',
  },
  ratingContainer: {
    display: 'flex' as const,
    gap: '0.25rem',
  },
  square: {
    fontSize: '1.2rem',
    color: '#451eff',
    fontFamily: 'monospace',
  },
};
