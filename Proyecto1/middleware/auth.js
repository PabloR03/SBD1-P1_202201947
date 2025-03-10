const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_temporal';

    // Middleware para verificar el token JWT
    exports.verifyToken = (req, res, next) => {
    try {
        // Obtener el token del header Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "error",
            message: "No autorizado, token no proporcionado"
        });
        }
        
        const token = authHeader.split(' ')[1];
        
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Agregar la información del usuario al objeto request
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
        status: "error",
        message: "Token inválido o expirado"
        });
    }
    };

    // Middleware para verificar roles
    exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
        return res.status(401).json({
            status: "error",
            message: "No autorizado"
        });
        }
        
        if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            status: "error",
            message: "No tienes permiso para realizar esta acción"
        });
        }
        
        next();
    };
    };