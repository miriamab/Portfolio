"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import projectsData from "../../../data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  attributes?: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  startDate?: string;
  endDate?: string;
}

export default function Projects() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    sessionStorage.setItem('returningFromProjects', 'true');
    router.push("/", { scroll: false });
  };

  useEffect(() => {
    // Simulieren eines kurzen Ladevorgangs wie beim Fetch, damit Animation/UI flüssig bleiben
    const loadProjects = () => {
      try {
        // Projekte aus der lokalen JSON importieren
        setProjects(projectsData as Project[]);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Projekte konnten nicht geladen werden');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev < selectedProject.images.length - 1 ? prev + 1 : prev
      );
    }
  };

  const previousImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : prev
      );
    }
  };

  if (loading) {
    return (
      <section id="projects" style={styles.section}>
        <button onClick={handleBack} style={styles.backButton}>BACK</button>
        <div style={styles.content}>
          <p style={{color: '#fff'}}>Lädt Projekte...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" style={styles.section}>
        <button onClick={handleBack} style={styles.backButton}>BACK</button>
        <div style={styles.content}>
          <p style={{color: 'white'}}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" style={styles.section}>
      <button onClick={handleBack} style={styles.backButton}>BACK</button>
      <div style={styles.content}>
        <style>{`
          .project-preview-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            cursor: pointer;
            border-radius: 30px;
            background-color: transparent;
            transition: all 0.3s ease;
          }
          .project-preview-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            background-color: #ffffff;
            transition: opacity 0.3s ease;
            z-index: 2;
            padding: 0;
            border-radius: 30px;
          }
          .project-preview-wrapper:hover .project-preview-overlay {
            opacity: 0;
          }
          .project-preview-title {
            color: #451eff;
            font-size: 5rem;
            font-weight: 500;
            text-align: left;
            margin: 0 0 0 -0.05em;
            line-height: 0.85;
            font-family: 'Gasoek One', sans-serif;
            letter-spacing: 0.05em;
          }
          .project-preview-image-container {
            position: absolute;
            inset: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
            border-radius: 30px;
            box-sizing: border-box;
            background-color: #ffffff;
          }
          .project-preview-wrapper:hover .project-preview-image-container {
            opacity: 1;
          }
          .project-preview-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 30px;
          }
        `}</style>
        <div className="projects-grid" style={styles.projectsGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-preview-wrapper"
            >
              <div className="project-preview-overlay">
                <h3 className="project-preview-title">{project.title}</h3>
              </div>
              <div className="project-preview-image-container">
                {project.images && project.images.length > 0 ? (
                  <img 
                    src={project.images[0]}
                    alt={project.title}
                    className="project-preview-image"
                  />
                ) : (
                  <div style={{width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', borderRadius: '3px'}}>
                    Kein Bild
                  </div>
                )}
              </div>
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
            <h2 style={styles.modalTitle}>{selectedProject.title}</h2>
            {(selectedProject.startDate || selectedProject.endDate) && (
              <div style={styles.modalDateRange}>
                {selectedProject.startDate} {selectedProject.startDate && selectedProject.endDate && '—'} {selectedProject.endDate}
              </div>
            )}
            <div style={styles.carouselContainer}>
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <>
                  <button 
                    onClick={previousImage}
                    style={{
                      ...styles.carouselButton,
                      opacity: currentImageIndex === 0 ? 0.3 : 1,
                      cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                    disabled={currentImageIndex === 0}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <div style={styles.carouselImageWrapper}>
                    <img 
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                      style={styles.carouselImage}
                    />
                    <div style={styles.imageCounter}>
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>
                  <button 
                    onClick={nextImage}
                    style={{
                      ...styles.carouselButton,
                      opacity: currentImageIndex === selectedProject.images.length - 1 ? 0.3 : 1,
                      cursor: currentImageIndex === selectedProject.images.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                    disabled={currentImageIndex === selectedProject.images.length - 1}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              ) : (
                <div style={styles.modalImagePlaceholder}>Kein Bild verfügbar</div>
              )}
            </div>
            <p style={styles.modalDescription}>
              {selectedProject.longDescription || selectedProject.description}
            </p>
            {selectedProject.attributes && selectedProject.attributes.length > 0 && (
              <div style={styles.modalAttributesContainer}>
                <h3 style={styles.modalSubtitle}>Eigenschaften:</h3>
                <div style={styles.modalAttributesList}>
                  {selectedProject.attributes.map((attr, idx) => (
                    <span key={idx} style={styles.modalAttributeTag}>{attr}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={styles.modalAttributesContainer}>
              <h3 style={styles.modalSubtitle}>Technologien:</h3>
              <div style={styles.modalAttributesList}>
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} style={styles.modalAttribute}>{tech}</span>
                ))}
              </div>
            </div>
            {(selectedProject.githubUrl || selectedProject.liveUrl) && (
              <div style={styles.modalLinks}>
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.modalLink}
                  >
                    GitHub →
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.modalLink}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

const styles = {
  backButton: {
    position: 'absolute' as const,
    top: '3rem',
    left: '3rem',
    padding: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    fontFamily: 'Gasoek One, sans-serif',
    letterSpacing: '0.05em',
    color: '#ffffff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 100,
  },
  section: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#451eff',
    display: 'flex',
    justifyContent: 'center',
    padding: '8rem 1rem 2rem 1rem', // Minimaler Abstand zum Seitenrand
    color: '#ffffff',
    zIndex: 9999,
  },
  content: {
    maxWidth: '100%',
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  projectCard: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#451eff',
  },
  attributeTag: {
    fontSize: '0.75rem',
    backgroundColor: '#451eff',
    color: '#ffffff',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    fontWeight: 500,
  },
  techContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
    color: '#451eff',
  },
  dateRange: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.75rem',
    fontStyle: 'italic',
  },
  projectImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
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
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#451eff',
    padding: '3rem',
    maxWidth: '1800px',
    width: '95%',
    maxHeight: '90vh',
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
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    position: 'relative' as const,
  },
  carouselButton: {
    background: '#451eff',
    color: '#ffffff',
    border: 'none',
    fontSize: '3rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 300,
    transition: 'opacity 0.3s ease',
    flexShrink: 0,
  },
  carouselImageWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '70vh',
    objectFit: 'contain' as const,
    borderRadius: '8px',
  },
  imageCounter: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#451eff',
    fontWeight: 500,
  },
  modalImagesContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'contain' as const,
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  modalImagePlaceholder: {
    width: '100%',
    height: '300px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  modalAttributeTag: {
    fontSize: '0.85rem',
    backgroundColor: '#f0f0f0',
    color: '#451eff',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    fontWeight: 600,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#451eff',
  },
  modalDateRange: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1.5rem',
    fontStyle: 'italic',
  },
  modalLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  modalLink: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#451eff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    transition: 'opacity 0.3s ease',
  },
};
