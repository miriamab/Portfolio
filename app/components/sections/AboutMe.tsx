"use client";
import { getAssetPath } from '../../utils/assetPath';
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
        .about-me-content {
          width: 80%;
          margin-top: 21rem;
          margin-left: 3rem;
          margin-right: 1.3rem;
        }
        .about-me-text {
          text-align: left;
          letter-spacing: -0.03rem;
          font-family: Funnel Sans, sans-serif;
          font-size: 2.5rem;
          font-weight: 500;
          line-height: 1.11;
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .about-me-content {
            margin-top: 15rem;
            width: 85%;
          }
          .about-me-text {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .about-me-wrapper {
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .about-me-image-container {
            position: relative;
            top: auto;
            right: auto;
            margin-top: 5rem;
            margin-right: -10vw;
            align-self: flex-end;
            width: 45vw;
            min-width: 200px;
          }
          .about-me-content {
            margin-top: 4rem;
            margin-left: 1.5rem;
            margin-right: 1.5rem;
            width: auto;
            padding-bottom: 3rem;
          }
          .about-me-text {
            font-size: 1.4rem;
          }
        }
      `}</style>

      <section className="about-me-wrapper">
        <button className="about-me-button" onClick={handleBack} style={styles.backButton}>
          BACK
        </button>
        <div className="about-me-image-container">
          <img src={getAssetPath("/profile.jpg")} alt="Miriam Abbas" className="about-me-image" />
        </div>
        <div className="about-me-content">
          <p className="about-me-text">
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
};
