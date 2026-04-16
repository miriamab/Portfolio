import AboutMe from "../components/sections/AboutMe";

export default function AboutPage() {
  return (
    <div style={styles.container}>
      <AboutMe />
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
