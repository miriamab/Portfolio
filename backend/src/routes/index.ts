/**
 * Author: Miriam Abbas
 */

import { Router } from 'express';
import contactRoutes from './contact.routes';
import projectRoutes from './project.routes';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);

export default router;
