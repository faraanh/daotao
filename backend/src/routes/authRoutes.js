const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Invalid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    ],
    register
);

router.post('/login', login);

module.exports = router;

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5NDk5NjcxLCJleHAiOjE3NDAxMDQ0NzF9.lvVNg9uE2J6zwVNW37D2eNWfK-DD9ii7Fc0ki6rEN9w","user":{"id":2,"name":"Admin","email":"admin@example.com","role":"admin"}}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5NDk5NjcxLCJleHAiOjE3NDAxMDQ0NzF9.lvVNg9uE2J6zwVNW37D2eNWfK-DD9ii7Fc0ki6rEN9w