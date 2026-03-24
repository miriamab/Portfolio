"use client";

import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Footer from "./sections/Footer";

export default function ScrollManager() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'filling' | 'leaving'>('idle');
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  const handleScroll = (deltaY: number) => {
    if (isAnimating) return;
    
    if (deltaY > 50 && currentSection < 2) {
      triggerTransition(currentSection + 1, 'down');
    } else if (deltaY < -50 && currentSection > 0) {
      triggerTransition(currentSection - 1, 'up');
    }
  };

  const triggerTransition = (nextSection: number, direction: 'down' | 'up') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setScrollDirection(direction);
    setAnimationPhase('filling');

    // 1. Divider wächst und füllt den Bildschirm (schneller, z.B. 400ms)
    setTimeout(() => {
      // 2. Hintergrund ist komplett blau, wir wechseln die Sektion im Hintergrund
      setCurrentSection(nextSection);
      setAnimationPhase('leaving');

      // 3. Blaues Feld zieht sich wieder zurück (braucht nochmal 400ms)
      setTimeout(() => {
        setAnimationPhase('idle');
        setIsAnimating(false);
      }, 400);
    }, 400);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // Verhindert normales Scrollen
      handleScroll(e.deltaY);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [currentSection, isAnimating]);

  // Styling-Logik für den animierten Divider
  let overlayStyles: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    width: '100vw',
    backgroundColor: '#451eff',
    zIndex: 9999,
    transition: 'height 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
  };

  if (animationPhase === 'idle') {
    overlayStyles.height = '0vh';
    overlayStyles.bottom = scrollDirection === 'down' ? 0 : 'auto';
    overlayStyles.top = scrollDirection === 'up' ? 0 : 'auto';
  } else if (animationPhase === 'filling') {
    overlayStyles.height = '100vh';
    overlayStyles.bottom = 0; // Immer von unten füllen, da der Divider unten ist
    overlayStyles.top = 'auto';
  } else if (animationPhase === 'leaving') {
    overlayStyles.height = '0vh';
    overlayStyles.top = 0; // Nach oben wegziehen
    overlayStyles.bottom = 'auto';
  }

  return (
    <div style={styles.container}>
      
      {/* Container für die 3 Sektionen */}
      <div style={styles.sectionsWrapper}>
        <div style={{...styles.sectionContainer, opacity: currentSection === 0 ? 1 : 0, pointerEvents: currentSection === 0 ? 'auto' : 'none'}}>
          <Hero />
        </div>
        <div style={{...styles.sectionContainer, opacity: currentSection === 1 ? 1 : 0, pointerEvents: currentSection === 1 ? 'auto' : 'none'}}>
          <AboutMe />
        </div>
        {/* Die Projektsektion darf selbst scrollbar sein, falls sie sehr lang ist */}
        <div style={{...styles.sectionContainer, opacity: currentSection === 2 ? 1 : 0, pointerEvents: currentSection === 2 ? 'auto' : 'none'}}>
          <div 
            style={styles.scrollableContent} 
            onWheel={(e) => {
               // Wenn an der Spitze angekommen und nach oben gescrollt wird -> Gehe zurück zu About
               const target = e.currentTarget;
               if (target.scrollTop <= 0 && e.deltaY < -50) {
                 handleScroll(e.deltaY);
               } else {
                 e.stopPropagation(); // Normales Scrollen innerhalb der Projects Section erlauben
               }
            }}
          >
            <Projects />
            <Footer />
          </div>
        </div>
      </div>

      {/* Der sichtbare statische Divider am unteren Bildschirmrand */}
      {animationPhase === 'idle' && currentSection < 2 && (
        <div 
          style={styles.staticBottomDivider}
          onClick={() => triggerTransition(currentSection + 1, 'down')}
        />
      )}

      {/* Das animierte Overlay, das den gesamten Bildschirm füllt */}
      {(animationPhase !== 'idle') && (
        <div style={overlayStyles} />
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  sectionsWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
  },
  sectionContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4rem',
    transition: 'opacity 0.2s', // Sanfter Fade-Effekt der Inhalte
  },
  scrollableContent: {
    width: '100vw',
    height: '100vh',
    overflowY: 'auto' as const,
    position: 'absolute' as const,
    left: '-4rem', // Ausgleich des Paddings vom sectionContainer
    padding: '0 4rem'
  },
  staticBottomDivider: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    width: '100vw',
    height: '60px',
    backgroundColor: '#451eff',
    cursor: 'pointer',
    zIndex: 9998,
    transition: 'height 0.2s',
  }
};