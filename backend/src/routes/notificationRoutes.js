const express = require('express');
const { body } = require('express-validator');
const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
} = require('../controllers/notificationController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create notification (Admin only)
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    [
        body('title').notEmpty().withMessage('Title is required.'),
        body('content').notEmpty().withMessage('Content is required.'),
        body('deadline').isISO8601().withMessage('Valid deadline date is required.'),
        body('targetType').isIn(['all', 'group', 'user']).withMessage('Invalid target type.')
    ],
    createNotification
);

// Get all notifications
router.get('/', authMiddleware, getAllNotifications);

// Get notification by ID
router.get('/:id', authMiddleware, getNotificationById);

// Update notification (Admin only)
router.patch('/:id', authMiddleware, adminMiddleware, updateNotification);

// Delete notification (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteNotification);

module.exports = router;
