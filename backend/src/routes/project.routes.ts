/**
 * Author: Miriam Abbas
 */
import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
} from '../controllers/project.controller';
import { upload } from '../middleware/upload';
import { authenticate } from '../middleware/auth';

const router = Router();

// Öffentliche Routen - Projekte anzeigen
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

// Geschützte Routen - nur für authentifizierte User
router.post('/', authenticate, upload.array('images', 10), createProject);
router.put('/:id', authenticate, upload.array('images', 10), updateProject);
router.delete('/:id', authenticate, deleteProject);

export default router;
