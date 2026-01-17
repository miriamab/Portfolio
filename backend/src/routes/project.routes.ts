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

const router = Router();

router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);
router.post('/', upload.array('images', 10), createProject);
router.put('/:id', upload.array('images', 10), updateProject);
router.delete('/:id', deleteProject);

export default router;
