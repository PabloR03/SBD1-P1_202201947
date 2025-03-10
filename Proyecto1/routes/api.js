const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Rutas públicas
router.post('/users', userController.createUser);
router.post('/login', authController.loginUser);

// Rutas protegidas (requieren autenticación)
// Ejemplo de ruta protegida que requiere rol específico
router.get('/profile', authMiddleware.verifyToken, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Perfil del usuario",
        user: req.user
    });
});

// Ejemplo de ruta que requiere rol específico (solo Trabajadores)
router.get('/admin', 
    authMiddleware.verifyToken, 
    authMiddleware.checkRole('Trabajador'), 
    (req, res) => {
        res.status(200).json({
        status: "success",
        message: "Área de administración",
        user: req.user
        });
    }
);

module.exports = router;