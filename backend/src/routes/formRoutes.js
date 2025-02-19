const express = require('express');
const { createForm, getFormsByNotification, getFormFields, submitFormResponse } = require('../controllers/formController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createForm);
router.get('/notification/:notificationId', authMiddleware, getFormsByNotification);
router.get('/:formId', authMiddleware, getFormFields);
router.post('/response', authMiddleware, submitFormResponse);

module.exports = router;
