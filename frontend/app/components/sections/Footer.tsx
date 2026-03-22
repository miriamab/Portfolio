import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <style>{`
        .bottom-nav-link {
          color: #451eff;
          text-decoration: none;
          font-weight: 400;
          font-size: clamp(1.2rem, 3.5vw, 2.5rem);
          letter-spacing: 0.02em;
          font-family: 'Gasoek One', sans-serif;
          line-height: 1;
          transition: opacity 0.2s ease;
          display: inline-block;
        }
        .bottom-nav-link.contact-link {
          font-size: clamp(1rem, 2.5vw, 1.8rem);
        }
        .bottom-nav-link:hover {
          opacity: 0.7;
        }
        
        .nav-links-inner {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem; //hier rand rechts und links
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
      <div style={styles.navLinksContainer}>
        <div className="nav-links-inner">
          <div className="nav-group">
            <Link href="/about" className="bottom-nav-link">About Me</Link>
            <Link href="/projects" className="bottom-nav-link">Projects</Link>
          </div>
          <div className="contact-group">
            <a href="mailto:miriam.abbas@hm.edu" className="bottom-nav-link contact-link">Email</a>
            <a href="https://github.com/miriamab" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">GitHub</a>
            <a href="https://www.linkedin.com/in/miriam-abbas-579104397/" target="_blank" rel="noopener noreferrer" className="bottom-nav-link contact-link">LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={styles.bottomBar} />
    </>
  );
}

const styles = {
  navLinksContainer: {
    position: 'fixed' as const,
    bottom: '57px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    zIndex: 999,
  },
  bottomBar: {
    position: 'fixed' as const,
    left: 0,
    right: 0,
    bottom: 0,
    height: '60px',
    backgroundColor: '#451eff',
    zIndex: 1000,
  },
};
