import Projects from "../components/sections/Projects";
import Footer from "../components/sections/Footer";

export default function ProjectsPage() {
  return (
    <div style={styles.container}>
      <Projects />
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
  },
};
