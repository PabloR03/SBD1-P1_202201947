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

exports.getUserProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT Id_Usuario, Nombre, Apellido, Correo, Telefono FROM usuarios WHERE Id_Usuario = :id';
        const result = await db.executeQuery(query, { id: userId });

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        res.json({
            id: user.ID_USUARIO,
            nombre: user.NOMBRE,
            apellido: user.APELLIDO,
            correo: user.CORREO,
            telefono: user.TELEFONO
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil de usuario' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { Telefono, Correo, Nombre, Apellido, Estado } = req.body;

        // Verificar si hay datos para actualizar
        if (!Telefono && !Correo && !Nombre && !Apellido && !Estado) {
            return res.status(400).json({
                status: "error",
                message: "No se proporcionaron datos para actualizar"
            });
        }

        // Verificar si el usuario existe
        const checkUserQuery = `SELECT Id_Usuario FROM usuarios WHERE Id_Usuario = :id`;
        const checkResult = await db.executeQuery(checkUserQuery, { id: userId });

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // Construir consulta dinámica
        let updateQuery = `UPDATE usuarios SET `;
        let updateParams = { id: userId };
        let updates = [];

        if (Telefono) {
            updates.push("Telefono = :telefono");
            updateParams.telefono = Telefono;
        }
        if (Correo) {
            updates.push("Correo = :correo");
            updateParams.correo = Correo;
        }
        if (Nombre) {
            updates.push("Nombre = :nombre");
            updateParams.nombre = Nombre;
        }
        if (Apellido) {
            updates.push("Apellido = :apellido");
            updateParams.apellido = Apellido;
        }
        if (Estado) {
            updates.push("Estado = :estado");
            updateParams.estado = Estado;
        }

        // Actualizar el campo Updated_At con la fecha y hora actuales
        updates.push("Updated_At = CURRENT_TIMESTAMP");

        updateQuery += updates.join(", ") + " WHERE Id_Usuario = :id";

        // Ejecutar la actualización
        await db.executeQuery(updateQuery, updateParams, { autoCommit: true });

        res.status(200).json({
            status: "success",
            message: "Usuario actualizado exitosamente"
        });

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar si el usuario existe
        const checkUserQuery = `SELECT Id_Usuario FROM usuarios WHERE Id_Usuario = :id`;
        const checkResult = await db.executeQuery(checkUserQuery, { id: userId });

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // Actualizar el estado del usuario a "Inactivo"
        const updateQuery = `UPDATE usuarios SET Estado = 'Inactivo' WHERE Id_Usuario = :id`;
        const updateParams = { id: userId };

        await db.executeQuery(updateQuery, updateParams, { autoCommit: true });

        res.status(200).json({
            status: "success",
            message: "Usuario inactivado exitosamente"
        });

    } catch (error) {
        console.error("Error al inactivar/eliminar usuario:", error);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};