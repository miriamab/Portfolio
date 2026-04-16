"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glitchContainerRef = useRef<HTMLDivElement | null>(null);
  const allLetterSpansRef = useRef<HTMLElement[]>([]);

  const [isLeavingUp, setIsLeavingUp] = useState(false);
  const [isEnteringDown, setIsEnteringDown] = useState(false);

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (sessionStorage.getItem('returningFromAbout') === 'true' || sessionStorage.getItem('returningFromProjects') === 'true') {
      setIsEnteringDown(true);
      setTimeout(() => setIsEnteringDown(false), 600);
      // Removed the synchronous sessionStorage.removeItem so Footer can also read it!
    }
  }, []);

  useEffect(() => {
    const handleNavigatingToAbout = () => {
      setIsLeavingUp(true);
    };
    window.addEventListener('navigatingToAbout', handleNavigatingToAbout);

    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    // Buchstaben in spans wrappen für einzelne Animation
    const letters1 = "MIRIAM".split("");
    const letters2 = "ABBAS".split("");
    
    line1.innerHTML = letters1.map((l, i) => 
      `<span style="opacity: 0; display: inline-block; transition: opacity 0.1s;" data-letter="1-${i}">${l}</span>`
    ).join("");
    
    line2.innerHTML = letters2.map((l, i) => 
      `<span style="opacity: 0; display: inline-block; transition: opacity 0.1s;" data-letter="2-${i}">${l}</span>`
    ).join("");

    // Glitch Layer erstellen - innerhalb der Section
    const glitchContainer = document.createElement("div");
    glitchContainer.style.position = "absolute";
    glitchContainer.style.top = "0";
    glitchContainer.style.left = "0";
    glitchContainer.style.width = "100%";
    glitchContainer.style.height = "100%";
    glitchContainer.style.pointerEvents = "none";
    glitchContainer.style.zIndex = "999";
    
    // Glitch-Container in die Section einfügen (nicht in body)
    if (sectionRef.current) {
      sectionRef.current.appendChild(glitchContainer);
    } else {
      document.body.appendChild(glitchContainer);
    }
    glitchContainerRef.current = glitchContainer;

    // Alle Buchstaben sammeln und in ref speichern
    const allLetterSpans = [
      ...Array.from(line1.querySelectorAll("span")),
      ...Array.from(line2.querySelectorAll("span"))
    ] as HTMLElement[];
    allLetterSpansRef.current = allLetterSpans;
    
    // Track welche Buchstaben "stabil" sichtbar sind
    const stableLetters = new Set<number>();

    // Initial Glitch-Animation
    const runInitialGlitch = () => {
      let glitchStep = 0;
      const totalSteps = 6;

      const glitchInterval = setInterval(() => {
        glitchContainer.innerHTML = "";
        
        if (glitchStep >= totalSteps) {
          clearInterval(glitchInterval);
          
          // Alle restlichen Buchstaben stabil machen
          allLetterSpans.forEach((span, idx) => {
            if (!stableLetters.has(idx)) {
              span.style.opacity = "1";
              stableLetters.add(idx);
            }
          });
          
          // Übergangs-Glitches mit Buchstaben-Flackern
          let transitionGlitches = 0;
          const transitionInterval = setInterval(() => {
            if (transitionGlitches >= 5) {
              clearInterval(transitionInterval);
              glitchContainer.innerHTML = "";
              return;
            }
            
            glitchContainer.innerHTML = "";
            const count = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < count; i++) {
              const glitchRect = document.createElement("div");
              const width = Math.random() * 35 + 8;
              const height = Math.random() * 15 + 4;
              const top = Math.random() * 100;
              const left = Math.random() * (100 - width);
              const isBlue = Math.random() > 0.5;
              const color = isBlue ? "rgba(69, 30, 255, 0.5)" : "rgba(200, 200, 200, 0.4)";

              glitchRect.style.position = "absolute";
              glitchRect.style.width = `${width}%`;
              glitchRect.style.height = `${height}%`;
              glitchRect.style.top = `${top}%`;
              glitchRect.style.left = `${left}%`;
              glitchRect.style.backgroundColor = color;
              glitchContainer.appendChild(glitchRect);
            }

            // Auch während Übergang: Buchstaben flackern
            if (Math.random() > 0.4) {
              const flickerCount = Math.floor(Math.random() * 2) + 1;
              for (let f = 0; f < flickerCount; f++) {
                const randomIdx = Math.floor(Math.random() * allLetterSpans.length);
                const span = allLetterSpans[randomIdx];
                span.style.opacity = "0";
                setTimeout(() => {
                  span.style.opacity = "1";
                }, Math.random() * 80 + 30);
              }
            }
            
            transitionGlitches++;
          }, 100);
          
          return;
        }

        // Glitch Rechtecke
        const glitchCount = Math.floor(Math.random() * 4) + 3;
        
        for (let i = 0; i < glitchCount; i++) {
          const glitchRect = document.createElement("div");
          const width = Math.random() * 50 + 10;
          const height = Math.random() * 25 + 5;
          const top = Math.random() * 100;
          const left = Math.random() * (100 - width);
          const isBlue = Math.random() > 0.4;
          const color = isBlue ? "#451eff" : "rgba(200, 200, 200, 0.7)";

          glitchRect.style.position = "absolute";
          glitchRect.style.width = `${width}%`;
          glitchRect.style.height = `${height}%`;
          glitchRect.style.top = `${top}%`;
          glitchRect.style.left = `${left}%`;
          glitchRect.style.backgroundColor = color;

          glitchContainer.appendChild(glitchRect);
        }

        // Ab Step 3: Buchstaben erscheinen mit Flackern
        if (glitchStep >= 3) {
          // Einige neue Buchstaben "stabil" machen
          const newStableCount = Math.floor(Math.random() * 2) + 1;
          const unstableIndices = allLetterSpans
            .map((_, idx) => idx)
            .filter(idx => !stableLetters.has(idx));
          
          for (let n = 0; n < newStableCount && unstableIndices.length > 0; n++) {
            const randomPick = Math.floor(Math.random() * unstableIndices.length);
            const idx = unstableIndices.splice(randomPick, 1)[0];
            stableLetters.add(idx);
            allLetterSpans[idx].style.opacity = "1";
          }

          // Alle sichtbaren Buchstaben zufällig flackern lassen
          allLetterSpans.forEach((span, idx) => {
            if (stableLetters.has(idx)) {
              // Zufälliges Flackern für bereits sichtbare Buchstaben
              if (Math.random() > 0.6) {
                span.style.opacity = "0";
                setTimeout(() => {
                  span.style.opacity = "1";
                }, Math.random() * 60 + 20);
              }
            } else {
              // Noch nicht stabile Buchstaben: manchmal kurz aufblitzen
              if (Math.random() > 0.7) {
                span.style.opacity = "1";
                setTimeout(() => {
                  if (!stableLetters.has(idx)) {
                    span.style.opacity = "0";
                  }
                }, Math.random() * 40 + 20);
              }
            }
          });
        }

        glitchStep++;
      }, 160);
    };

    // Check if glitch should run (only on first load / reload)
    // using window object to persist across client-side navigation but not actual reloads
    const globalWindow = window as any;
    if (!globalWindow.hasPlayedGlitch) {
      globalWindow.hasPlayedGlitch = true;
      setTimeout(runInitialGlitch, 300);
    } else {
      // Show letters immediately
      allLetterSpans.forEach(span => {
        span.style.opacity = "1";
      });
    }

    return () => {
      window.removeEventListener('navigatingToAbout', handleNavigatingToAbout);
      if (glitchContainerRef.current) {
        glitchContainerRef.current.remove();
        glitchContainerRef.current = null;
      }
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} style={styles.section}>
      <style>{`
        .hero-content-wrapper {
          width: 100%;
          padding: 2rem;
          transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .hero-content-wrapper.leaving-up {
          transform: translateY(-100dvh);
        }
        .hero-content-wrapper.entering-down {
          animation: dropDown 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        @keyframes dropDown {
          0% { transform: translateY(-100dvh); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <div className={`hero-content-wrapper ${isLeavingUp ? 'leaving-up' : ''} ${isEnteringDown ? 'entering-down' : ''}`}>
        <h1 style={styles.title}>
          <span ref={line1Ref}>MIRIAM</span>
          <br />
          <span ref={line2Ref}>ABBAS</span>
        </h1>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '25vh', /* Shifts content up visually to make room at the bottom */
    color: '#451eff',
    position: 'relative' as const,
    zIndex: 1,
    overflow: 'hidden' as const,
  },
  title: {
    fontSize: 'clamp(3rem, 18vw, 25rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontFamily: 'Gasoek One',
    lineHeight: 0.9,
    margin: 0,
    padding: '0',
    textAlign: 'center' as const,
    width: '100%',
    whiteSpace: 'nowrap' as const,
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: 400,
    opacity: 0.9,
  },
};
