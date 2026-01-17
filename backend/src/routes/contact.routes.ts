import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact
} from '../controllers/contact.controller';

const router = Router();

router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router;
