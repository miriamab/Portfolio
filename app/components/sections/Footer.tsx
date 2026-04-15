"use client";
import { getAssetPath } from '../../utils/assetPath';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useLayoutEffect } from 'react';
import projectsData from '../../../data/projects.json';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [returningFrom, setReturningFrom] = useState<string | null>(null);
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBluePage = pathname === '/about';

  // useLayoutEffect runs synchronously before browser paint
  // This prevents any flash of content underneath before the blue overlay is rendered
  // We use a fallback to useEffect for SSR environments
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const returningAbout = sessionStorage.getItem('returningFromAbout') === 'true';
    const returningProjects = sessionStorage.getItem('returningFromProjects') === 'true';
    
    if (returningAbout || returningProjects) {
      const fromPath = returningAbout ? '/about' : '/projects';
      setReturningFrom(fromPath);
      setTimeout(() => {
        setReturningFrom(null);
        if (returningAbout) sessionStorage.removeItem('returningFromAbout');
        if (returningProjects) sessionStorage.removeItem('returningFromProjects');
      }, 600);
    }
  }, [pathname]);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string, fromMobileMenu = false) => {
    if ((href === '/about' || href === '/projects') && href !== pathname) {
      e.preventDefault();
      
      if (fromMobileMenu) {
        // Direkter Übergang ohne Slide-Up Overlay, da wir bereits im blauen Menü sind
        setClickedHref(href);
        // Wir schieben die Next-Routenumschaltung an
        router.push(href);
        // Erst danach (mit Verzögerung, damit die Seite geladen ist und blau bleibt) machen wir das Menü zu
        setTimeout(() => {
          setIsMobileMenuOpen(false);
          setClickedHref(null);
        }, 150);
      } else {
        // Normale Animation vom Hero Screen (Slidet nach oben)
        setIsMobileMenuOpen(false);
        setClickedHref(href);
        setIsAnimating(true);
        // Dispatch an event so Hero knows to slide up
        window.dispatchEvent(new Event('navigatingToAbout'));
        
        setTimeout(() => {
          router.push(href);
          // Reset after routing
          setTimeout(() => {
            setIsAnimating(false);
            setClickedHref(null);
          }, 100);
        }, 600); // 600ms corresponds to transition time
      }
    }
  };

  const navLinkColor = isBluePage ? '#ffffff' : '#451eff';
  const barColor = isBluePage ? '#ffffff' : '#451eff';

  return (
    <>
      <style>{`
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #451eff;
          z-index: 10000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(calc(100vh - 60px));
        }
        .page-transition-overlay.animating-up {
          opacity: 1;
          animation: slideUpOverlay 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        .page-transition-overlay.animating-down {
          opacity: 1;
          animation: slideDownOverlay 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        @keyframes slideUpOverlay {
          0% { transform: translateY(calc(100vh - 60px)); }
          100% { transform: translateY(0); }
        }

        @keyframes slideDownOverlay {
          0% { transform: translateY(0); opacity: 1; }
          99% { transform: translateY(calc(100vh - 60px)); opacity: 1; }
          100% { transform: translateY(calc(100vh - 60px)); opacity: 0; }
        }

        .bottom-nav-link.riding-up {
          animation: slideUpLink 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
          z-index: 100000;
          position: relative;
        }
        .bottom-nav-link.riding-down {
          animation: slideDownLink 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
          z-index: 100000;
          position: relative;
        }
        
        .footer-bottom-wrapper.animating-up .bottom-nav-link:not(.riding-up),
        .footer-bottom-wrapper.animating-up .bottom-bar,
        .footer-bottom-wrapper.animating-up .bottom-bar-base {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        @keyframes slideDownLink {
          0% { transform: translateY(calc(-100vh + 60px)); }
          100% { transform: translateY(0); }
        }
        
        @keyframes slideUpLink {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-100vh + 60px)); }
        }

        .bottom-nav-link {
          color: ${navLinkColor};
          text-decoration: none;
          font-weight: 400;
          font-size: clamp(1.2rem, 3.5vw, 2.5rem);
          letter-spacing: 0.02em;
          font-family: 'Gasoek One', sans-serif;
          line-height: 1;
          transition: transform 0.3s ease, color 0.3s ease;
          display: inline-block;
          position: relative;
          z-index: 2;
          padding: 0 0.5rem 60px 0.5rem; /* Extend padding bottom by 60px so moving onto the bar doesn't drop hover */
          margin-bottom: -60px; /* Offset the padding to keep visual layout identical */
          opacity: 1 !important; /* Force override completely */
          pointer-events: auto; /* Only the links trigger events */
        }
        .bottom-nav-link.contact-link {
          font-size: clamp(1rem, 2.5vw, 1.8rem);
        }
        
        .bottom-nav-link:hover {
          transform: translateY(-25px); /* Less link flight, let the bar do the heavy lifting */
          opacity: 1 !important; /* Force override completely */
        }

        .nav-links-inner:hover ~ .bottom-bar {
          transform: translateY(-89px);
          height: 78px; /* Grows higher to swallow the text base */
          background-color: ${barColor};
        }

        .bottom-bar {
          transition: transform 0.3s ease, height 0.3s ease, background-color 0.3s ease;
          position: relative; /* Need this to overlap correctly */
          z-index: 1;
        }

        .bottom-bar-base {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 60px;
          background-color: ${barColor};
          z-index: 999;
          pointer-events: none;
        }

        .nav-links-inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          pointer-events: none; /* Make container click-through */
          z-index: 10;
          position: relative;
          margin-bottom: -1px; /* Pull text deeply down over the bar edge */
        }

        .bottom-nav-link {
          pointer-events: auto; /* Only the links trigger events */
        }

        .bottom-nav-link:hover ~ .bottom-bar,
        .nav-group:hover ~ .bottom-bar,
        .contact-group:hover ~ .bottom-bar,
        .nav-links-inner:has(.bottom-nav-link:hover) ~ .bottom-bar {
          transform: translateY(-8px);
          height: 68px; /* Grows higher to swallow the text base */
          background-color: ${barColor};
        }

        .nav-group {
          display: flex;
          align-items: baseline;
          gap: clamp(1.5rem, 4vw, 5rem);
        }
        
        .contact-group {
          display: flex;
          align-items: baseline;
          gap: clamp(1rem, 3vw, 4rem);
        }
        
        .mobile-menu-btn {
          display: none;
        }
        
        @media (max-width: 768px) {
          .nav-links-inner {
            display: none; /* Versteckt durch Standard-Design auf Mobile um zum Hamburger Menü zu wechseln */
          }
          
          .mobile-menu-btn {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 30px;
            height: 25px;
            cursor: pointer;
            z-index: 10000;
            position: absolute;
            bottom: 80px; /* 20px über dem 60px Balken */
            left: 50%;
            transform: translateX(-50%);
            pointer-events: auto;
          }
          
          .mobile-menu-btn.animating-up,
          .mobile-menu-btn.animating-down {
            opacity: 0 !important;
            pointer-events: none !important;
          }
          
          .hamburger-line {
            width: 100%;
            height: 3px;
            background-color: ${isMobileMenuOpen ? (navLinkColor === '#ffffff' ? '#451eff' : '#ffffff') : navLinkColor};
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          /* Mobile Overlay Styling */
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: ${barColor};
            z-index: 9998; /* Under the button (z-index 10000) */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            opacity: 0;
            pointer-events: none;
            transform: translateY(100%);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.85, 0, 0.15, 1);
          }
          
          .mobile-menu-overlay.open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }
          
          .mobile-nav-link {
            color: ${navLinkColor === '#ffffff' ? '#451eff' : '#ffffff'}; /* Invertierte Farbe zum Balken */
            text-decoration: none;
            font-weight: 400;
            font-size: 2.5rem;
            letter-spacing: 0.02em;
            font-family: 'Gasoek One', sans-serif;
          }
          .mobile-contact-link {
            font-size: 1.8rem;
          }
          .mobile-contact-spacer {
            margin-top: 3rem;
          }
        }
      `}</style>

      {/* Transition overlay */}
      <div className={`page-transition-overlay ${isAnimating ? 'animating-up' : ''} ${returningFrom ? 'animating-down' : ''}`}>
        {(isAnimating || returningFrom) && (
          <div style={styles.fakePage}>
            <div style={styles.fakeBackButton}>BACK</div>
            {(clickedHref === '/about' || returningFrom === '/about') && (
              <>
                <style>{`
                  .fake-about-me-image-container {
                    position: absolute;
                    top: 4rem;
                    right: 8rem;
                    width: 16vw;
                    max-width: 280px;
                    min-width: 180px;
                    aspect-ratio: 3 / 4;
                    overflow: hidden;
                    border-radius: 40% 60% 65% 35% / 40% 45% 55% 60%;
                  }
                  .fake-about-me-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                  
                  .fake-about-me-content {
                    width: 80%;
                    margin-top: 21rem;
                    margin-left: 3rem;
                    margin-right: 1.3rem;
                  }
                  .fake-about-me-text {
                    text-align: left;
                    letter-spacing: -0.03rem;
                    font-family: 'Funnel Sans', sans-serif;
                    font-size: 2.5rem;
                    font-weight: 500;
                    line-height: 1.11;
                    color: #ffffff;
                    margin: 0;
                  }

                  @media (max-width: 1024px) {
                    .fake-about-me-content {
                      margin-top: 15rem;
                      width: 85%;
                    }
                    .fake-about-me-text {
                      font-size: 2rem;
                    }
                  }
                  
                  @media (max-width: 768px) {
                    .fake-about-me-wrapper {
                      display: flex !important;
                      flex-direction: column !important;
                      overflow-y: auto !important;
                      overflow-x: hidden !important;
                      height: 100vh;
                      width: 100vw;
                      position: absolute;
                      top: 0;
                      left: 0;
                    }
                    .fake-about-me-image-container {
                      position: relative !important;
                      top: auto !important;
                      right: auto !important;
                      align-self: flex-end !important;
                      margin-top: 5rem !important;
                      margin-right: -10vw !important;
                      width: 45vw !important;
                      min-width: 200px !important;
                    }
                    .fake-about-me-content {
                      margin-top: 4rem !important;
                      margin-left: 1.5rem !important;
                      margin-right: 1.5rem !important;
                      width: auto !important;
                      padding-bottom: 3rem !important;
                    }
                    .fake-about-me-text {
                      font-size: 1.4rem !important;
                    }
                  }
                `}</style>
                <div className="fake-about-me-wrapper">
                  <div className="fake-about-me-image-container">
                    <img src={getAssetPath("/profile.jpg")} alt="Miriam Abbas" className="fake-about-me-image" />
                  </div>
                  <div className="fake-about-me-content">
                    <p className="fake-about-me-text">
                      Hi there, my name is Miriam! <br /> <br />
                      I am an Informatics and Design student in Munich specializing in the intersection
                      of technical logic and user-centered design. Currently, I’m diving deep into Python,
                      JavaScript, and AI to create modern websites and AI-driven projects. Beyond coding,
                      I’m passionate about agile project organization, combining efficient workflows with
                      a human-centered approach to build digital solutions that really work for people.
                    </p>
                  </div>
                </div>
              </>
            )}
            {(clickedHref === '/projects' || returningFrom === '/projects') && (
              <div style={styles.fakeContentProjects}>
                <style>{`
                  .fake-project-preview-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    border-radius: 30px;
                    background-color: transparent;
                  }
                  .fake-project-preview-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    background-color: #ffffff;
                    z-index: 2;
                    padding: 0;
                    border-radius: 30px;
                  }
                  .fake-project-preview-title {
                    color: #451eff;
                    font-size: clamp(2rem, 5vw, 5rem);
                    font-weight: 500;
                    text-align: left;
                    margin: 0 0 0 -0.05em;
                    line-height: 0.85;
                    font-family: 'Gasoek One', sans-serif;
                    letter-spacing: 0.05em;
                  }
                  .fake-projects-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                  }
                  @media (max-width: 1024px) {
                    .fake-projects-grid {
                      grid-template-columns: repeat(2, 1fr);
                    }
                  }
                  @media (max-width: 600px) {
                    .fake-projects-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
                <div style={styles.fakeContentProjectsInner}>
                  <div className="fake-projects-grid">
                    {projectsData.map((project: any) => (
                      <div key={project.id} className="fake-project-preview-wrapper">
                        <div className="fake-project-preview-overlay">
                          <h3 className="fake-project-preview-title">{project.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`footer-bottom-wrapper ${isAnimating ? 'animating-up' : ''} ${returningFrom ? `animating-down returning-${returningFrom.substring(1)}` : ''}`}>
        <div style={styles.navLinksContainer}>
          <div className="nav-links-inner">
            <div className="nav-group">
              <Link 
                href="/about" 
                className={`bottom-nav-link ${(isAnimating && clickedHref === '/about') ? 'riding-up' : ''} ${returningFrom === '/about' ? 'riding-down' : ''}`} 
                onClick={(e) => handleTransition(e, "/about")}
              >ABOUT ME</Link>
              <Link 
                href="/projects" 
                className={`bottom-nav-link ${(isAnimating && clickedHref === '/projects') ? 'riding-up' : ''} ${returningFrom === '/projects' ? 'riding-down' : ''}`}
                onClick={(e) => handleTransition(e, "/projects")}
              >PROJECTS</Link>
            </div>
            <div className="contact-group">
              <a href="mailto:miriam.abbas@hm.edu" className="bottom-nav-link contact-link">Email</a>
              <a href="https://github.com/miriamab" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">GitHub</a>
              <a href="https://www.linkedin.com/in/miriam-abbas-579104397/" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">LinkedIn</a>
            </div>
          </div>
          <div className="bottom-bar" style={{...styles.bottomBar, backgroundColor: barColor}} />
        </div>
        
        {/* Hamburger Icon */}
        <div 
          className={`mobile-menu-btn ${isAnimating ? 'animating-up' : ''} ${returningFrom ? 'animating-down' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="hamburger-line" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div className="hamburger-line" style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></div>
          <div className="hamburger-line" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'none' }}></div>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link 
            href="/about" 
            className="mobile-nav-link" 
            onClick={(e) => handleTransition(e, "/about", true)}
          >ABOUT ME</Link>
          <Link 
            href="/projects" 
            className="mobile-nav-link"
            onClick={(e) => handleTransition(e, "/projects", true)}
          >PROJECTS</Link>
          <a href="mailto:miriam.abbas@hm.edu" className="mobile-nav-link mobile-contact-link mobile-contact-spacer" onClick={() => setIsMobileMenuOpen(false)}>Email</a>
          <a href="https://github.com/miriamab" target="_blank" rel="noopener noreferrer" className="mobile-nav-link mobile-contact-link" onClick={() => setIsMobileMenuOpen(false)}>GitHub</a>
          <a href="https://www.linkedin.com/in/miriam-abbas-579104397/" target="_blank" rel="noopener noreferrer" className="mobile-nav-link mobile-contact-link" onClick={() => setIsMobileMenuOpen(false)}>LinkedIn</a>
        </div>

        <div className="bottom-bar-base" />
      </div>
    </>
  );
}

const styles = {
  fakePage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    pointerEvents: 'none' as const,
    color: '#fff',
  },
  fakeBackButton: {
    position: "absolute" as const,
    top: "3rem",
    left: "3rem",
    padding: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: 400,
    fontFamily: "Gasoek One, sans-serif",
    letterSpacing: "0.05em",
    color: "#ffffff",
    zIndex: 20,
  },
  fakeContentProjects: {
    maxWidth: '100%',
    width: '100%',
    padding: '8rem 1rem 2rem 1rem',
    boxSizing: 'border-box' as const,
    display: 'flex',
    justifyContent: 'center',
  },
  fakeContentProjectsInner: {
    maxWidth: '100%',
    width: '100%',
  },
  navLinksContainer: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '97px', /* Tall enough to hold links + animated bar without capturing lowest 60px clicks everywhere */
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
    pointerEvents: 'none' as const, /* Let clicks pass through empty spaces */
    zIndex: 1000,
  },
  bottomBar: {
    width: '100%',
    height: '60px',
    backgroundColor: '#451eff',
    pointerEvents: 'none' as const, /* Bar is purely visual, ignores mouse entirely */
    marginTop: '-1px', /* Slightly pull the bar up to overlap the links and prevent gaps during animation */
  },
};
