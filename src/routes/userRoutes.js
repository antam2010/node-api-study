// src/routes/userRoutes.js
const express = require('express');
const { getUser, createUser, updateUser, deleteUser, restoreUser } = require('../controllers/userController');
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

/**
 * @route PUT /api/users
 * @desc UPDATE a user
 * @access protected
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @route DELETE /api/users
 * @desc DELETE UPDATE a user
 * @access protected
 */
router.delete("/:id", authMiddleware, deleteUser);


/**
 * @route PUT /api/users
 * @desc Create a new user
 * @access protected
 */
router.patch("/:id/restore", authMiddleware, restoreUser);

module.exports = router;
