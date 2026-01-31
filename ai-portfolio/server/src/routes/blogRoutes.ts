import express from 'express';
import {
    getBlogPosts,
    getBlogPostById,
    getBlogPostBySlug,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} from '../controllers/blogController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getBlogPosts).post(protect, admin, createBlogPost);
router.route('/slug/:slug').get(getBlogPostBySlug);
router
    .route('/:id')
    .get(getBlogPostById)
    .put(protect, admin, updateBlogPost)
    .delete(protect, admin, deleteBlogPost);

export default router;
