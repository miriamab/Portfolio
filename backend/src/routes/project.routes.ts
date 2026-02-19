import { Router } from 'express';
import {
  getAllProjectsHandler,
  getProjectByIdHandler,
  getFeaturedProjectsHandler,
} from '../controllers/project.controller';

const router = Router();

// Öffentliche Routen - Projekte anzeigen
router.get('/', getAllProjectsHandler);
router.get('/featured', getFeaturedProjectsHandler);
router.get('/:id', getProjectByIdHandler);

export default router;
