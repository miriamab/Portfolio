import fs from 'fs';
import path from 'path';

export interface IProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const projectsFilePath = path.join(__dirname, '../../data/projects.json');

// Hilfsfunktion zum Lesen von Projekten aus JSON
const readProjects = (): IProject[] => {
  try {
    if (!fs.existsSync(projectsFilePath)) {
      return [];
    }
    const data = fs.readFileSync(projectsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects file:', error);
    return [];
  }
};

// Alle Projekte abrufen
export const getAllProjects = (): IProject[] => {
  const projects = readProjects();
  return projects.sort((a, b) => a.order - b.order || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Ein Projekt nach ID abrufen
export const getProjectById = (id: string): IProject | undefined => {
  const projects = readProjects();
  return projects.find(p => p.id === id);
};
