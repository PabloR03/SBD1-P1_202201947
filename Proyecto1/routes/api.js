const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

router.post('/users', userController.createUser);
router.post('/login', authController.loginUser);
router.get('/profile', authMiddleware.verifyToken, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Perfil del usuario",
        user: req.user
    });
});
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
router.get('/users/:id', authMiddleware.verifyToken, userController.getUserProfile);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/categories', categoryController.createCategory);
router.post('/products', productController.createProduct);

module.exports = router;