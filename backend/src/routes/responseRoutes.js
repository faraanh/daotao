const express = require('express');
const { body } = require('express-validator');
const {
    submitResponse,
    getResponsesByNotification,
    exportResponsesToExcel
} = require('../controllers/responseController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Submit response (User)
router.post(
    '/',
    authMiddleware,
    [
        body('notificationId').isInt().withMessage('Notification ID is required.'),
        body('no_data').isBoolean().optional()
    ],
    submitResponse
);

// Get responses by notification (Admin + authed only)
router.get('/:notificationId', authMiddleware, getResponsesByNotification);

// Export responses to Excel (Admin only)
router.get('/export/:notificationId', authMiddleware, adminMiddleware, exportResponsesToExcel);

module.exports = router;
