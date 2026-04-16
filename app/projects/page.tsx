import Projects from "../components/sections/Projects";

export default function ProjectsPage() {
  return (
    <div style={styles.container}>
      <Projects />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100dvh',
    backgroundColor: '#451eff',
  },
};
