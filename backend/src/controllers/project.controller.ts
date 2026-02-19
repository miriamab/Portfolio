import { Request, Response } from 'express';
import {
  getAllProjects,
  getProjectById,
  IProject
} from '../services/projectService';

// Get all projects
export const getAllProjectsHandler = (req: Request, res: Response): void => {
  try {
    const projects = getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get featured projects
export const getFeaturedProjectsHandler = (req: Request, res: Response): void => {
  try {
    const projects = getAllProjects().filter(p => p.featured);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
};

// Get single project by ID
export const getProjectByIdHandler = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const project = getProjectById(id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};


