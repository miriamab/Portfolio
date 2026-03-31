"use client";
import { useRouter } from "next/navigation";

export default function AboutMe() {
  const router = useRouter();

  const handleBack = () => {
    sessionStorage.setItem('returningFromAbout', 'true');
    router.push("/", { scroll: false });
  };

  return (
    <>
      <style>{`
        .about-me-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          display: flex;
          background: #451eff;
          color: #fff;
          z-index: 9999;
          overflow: hidden;
        }
        .about-me-image-container {
          position: absolute;
          top: 4rem;
          right: 8rem;
          width: 16vw;
          max-width: 280px;
          min-width: 180px;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          /* Organische Form, leicht unregelmäßig wie ein weicher Kieselstein / Tropfen */
          border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
        }
        .about-me-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .about-me-image-container {
            top: 6rem;
            right: 2rem;
            width: 32vw;
          }
        }
      `}</style>

      <section className="about-me-wrapper">
        <button className="about-me-button" onClick={handleBack} style={styles.backButton}>
          BACK
        </button>
        <div className="about-me-image-container">
          <img src="/profile.jpg" alt="Miriam Abbas" className="about-me-image" />
        </div>
        <div className="about-me-content" style={styles.content}>
          <p style={styles.text}>
            Hi there, my name is Miriam! <br /> <br />
              I am an Informatics and Design student in Munich specializing in the intersection
              of technical logic and user-centered design. Currently, I’m diving deep into Python,
              JavaScript, and AI to create modern websites and AI-driven projects. Beyond coding,
              I’m passionate about agile project organization, combining efficient workflows with
              a human-centered approach to build digital solutions that really work for people.
            </p>
        </div>
      </section>
    </>
  );
}

const styles = {
  backButton: {
    position: "absolute" as const,
    top: "3rem",
    left: "3rem",
    padding: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: 400,
    fontFamily: "Gasoek One, sans-serif",
    letterSpacing: "0.05em",
    color: "#ffffff",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 20,
  },
  content: {
    width: "80%",
    marginTop: "21rem",
    marginLeft: "3rem",
    marginRight: "1.3rem",
  },
  text: {
    textAlign: "left" as const,
    letterSpacing: "-0.03rem",
    fontFamily: "Funnel Sans, sans-serif",
    fontSize: "2.5rem",
    fontWeight: 500,
    lineHeight: 1.11,
    color: "#ffffff",
  },
};
