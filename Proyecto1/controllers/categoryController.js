const db = require('../config/database'); // Asegúrate de que la conexión a la base de datos esté correctamente configurada
const oracledb = require('oracledb');

exports.createCategory = async (req, res, next) => {
    try {
        const { Nombre, Descripcion } = req.body;
        
        // Validar campos requeridos
        if (!Nombre) {
            return res.status(400).json({
                status: "error",
                message: "El campo 'Nombre' es obligatorio"
            });
        }
        
        // Verificar si la categoría ya existe (por nombre)
        const checkCategoryQuery = `
            SELECT * FROM categorias 
            WHERE Nombre = :nombre
        `;
        
        const checkResult = await db.executeQuery(checkCategoryQuery, {
            nombre: Nombre
        });
        
        if (checkResult.rows.length > 0) {
            return res.status(409).json({
                status: "error",
                message: "La categoría ya existe"
            });
        }
        
        // Insertar la nueva categoría
        const insertQuery = `
            INSERT INTO categorias (
                Nombre, 
                Descripcion
            ) VALUES (
                :nombre, 
                :descripcion
            ) RETURNING Id_Categoria INTO :id
        `;
        
        const bindParams = {
            nombre: Nombre,
            descripcion: Descripcion || null,  // Si no se pasa una descripción, se guarda como null
            id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }  // Parámetro de salida para el Id de la categoría
        };
        
        const result = await db.executeQuery(insertQuery, bindParams, { autoCommit: true });

        // Retornar la respuesta exitosa con el ID de la categoría creada
        res.status(201).json({
            status: "success",
            message: "Categoría creada exitosamente",
            categoryId: result.outBinds.id[0]
        });
        
    } catch (error) {
        console.error('Error al crear categoría:', error);
        next(error);
    }
};
