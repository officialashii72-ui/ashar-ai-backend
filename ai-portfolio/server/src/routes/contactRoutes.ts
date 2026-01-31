import express from 'express';
import {
    submitContactMessage,
    getContactMessages,
    markMessageAsRead,
    deleteContactMessage,
} from '../controllers/contactController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(submitContactMessage).get(protect, admin, getContactMessages);
router.route('/:id/read').put(protect, admin, markMessageAsRead);
router.route('/:id').delete(protect, admin, deleteContactMessage);

export default router;
