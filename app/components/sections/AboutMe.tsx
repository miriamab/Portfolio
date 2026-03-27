"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutMe() {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleBack = () => {
    if (isClosing) return;
    setIsClosing(true);

    setTimeout(() => {
      router.push("/", { scroll: false });
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes slideDownFull {
          0% { transform: translateY(0); height: 100vh; }
          100% { transform: translateY(calc(100vh - 60px)); height: 60px; }
        }

        .about-me-wrapper {
          min-height: 100vh;
          display: flex;
          background: #451eff;
          color: #fff;
          position: relative;
          z-index: 9999;
          transform-origin: bottom;
        }

        .about-me-wrapper.closing {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          overflow: hidden;
          animation: slideDownFull 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
          pointer-events: none;
        }
      `}</style>

      <section className={`about-me-wrapper ${isClosing ? "closing" : ""}`}>
        <button onClick={handleBack} style={styles.backButton}>
          BACK
        </button>
        <div style={styles.content}>
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
