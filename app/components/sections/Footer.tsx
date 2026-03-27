"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const isBluePage = pathname === '/about';

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If not on the current page, and going to about page
    if (href === '/about' && href !== pathname) {
      e.preventDefault();
      setIsAnimating(true);
      setTimeout(() => {
        router.push(href);
        // Reset state slightly after routing to be safe
        setTimeout(() => setIsAnimating(false), 100);
      }, 600); // 600ms corresponds to transition time
    }
    // Could add reverse animation for other links, but let's stick to the requested one.
  };

  const navLinkColor = isBluePage ? '#ffffff' : '#451eff';
  const barColor = isBluePage ? '#ffffff' : '#451eff';

  return (
    <>
      <style>{`
        .page-transition-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background-color: #451eff;
          z-index: 99999;
          pointer-events: none;
          opacity: 0;
          transition: height 0.6s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .page-transition-overlay.animating {
          opacity: 1;
          height: 100vh;
          transition: height 0.6s cubic-bezier(0.85, 0, 0.15, 1), opacity 0s;
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

      {/* Full screen animation overlay */}
      <div className={`page-transition-overlay ${isAnimating ? 'animating' : ''}`} />

      <div className="footer-bottom-wrapper">
        <div style={styles.navLinksContainer}>
          <div className="nav-links-inner">
            <div className="nav-group">
              <Link href="/about" className="bottom-nav-link" onClick={(e) => handleTransition(e, "/about")}>ABOUT ME</Link>
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
