import { Request, Response } from 'express';
import Project from '../models/Project';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
    const projects = await Project.find({}).sort({ order: 1 });
    res.json(projects);
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response) => {
    const { title, description, category } = req.body;

    const project = new Project({
        title,
        description,
        category,
        image: '/images/sample.jpg',
        technologies: [],
        results: {},
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response) => {
    const {
        title,
        description,
        image,
        technologies,
        results,
        category,
        featured,
        order,
    } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = title || project.title;
        project.description = description || project.description;
        project.image = image || project.image;
        project.technologies = technologies || project.technologies;
        project.results = results || project.results;
        project.category = category || project.category;
        project.featured = featured !== undefined ? featured : project.featured;
        project.order = order !== undefined ? order : project.order;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};
