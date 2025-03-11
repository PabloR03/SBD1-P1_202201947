const db = require('../config/database'); // Asegúrate de que la conexión a la base de datos esté correctamente configurada
const oracledb = require('oracledb');

exports.createProduct = async (req, res, next) => {
    try {
        const { Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad } = req.body;
        
        // Validar campos requeridos
        if (!Sku || !Nombre || !Precio || !Slug || !Id_Categoria) {
            return res.status(400).json({
                status: "error",
                message: "Datos incompletos"
            });
        }

        // Verificar si el SKU ya existe
        const checkProductQuery = `
            SELECT * FROM productos 
            WHERE Sku = :sku
        `;
        
        const checkResult = await db.executeQuery(checkProductQuery, {
            sku: Sku
        });
        
        if (checkResult.rows.length > 0) {
            return res.status(409).json({
                status: "error",
                message: "El SKU ya existe"
            });
        }
        
        // Verificar si la categoría existe
        const checkCategoryQuery = `
            SELECT * FROM categorias 
            WHERE Id_Categoria = :id_categoria
        `;
        
        const categoryResult = await db.executeQuery(checkCategoryQuery, {
            id_categoria: Id_Categoria
        });
        
        if (categoryResult.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Categoría no encontrada"
            });
        }

        // Insertar el nuevo producto
        const insertQuery = `
            INSERT INTO productos (
                Sku, 
                Nombre, 
                Descripcion, 
                Precio, 
                Slug, 
                Id_Categoria, 
                Disponibilidad
            ) VALUES (
                :sku, 
                :nombre, 
                :descripcion, 
                :precio, 
                :slug, 
                :id_categoria, 
                :disponibilidad
            ) RETURNING Id_Producto INTO :id
        `;
        
        const bindParams = {
            sku: Sku,
            nombre: Nombre,
            descripcion: Descripcion || null,  // Si no se pasa descripción, se guarda como null
            precio: Precio,
            slug: Slug,
            id_categoria: Id_Categoria,
            disponibilidad: Disponibilidad !== undefined ? Disponibilidad : 1, // Si no se pasa, por defecto será 1
            id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }  // Parámetro de salida para el Id del producto
        };
        
        const result = await db.executeQuery(insertQuery, bindParams, { autoCommit: true });

        // Retornar la respuesta exitosa con el ID del producto creado
        res.status(201).json({
            status: "success",
            message: "Producto creado exitosamente",
            productId: result.outBinds.id[0]
        });
        
    } catch (error) {
        console.error('Error al crear producto:', error);
        next(error);
    }
};
