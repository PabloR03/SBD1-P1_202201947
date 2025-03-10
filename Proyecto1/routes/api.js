const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear usuario
router.post('/users', userController.createUser);

module.exports = router;