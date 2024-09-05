// src/routes/userRoutes.js
const express = require('express');
const { getUser, createUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Protected
 */
router.get('/:id', authMiddleware, getUser);

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 */
router.post('/', createUser);

module.exports = router;
