const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_temporal';

exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header recibido:", authHeader); // 🔍 Verifica qué llega en la cabecera

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("No se envió un token válido.");
            return res.status(401).json({
                status: "error",
                message: "No autorizado, token no proporcionado"
            });
        }

        const token = authHeader.split(' ')[1];
        console.log("Token extraído:", token); // 🔍 Verifica el token extraído

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token decodificado correctamente:", decoded); // 🔍 Muestra el contenido del token

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
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