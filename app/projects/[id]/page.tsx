import { notFound } from "next/navigation";
import Link from "next/link";
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

  return (
    <div style={{ backgroundColor: "#451eff", minHeight: "100vh", position: "relative", zIndex: 10, width: "100%", overflowX: "hidden" }}>
      
      {/* Top White Bar */}
      <div style={{ 
        backgroundColor: "#ffffff", 
        width: "100%", 
        padding: "3rem 2rem", 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "flex-start",
        boxSizing: "border-box"
      }}>
        
        {/* Left Side: Title, Desc, Timeframe */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "80%" }}>
          <h1 style={{
            color: "#451eff",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 500,
            textAlign: "left",
            margin: "0 0 0 -0.05em",
            lineHeight: 0.85,
            fontFamily: "'Gasoek One', sans-serif",
            letterSpacing: "0.05em",
          }}>
            {project.title}
          </h1>
          
          <div style={{ 
            fontFamily: "'Funnel Sans', sans-serif", 
            color: "#451eff", 
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "1.5rem"
          }}>
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.4 }}>{project.description}</p>
            <p style={{ margin: 0, fontSize: "1rem" }}>
              {project.startDate} {project.startDate && project.endDate && "—"} {project.endDate}
            </p>
          </div>
        </div>

        {/* Right Side: X Button */}
        <Link 
          href="/projects" 
          style={{
            color: "#451eff",
            fontSize: "2rem",
            textDecoration: "none",
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: "bold",
            padding: "0.5rem",
            lineHeight: 1
          }}
          aria-label="Back to projects"
        >
          ✕
        </Link>
      </div>

      {/* Images - Full width, no gap */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#451eff", margin: 0, padding: 0 }}>
        {project.images && project.images.length > 0 ? project.images.map((img, index) => (
          <img 
            key={index}
            src={img}
            alt={`${project.title} screenshot ${index + 1}`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: 0,
              padding: 0,
              objectFit: "contain",
              backgroundColor: "#451eff"
            }}
          />
        )) : (
          <div style={{ padding: "2rem", color: "white", textAlign: "center", backgroundColor: "#451eff" }}>No images available</div>
        )}
      </div>

      {/* Blue Background Info Section */}
      <div style={{
        backgroundColor: "#451eff",
        color: "#ffffff",
        fontFamily: "'Funnel Sans', sans-serif",
        padding: "4rem 2rem",
        boxSizing: "border-box",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        
        {/* Long Description */}
        {project.longDescription && (
          <div style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "3rem", textAlign: "justify" }}>
            <p style={{ margin: 0 }}>{project.longDescription}</p>
          </div>
        )}

        {/* Attributes & Technologies */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", marginBottom: "3rem" }}>
          
          {/* Attributes */}
          {project.attributes && project.attributes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Attributes</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.attributes.map((attr, i) => (
                  <span key={i} style={{ 
                    backgroundColor: "#ffffff", 
                    color: "#451eff",
                    padding: "0.2rem 0.6rem", 
                    fontSize: "0.95rem",
                    fontWeight: 600,
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
              <h3 style={{ margin: 0, textTransform: "uppercase", fontSize: "1rem", letterSpacing: "0.05em", fontWeight: 700, opacity: 0.9 }}>Technologies</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.technologies.map((tech, i) => (
                  <span key={i} style={{ 
                    backgroundColor: "#ffffff", 
                    color: "#451eff",
                    padding: "0.2rem 0.6rem", 
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  fontFamily: "'Gasoek One', sans-serif",
                  display: "inline-block",
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
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  fontFamily: "'Gasoek One', sans-serif",
                  display: "inline-block",
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
    </div>
  );
}
