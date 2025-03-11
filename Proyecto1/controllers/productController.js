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

exports.getProducts = async (req, res) => {
    try {
        // Consulta para obtener todos los productos
        const query = `
            SELECT 
                Id_Producto AS ID, 
                Nombre AS NAME, 
                Precio AS PRICE, 
                Disponibilidad AS STOCK
            FROM productos
        `;
        
        // Ejecutar la consulta
        const result = await db.executeQuery(query);

        // Verificar si la consulta devuelve resultados
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        // Depurar los resultados
        console.log("Resultado de la consulta:", result.rows);

        // Mapear los productos para darles el formato adecuado
        const products = result.rows.map(row => ({
            id: row.ID,           // Usar las claves en mayúsculas como las devuelve Oracle
            name: row.NAME,
            price: row.PRICE,
            stock: row.STOCK
        }));

        // Responder con los productos en formato JSON
        res.json({
            status: 'success',
            products: products
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        // Obtener el ID del producto desde los parámetros de la ruta
        const productId = req.params.id;
        
        // Consulta para obtener un producto específico por su ID
        const query = `
            SELECT 
                p.Id_Producto AS ID, 
                p.Nombre AS NAME, 
                p.Descripcion AS DESCRIPTION,
                p.Precio AS PRICE, 
                p.Disponibilidad AS STOCK,
                c.Nombre AS CATEGORY
            FROM productos p
            JOIN categorias c ON p.Id_Categoria = c.Id_Categoria
            WHERE p.Id_Producto = :productId
        `;
        
        // Ejecutar la consulta con el parámetro
        const result = await db.executeQuery(query, { productId });

        // Verificar si la consulta devuelve resultados
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el producto' });
        }

        // Obtener la primera fila (debería ser la única)
        const row = result.rows[0];
        
        // Convertir el CLOB a string si existe
        let description = '';
        if (row.DESCRIPTION) {
            description = await row.DESCRIPTION.getData();
        }

        // Crear el objeto de respuesta con el formato deseado
        const product = {
            id: row.ID,
            name: row.NAME,
            description: description,  // Usar la cadena convertida
            price: row.PRICE,
            stock: row.STOCK,
            category: row.CATEGORY
        };

        // Depurar el resultado (sin el objeto CLOB completo)
        console.log("Detalle del producto (ID, Nombre, Precio):", {
            id: product.id,
            name: product.name,
            price: product.price
        });

        // Responder con el producto en formato JSON
        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el detalle del producto' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { 
            Sku, 
            Nombre, 
            Descripcion, 
            Precio, 
            Slug, 
            Id_Categoria, 
            Disponibilidad 
        } = req.body;

        // Verificar si hay datos para actualizar
        if (!Sku && !Nombre && Descripcion === undefined && 
            Precio === undefined && !Slug && 
            Id_Categoria === undefined && Disponibilidad === undefined) {
            return res.status(400).json({
                status: "error",
                message: "No se proporcionaron datos para actualizar"
            });
        }

        // Verificar si el producto existe
        const checkProductQuery = `SELECT Id_Producto FROM productos WHERE Id_Producto = :id`;
        const checkResult = await db.executeQuery(checkProductQuery, { id: productId });

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        // Construir consulta dinámica
        let updateQuery = `UPDATE productos SET `;
        let updateParams = { id: productId };
        let updates = [];

        if (Sku) {
            updates.push("Sku = :sku");
            updateParams.sku = Sku;
        }
        
        if (Nombre) {
            updates.push("Nombre = :nombre");
            updateParams.nombre = Nombre;
        }
        
        if (Descripcion !== undefined) {
            updates.push("Descripcion = :descripcion");
            updateParams.descripcion = Descripcion;
        }
        
        if (Precio !== undefined) {
            updates.push("Precio = :precio");
            updateParams.precio = Precio;
        }
        
        if (Slug) {
            updates.push("Slug = :slug");
            updateParams.slug = Slug;
        }
        
        if (Id_Categoria !== undefined) {
            updates.push("Id_Categoria = :categoria");
            updateParams.categoria = Id_Categoria;
        }
        
        if (Disponibilidad !== undefined) {
            updates.push("Disponibilidad = :disponibilidad");
            updateParams.disponibilidad = Disponibilidad;
        }

        // Actualizar el campo Updated_At con la fecha y hora actuales
        updates.push("Updated_At = CURRENT_TIMESTAMP");

        updateQuery += updates.join(", ") + " WHERE Id_Producto = :id";

        // Ejecutar la actualización
        await db.executeQuery(updateQuery, updateParams, { autoCommit: true });

        res.status(200).json({
            status: "success",
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        
        // Verificar si es un error de clave única
        if (error.message && error.message.includes('ORA-00001')) {
            if (error.message.includes('SKU')) {
                return res.status(400).json({
                    status: "error",
                    message: "El SKU ya existe para otro producto"
                });
            } else if (error.message.includes('SLUG')) {
                return res.status(400).json({
                    status: "error",
                    message: "El Slug ya existe para otro producto"
                });
            }
        }
        
        // Verificar si es un error de clave foránea
        if (error.message && error.message.includes('ORA-02291')) {
            return res.status(400).json({
                status: "error",
                message: "La categoría especificada no existe"
            });
        }
        
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Verificar si el producto existe
        const checkProductQuery = `SELECT Id_Producto FROM productos WHERE Id_Producto = :id`;
        const checkResult = await db.executeQuery(checkProductQuery, { id: productId });

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        // Realizar eliminación lógica (marcar como no disponible)
        const deleteQuery = `
            UPDATE productos 
            SET Disponibilidad = 0, 
                Updated_At = CURRENT_TIMESTAMP 
            WHERE Id_Producto = :id
        `;
        
        await db.executeQuery(deleteQuery, { id: productId }, { autoCommit: true });

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};