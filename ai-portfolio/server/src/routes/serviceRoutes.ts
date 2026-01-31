import express from 'express';
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getServices).post(protect, admin, createService);
router
    .route('/:id')
    .get(getServiceById)
    .put(protect, admin, updateService)
    .delete(protect, admin, deleteService);

export default router;
