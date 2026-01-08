"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const projects = [
    { title: "Project 1", attributes: ["Attribute 1", "Attribute 2", "Attribute 3"], image: "Image", subtitle: "Subtitle 1" },
    { title: "Project 2", attributes: ["Attribute 1", "Attribute 2", "Attribute 3"], image: "Image", subtitle: "Subtitle 2" },
    { title: "Project 3", attributes: ["Attribute 1", "Attribute 2", "Attribute 3"], image: "Image", subtitle: "Subtitle 3" },
    { title: "Project 4", attributes: ["Attribute 1", "Attribute 2", "Attribute 3"], image: "Image", subtitle: "Subtitle 3" },
  ];

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Projects</h2>
        <div style={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(index)}
              style={{...styles.projectCard, cursor: 'pointer'}}
            >
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <div style={styles.attributesContainer}>
                {project.attributes.map((attr, attrIndex) => (
                  <span key={attrIndex} style={styles.attribute}>{attr}</span>
                ))}
              </div>
              <div style={styles.projectImage}>{project.image}</div>
              <p style={styles.projectSubtitle}>{project.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject !== null && createPortal(
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              style={styles.closeButton}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 style={styles.modalTitle}>{projects[selectedProject].title}</h2>
            <div style={styles.modalImage}>{projects[selectedProject].image}</div>
            <p style={styles.modalDescription}>
              Detaillierte Beschreibung für {projects[selectedProject].title}. Dies ist ein Platzhalter für weitere Informationen über dieses Projekt.
            </p>
            <div style={styles.modalAttributesContainer}>
              <h3 style={styles.modalSubtitle}>Attribute:</h3>
              <div style={styles.modalAttributesList}>
                {projects[selectedProject].attributes.map((attr, idx) => (
                  <span key={idx} style={styles.modalAttribute}>{attr}</span>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

const styles = {
  section: {
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '10rem 2rem',
    color: '#451eff',
    position: 'relative' as const,
    zIndex: 1,
  },
  content: {
    maxWidth: '1400px',
    width: '100%',
  },
  title: {
    fontSize: 'clamp(2rem, 10vw, 3.5rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontFamily: 'Gasoek One',
    marginBottom: '1rem',
    textAlign: 'left' as const,
  },
  projectsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  projectCard: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '2px solid #451eff',
  },
  projectTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#451eff',
  },
  attributesContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
    color: '#451eff',
  },
  attribute: {
    fontSize: '0.8rem',
    backgroundColor: '#ffffff',
    color: '#451eff',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    fontWeight: 500,
    border: '1px solid #451eff',
  },
  projectImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#999',
    fontWeight: 500,
  },
  projectSubtitle: {
    fontSize: '0.95rem',
    color: '#451eff',
    opacity: 0.8,
    margin: 0,
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '2px solid #451eff',
    padding: '2rem',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto' as const,
    position: 'relative' as const,
    zIndex: 10000,
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#451eff',
    padding: 0,
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#451eff',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  modalImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    color: '#999',
    fontWeight: 500,
  },
  modalDescription: {
    fontSize: '1rem',
    color: '#451eff',
    lineHeight: 1.8,
    marginBottom: '1.5rem',
  },
  modalAttributesContainer: {
    marginTop: '1.5rem',
  },
  modalSubtitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#451eff',
    marginBottom: '0.75rem',
  },
  modalAttributesList: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap' as const,
  },
  modalAttribute: {
    fontSize: '0.9rem',
    backgroundColor: '#451eff',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: 500,
  },
};
