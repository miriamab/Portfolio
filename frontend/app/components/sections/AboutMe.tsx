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
    <section id="about" style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>About Me</h2>
        <div style={styles.boxesContainer}>
          <div style={styles.leftBox}>
            <p style={styles.boxText}>Hi there, my name is Miriam! <br></br>
              I am an Informatics and Design student in Munich specializing in the intersection 
              of technical logic and user-centered design. Currently, I’m diving deep into Python, 
              JavaScript, and AI to create modern websites and AI-driven projects. Beyond coding, 
              I’m passionate about agile project organization, combining efficient workflows with 
              a human-centered approach to build digital solutions that really work for people. </p>
          </div>
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
    padding: '2rem 2rem',
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
    position: 'relative' as const,
    width: '100%',
    minHeight: '400px',
  },
  leftBox: {
    backgroundColor: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    padding: '1.5rem',
    borderRadius: '4px',
    display: 'inline-block' as const,
    width: '60%',
  },
  rightBox: {
    backgroundColor: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    padding: '1.5rem',
    borderRadius: '4px',
    position: 'absolute' as const,
    right: 0,
    top: '180px',
  },
  boxText: {
    fontSize: '1.1rem',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#451eff',
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
