import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = async (req: Request, res: Response) => {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    res.json(posts);
};

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
export const getBlogPostById = async (req: Request, res: Response) => {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
        post.views += 1;
        await post.save();
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/slug/:slug
// @access  Public
export const getBlogPostBySlug = async (req: Request, res: Response) => {
    const post = await BlogPost.findOne({ slug: req.params.slug });

    if (post) {
        post.views += 1;
        await post.save();
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createBlogPost = async (req: Request, res: Response) => {
    const { title, slug, content, excerpt, category, tags } = req.body;

    const post = new BlogPost({
        title,
        slug,
        content,
        excerpt,
        category,
        tags,
        author: 'Ashar Iftikhar',
        featuredImage: '/images/sample.jpg',
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlogPost = async (req: Request, res: Response) => {
    const {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        category,
        tags,
        published,
    } = req.body;

    const post = await BlogPost.findById(req.params.id);

    if (post) {
        post.title = title || post.title;
        post.slug = slug || post.slug;
        post.content = content || post.content;
        post.excerpt = excerpt || post.excerpt;
        post.featuredImage = featuredImage || post.featuredImage;
        post.category = category || post.category;
        post.tags = tags || post.tags;
        post.published = published !== undefined ? published : post.published;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlogPost = async (req: Request, res: Response) => {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};
