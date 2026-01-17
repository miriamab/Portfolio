/**
 * Author: Miriam Abbas
 */

import { Router } from 'express';
import authRoutes from './auth.routes';
import contactRoutes from './contact.routes';
import projectRoutes from './project.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);

export default router;
