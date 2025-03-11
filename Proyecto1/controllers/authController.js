const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuración para el JWT
const JWT_SECRET = process.env.JWT_SECRET || 'andres';
const JWT_EXPIRES_IN = '24h';

// Login de usuario
    exports.loginUser = async (req, res, next) => {
    try {
        const { Correo, Contrasena } = req.body;
        
        // Validar campos requeridos
        if (!Correo || !Contrasena) {
        return res.status(400).json({
            status: "error",
            message: "Correo y contraseña son requeridos"
        });
        }
        
        // Buscar usuario por correo
        const findUserQuery = `
        SELECT Id_Usuario, Rol, Nombre, Apellido, Correo, Contrasena, Estado 
        FROM usuarios 
        WHERE Correo = :correo
        `;
        
        const result = await db.executeQuery(findUserQuery, [Correo]);
        
        // Verificar si el usuario existe
        if (result.rows.length === 0) {
        return res.status(401).json({
            status: "error",
            message: "Credenciales inválidas"
        });
        }
        
        const user = result.rows[0];
        
        // Verificar si la cuenta está activa
        if (user.ESTADO !== 'Activo') {
        return res.status(403).json({
            status: "error",
            message: "La cuenta está inactiva"
        });
        }
        
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(Contrasena, user.CONTRASENA);
        
        if (!isPasswordValid) {
        return res.status(401).json({
            status: "error",
            message: "Credenciales inválidas"
        });
        }
        
        // Generar token JWT
        const token = jwt.sign(
        { 
            userId: user.ID_USUARIO, 
            role: user.ROL 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
        );
        
        // Actualizar la última vez que el usuario inició sesión
        const updateLastLoginQuery = `
        UPDATE usuarios 
        SET Updated_At = CURRENT_TIMESTAMP 
        WHERE Id_Usuario = :userId
        `;
        
        await db.executeQuery(updateLastLoginQuery, [user.ID_USUARIO], { autoCommit: true });
        
        // Enviar respuesta exitosa con token
        res.status(200).json({
        status: "success",
        message: "Login exitoso",
        token,
        user: {
            id: user.ID_USUARIO,
            nombre: user.NOMBRE,
            apellido: user.APELLIDO,
            correo: user.CORREO,
            rol: user.ROL
        }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        next(error);
    }
    };
