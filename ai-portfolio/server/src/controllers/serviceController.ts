import { Request, Response } from 'express';
import Service from '../models/Service';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response) => {
    const services = await Service.find({}).sort({ order: 1 });
    res.json(services);
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req: Request, res: Response) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        res.json(service);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req: Request, res: Response) => {
    const { title, description, price, features, icon, order } = req.body;

    const service = new Service({
        title,
        description,
        price,
        features,
        icon,
        order,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req: Request, res: Response) => {
    const {
        title,
        description,
        price,
        features,
        icon,
        active,
        order,
    } = req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
        service.title = title || service.title;
        service.description = description || service.description;
        service.price = price || service.price;
        service.features = features || service.features;
        service.icon = icon || service.icon;
        service.active = active !== undefined ? active : service.active;
        service.order = order !== undefined ? order : service.order;

        const updatedService = await service.save();
        res.json(updatedService);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req: Request, res: Response) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        await service.deleteOne();
        res.json({ message: 'Service removed' });
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
};
