const db = require('../config/database');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
    try {
        const { 
        Rol, 
        Identificacion_Nacional, 
        Nombre, 
        Apellido, 
        Correo, 
        Contrasena, 
        Telefono 
        } = req.body;
        
        // Validar campos requeridos
        if (!Rol || !Identificacion_Nacional || !Nombre || !Apellido || !Correo || !Contrasena || !Telefono) {
        return res.status(400).json({
            status: "error",
            message: "Datos incompletos"
        });
        }
        
        // Verificar que el rol sea válido
        if (Rol !== 'Cliente' && Rol !== 'Trabajador') {
        return res.status(400).json({
            status: "error",
            message: "Rol inválido. Debe ser 'Cliente' o 'Trabajador'"
        });
        }
        
        // Verificar si el usuario ya existe (por correo o identificación)
        const checkUserQuery = `
        SELECT * FROM usuarios 
        WHERE Correo = :correo OR Identificacion_Nacional = :identificacion
        `;
        
        const checkResult = await db.executeQuery(checkUserQuery, {
        correo: Correo,
        identificacion: Identificacion_Nacional
        });
        
        if (checkResult.rows.length > 0) {
        const existingUser = checkResult.rows[0];
        let conflictField = '';
        
        if (existingUser.CORREO === Correo) {
            conflictField = 'Correo';
        } else {
            conflictField = 'Identificacion_Nacional';
        }
        
        return res.status(409).json({
            status: "error",
            message: `El ${conflictField} ya existe`
        });
        }
        
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Contrasena, salt);
        
        // Insertar el nuevo usuario
        const insertQuery = `
        INSERT INTO usuarios (
            Rol, 
            Identificacion_Nacional, 
            Nombre, 
            Apellido, 
            Correo, 
            Contrasena, 
            Telefono
        ) VALUES (
            :rol, 
            :identificacion, 
            :nombre, 
            :apellido, 
            :correo, 
            :contrasena, 
            :telefono
        ) RETURNING Id_Usuario INTO :id
        `;
        
        const oracledb = require('oracledb');
        
        const bindParams = {
        rol: Rol,
        identificacion: Identificacion_Nacional,
        nombre: Nombre,
        apellido: Apellido,
        correo: Correo,
        contrasena: hashedPassword,
        telefono: Telefono,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        };
        
        const result = await db.executeQuery(insertQuery, bindParams, { autoCommit: true });
        
        res.status(201).json({
        status: "success",
        message: "User created successfully",
        userId: result.outBinds.id[0]
        });
        
    } catch (error) {
        console.error('Error al crear usuario:', error);
        next(error);
    }
};
