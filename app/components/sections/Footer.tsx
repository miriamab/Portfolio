"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useLayoutEffect } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  const isBluePage = pathname === '/about';

  // useLayoutEffect runs synchronously before browser paint
  // This prevents any flash of content underneath before the blue overlay is rendered
  // We use a fallback to useEffect for SSR environments
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const returning = sessionStorage.getItem('returningFromAbout') === 'true';
    if (returning) {
      setIsReturning(true);
      setTimeout(() => {
        setIsReturning(false);
        sessionStorage.removeItem('returningFromAbout');
      }, 600);
    }
  }, [pathname]);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/about' && href !== pathname) {
      e.preventDefault();
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

        .footer-bottom-wrapper.animating-up,
        .footer-bottom-wrapper.animating-down {
          z-index: 100000;
          position: relative;
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
        
        @media (max-width: 768px) {
          .nav-links-inner {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding-bottom: 10px;
            padding: 0 1rem;
          }
          .nav-group, .contact-group {
            justify-content: center;
            gap: 1.5rem;
          }
        }
      `}</style>

      {/* Transition overlay */}
      <div className={`page-transition-overlay ${isAnimating ? 'animating-up' : ''} ${isReturning ? 'animating-down' : ''}`}>
        {(isAnimating || isReturning) && (
          <div style={styles.fakeAboutMe}>
            <div style={styles.fakeBackButton}>BACK</div>
            <div style={styles.fakeContent}>
              <p style={styles.fakeText}>
                Hi there, my name is Miriam! <br /> <br />
                I am an Informatics and Design student in Munich specializing in the intersection
                of technical logic and user-centered design. Currently, I’m diving deep into Python,
                JavaScript, and AI to create modern websites and AI-driven projects. Beyond coding,
                I’m passionate about agile project organization, combining efficient workflows with
                a human-centered approach to build digital solutions that really work for people.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`footer-bottom-wrapper ${isAnimating ? 'animating-up' : ''} ${isReturning ? 'animating-down' : ''}`}>
        <div style={styles.navLinksContainer}>
          <div className="nav-links-inner">
            <div className="nav-group">
              <Link 
                href="/about" 
                className={`bottom-nav-link ${(isAnimating && clickedHref === '/about') ? 'riding-up' : ''} ${isReturning ? 'riding-down' : ''}`} 
                onClick={(e) => handleTransition(e, "/about")}
              >ABOUT ME</Link>
              <Link href="/projects" className="bottom-nav-link">PROJECTS</Link>
            </div>
            <div className="contact-group">
              <a href="mailto:miriam.abbas@hm.edu" className="bottom-nav-link contact-link">Email</a>
              <a href="https://github.com/miriamab" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">GitHub</a>
              <a href="https://www.linkedin.com/in/miriam-abbas-579104397/" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">LinkedIn</a>
            </div>
          </div>
          <div className="bottom-bar" style={{...styles.bottomBar, backgroundColor: barColor}} />
        </div>
        <div className="bottom-bar-base" />
      </div>
    </>
  );
}

const styles = {
  fakeAboutMe: {
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
  fakeContent: {
    width: "80%",
    marginTop: "21rem",
    marginLeft: "3rem",
    marginRight: "1.3rem",
  },
  fakeText: {
    textAlign: "left" as const,
    letterSpacing: "-0.03rem",
    fontFamily: "Funnel Sans, sans-serif",
    fontSize: "2.5rem",
    fontWeight: 500,
    lineHeight: 1.11,
    color: "#ffffff",
    margin: 0,
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
