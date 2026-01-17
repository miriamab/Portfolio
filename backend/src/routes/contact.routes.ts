/**
 * Author: Miriam Abbas
 */

import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact
} from '../controllers/contact.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Alle Contact-Routen erfordern Authentifizierung
router.post('/', authenticate, createContact);
router.get('/', authenticate, getAllContacts);
router.get('/:id', authenticate, getContactById);
router.delete('/:id', authenticate, deleteContact);

export default router;
