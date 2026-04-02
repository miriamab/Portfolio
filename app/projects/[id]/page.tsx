import { notFound } from "next/navigation";
import Link from "next/link";
import projectsData from "../../../data/projects.json";
import ParallaxTitle from "./ParallaxTitle";
import ParallaxScrollBlock from "./ParallaxScrollBlock";

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
}

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
          <img 
            src={project.images[0]}
            alt={`${project.title} cover`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: 0,
              padding: 0,
              objectFit: "cover",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
            }}
          />
        ) : (
          <div style={{ padding: "2rem", color: "#451eff", textAlign: "center", backgroundColor: "#ffffff" }}>No image available</div>
        )}
      </div>

      <ParallaxTitle 
        title={project.title} 
        description={project.description} 
      />

      {/* Remaining Images */}
      {project.images && project.images.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#ffffff", padding: "0 2rem", boxSizing: "border-box", gap: "2rem" }}>
          {project.images.slice(1).map((img, index) => (
            <img 
              key={index}
              src={img}
              alt={`${project.title} screenshot ${index + 2}`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: 0,
                padding: 0,
                objectFit: "cover",
                borderRadius: "30px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
              }}
            />
          ))}
        </div>
      )}

      {/* Text Section (White Background, Blue Text) */}
      <ParallaxScrollBlock>
        <div style={{
          backgroundColor: "#ffffff",
          color: "#451eff",
          padding: "4rem 2rem",
          boxSizing: "border-box",
          maxWidth: "85%",
          margin: "0 auto",
        }}>
          
          {/* Long Description */}
          {project.longDescription && (
            <div style={{ 
              fontFamily: "'Funnel Sans', sans-serif",
              fontSize: "1.4rem", 
              lineHeight: 1.6, 
              marginBottom: "4rem", 
              textAlign: "justify",
              letterSpacing: "-0.03em",
              fontWeight: 500
            }}>
              <p style={{ margin: 0 }}>{project.longDescription}</p>
            </div>
          )}

          {/* Attributes & Technologies & Role & Year */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem", 
            marginBottom: "4rem",
            fontFamily: "'Funnel Sans', sans-serif",
            letterSpacing: "-0.03em",
            fontWeight: 500
          }}>
          
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
          {(project.githubUrl || project.liveUrl) && (
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "1rem" }}>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  Live Demo
                </a>
              )}
            </div>
          )}

        </div>
      </ParallaxScrollBlock>

      {/* Videos Section Placeholder */}
      {/* 
      {project.videos && (
        <div style={{ padding: "0 2rem 4rem 2rem", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
           Videos rendern
        </div>
      )}
      */}

    </div>
  );
}
