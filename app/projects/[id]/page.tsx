import { notFound } from "next/navigation";
import Link from "next/link";
import projectsData from "../../../data/projects.json";
import ParallaxTitle from "./ParallaxTitle";
import ParallaxScrollBlock from "./ParallaxScrollBlock";
import { getAssetPath } from "../../utils/assetPath";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  attributes?: string[];
  role?: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  startDate?: string;
  endDate?: string;
  year?: string;
  [key: string]: any;
}

const renderMedia = (src: string, alt: string) => {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
  const resolvedSrc = getAssetPath(src);
  const mediaStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    margin: 0,
    padding: 0,
    objectFit: "cover" as const,
    borderRadius: "30px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
  };

  if (isVideo) {
    return (
      <video
        key={resolvedSrc}
        src={resolvedSrc}
        autoPlay
        loop
        muted
        playsInline
        style={mediaStyle}
      />
    );
  }
  return (
    <img 
      key={resolvedSrc}
      src={resolvedSrc}
      alt={alt}
      style={mediaStyle}
    />
  );
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = projectsData.find(
    (p) => p.id === resolvedParams.id
  ) as Project | undefined;

  if (!project) {
    return notFound();
  }

  const organicShapes = [
    "255px 15px 225px 15px/15px 225px 15px 255px",
    "15px 225px 15px 255px/255px 15px 225px 15px",
    "225px 15px 255px 15px/15px 255px 15px 225px",
    "15px 255px 15px 225px/225px 15px 255px 15px",
    "255px 25px 225px 25px/25px 225px 25px 255px"
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", position: "relative", zIndex: 10, width: "100%", overflowX: "hidden" }}>
      
      {/* Fixed X Button */}
      <Link 
        href="/projects" 
        style={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          width: "50px",
          height: "50px",
          backgroundColor: "#ffffff",
          color: "#451eff",
          fontSize: "1.5rem",
          textDecoration: "none",
          fontFamily: "'Funnel Sans', sans-serif",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          zIndex: 100,
          lineHeight: 1
        }}
        aria-label="Back to projects"
      >
        ✕
      </Link>

      {/* First Image at the top */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#ffffff", padding: "2rem 2rem 0 2rem", boxSizing: "border-box" }}>
        {project.images && project.images.length > 0 ? (
          renderMedia(project.images[0], `${project.title} cover`)
        ) : (
          <div style={{ padding: "2rem", color: "#451eff", textAlign: "center", backgroundColor: "#ffffff" }}>No image available</div>
        )}
      </div>

      <ParallaxTitle 
        title={project.title} 
        description={project.description} 
      />

      {/* Images 2 and 3 */}
      {project.images && project.images.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0 2rem", boxSizing: "border-box", gap: "2rem", backgroundColor: "#ffffff" }}>
          {project.images.slice(1, 3).map((src, index) => (
            <div key={src}>
              {renderMedia(src, `${project.title} media ${index + 2}`)}
            </div>
          ))}
        </div>
      )}

      {/* Text 2: Long Description + Details */}
      <ParallaxScrollBlock>
        <div style={{
          color: "#451eff",
          padding: "4rem 2rem",
          boxSizing: "border-box",
          maxWidth: "85%",
          margin: "0 auto",
          width: "100%"
        }}>
          
          {/* Long Description */}
          {project.longDescription && (
            <div style={{ 
              fontFamily: "'Funnel Sans', sans-serif",
              fontSize: "1.4rem", 
              lineHeight: 1.6,
              textAlign: "justify",
              letterSpacing: "-0.03em",
              fontWeight: 500,
              marginBottom: "4rem"
            }}>
              <p style={{ margin: 0 }}>{project.longDescription}</p>
            </div>
          )}

          {/* Attributes & Technologies & Role & Year */}
          <style>{`
            .project-metadata-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 2.5rem;
              margin-bottom: 4rem;
              font-family: 'Funnel Sans', sans-serif;
              letter-spacing: -0.03em;
              font-weight: 500;
            }
            @media (max-width: 768px) {
              .project-metadata-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
              }
              .project-metadata-grid > div {
                padding-right: 1rem;
              }
            }
          `}</style>
          <div className="project-metadata-grid">
          
            {/* Attributes */}
            {project.attributes && project.attributes.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Attributes</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  {project.attributes.map((attr, i) => (
                    <span key={i} style={{ 
                      backgroundColor: "#451eff", 
                      color: "#ffffff",
                      padding: "0.4rem 1.2rem", 
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      borderRadius: organicShapes[i % organicShapes.length]
                    }}>
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Technologies</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} style={{ 
                      backgroundColor: "#451eff", 
                      color: "#ffffff",
                      padding: "0.4rem 1.2rem", 
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      borderRadius: organicShapes[(i + 2) % organicShapes.length]
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Role */}
            {project.role && project.role.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Role</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  {project.role.map((r, i) => (
                    <span key={i} style={{ 
                      backgroundColor: "#451eff", 
                      color: "#ffffff",
                      padding: "0.4rem 1.2rem", 
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      borderRadius: organicShapes[(i + 4) % organicShapes.length]
                    }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Year - directly under Technologies */}
            {project.year && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Year</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  <span style={{ 
                    backgroundColor: "#451eff", 
                    color: "#ffffff",
                    padding: "0.4rem 1.2rem", 
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: organicShapes[3 % organicShapes.length]
                  }}>
                    {project.year}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Links */}
          {(() => {
            const urlKeys = Object.keys(project).filter(k => k.toLowerCase().endsWith('url') && typeof project[k] === 'string');
            
            if (urlKeys.length === 0) return null;

            return (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", marginTop: "1rem" }}>
                <style>{`
                  .project-action-link {
                    transition: transform 0.3s ease;
                    display: inline-block;
                  }
                  .project-action-link:hover {
                    transform: translateY(-8px);
                  }
                `}</style>
                {urlKeys.map((key) => {
                  let label = key.replace(/url$/i, '');
                  if (label.toLowerCase() === 'github') label = 'GitHub';
                  else if (label.toLowerCase() === 'live') label = 'Live Demo';
                  else if (label.toLowerCase() === 'website') label = 'Website';
                  else if (label.toLowerCase() === 'huggingface') label = 'HuggingFace';
                  else {
                    label = label.replace(/([A-Z])/g, ' $1').trim();
                    label = label.charAt(0).toUpperCase() + label.slice(1);
                  }
                  
                  return (
                    <a 
                      key={key}
                      href={project[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                      style={{
                        color: "#451eff",
                        textDecoration: "none",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                        fontFamily: "'Gasoek One', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase"
                      }}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            );
          })()}

        </div>
      </ParallaxScrollBlock>

      {/* Images 4 and 5 */}
      {project.images && project.images.length > 3 && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0 2rem 4rem 2rem", boxSizing: "border-box", gap: "2rem", marginTop: "2rem", backgroundColor: "#ffffff" }}>
          {project.images.slice(3, 5).map((src, index) => (
            <div key={src}>
              {renderMedia(src, `${project.title} media ${index + 4}`)}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
