/**
 * Author: Miriam Abbas
 */

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if at bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setIsAtBottom(isBottom);

      // Determine active section
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = scrollTop + clientHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNextSection = () => {
    const nextIndex = activeSection + 1;
    if (nextIndex < sections.length) {
      scrollToSection(sections[nextIndex].id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <nav style={styles.nav}>
      {/* Auth Status - oben rechts */}
      {isAuthenticated && (
        <div style={styles.authContainer}>
          <span style={styles.userName}>{user?.name}</span>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}

      {/* Arrow - absolute positioned at bottom */}
      <button
        onClick={scrollToNextSection}
        style={{
          ...styles.arrow,
          display: isAtBottom ? 'none' : 'flex',
          animation: 'arrowBounce 1s ease-in-out infinite',
        }}
        aria-label="Scroll down"
      >
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
        >
          <path
            d="M6 0v16M1 11l5 5 5-5"
            stroke="#451eff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    position: 'fixed',
    left: '2rem',
    top: 0,
    bottom: 0,
    zIndex: 9998,
    width: '12px',
  },
  authContainer: {
    position: 'fixed',
    top: '1.5rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    zIndex: 9999,
  },
  userName: {
    fontSize: '0.9rem',
    color: '#451eff',
    fontWeight: 500,
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    color: '#451eff',
    backgroundColor: 'transparent',
    border: '1px solid #451eff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'IBM Plex Mono, monospace',
    transition: 'all 0.2s ease',
  },
  arrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '30px',
    left: '0',
    marginTop: '-10px',
    transition: 'none',
  },
};
