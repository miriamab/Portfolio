/**
 * Author: Miriam Abbas
 */

import { Router } from 'express';
import { signup, signin, verifyToken } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Öffentliche Routen
router.post('/signup', signup);
router.post('/signin', signin);

// Geschützte Route - Token verifizieren
router.get('/verify', authenticate, verifyToken);

export default router;
