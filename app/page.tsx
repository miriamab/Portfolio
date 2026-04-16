
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <div style={styles.container}>
      <Hero />
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100dvh',
    overflow: 'hidden',
  },
};
