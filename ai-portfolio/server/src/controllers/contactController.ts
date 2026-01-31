import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    const contactMessage = new ContactMessage({
        name,
        email,
        message,
    });

    const createdMessage = await contactMessage.save();
    res.status(201).json(createdMessage);
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = async (req: Request, res: Response) => {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const markMessageAsRead = async (req: Request, res: Response) => {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
        message.read = true;
        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } else {
        res.status(404).json({ message: 'Message not found' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req: Request, res: Response) => {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } else {
        res.status(404).json({ message: 'Message not found' });
    }
};
