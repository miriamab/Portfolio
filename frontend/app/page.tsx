import Hero from "./components/sections/Hero";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <div style={styles.container}>
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
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
