/**
 * Author: Miriam Abbas
 */

import Hero from "./components/sections/Hero";
import AboutMe from "./components/sections/AboutMe";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div style={styles.container}>
      <Navigation />
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    padding: '0 4rem',
  },
};
