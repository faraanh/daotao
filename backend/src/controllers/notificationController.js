const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        console.log('🔹 Request received:', req.body);

        const { title, content, deadline, targetType } = req.body;
        if (!title || !content || !deadline || !targetType) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const notification = await Notification.create({ title, content, deadline, targetType });
        console.log('✅ Notification created:', notification);

        res.status(201).json({ message: 'Notification created successfully.', notification });
    } catch (error) {
        console.error('❌ Error creating notification:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};



// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Update notification
exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        await notification.update(req.body);
        res.json({ message: 'Notification updated successfully.', notification });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        await notification.destroy();
        res.json({ message: 'Notification deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
