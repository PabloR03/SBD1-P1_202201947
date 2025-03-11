const db = require('../config/database'); // Asegúrate de que la conexión a la base de datos esté correctamente configurada
const oracledb = require('oracledb');
exports.createOrder = async (req, res, next) => {
    try {
        const { 
            userId, 
            items, 
            shippingAddress, 
            paymentMethod 
        } = req.body;
        
        // Validar campos requeridos
        if (!userId || !items || !Array.isArray(items) || items.length === 0 || !shippingAddress || !paymentMethod) {
            return res.status(400).json({
                status: "error",
                message: "Datos incompletos o formato incorrecto"
            });
        }
        
        // Verificar que todos los items tengan productId y quantity
        for (const item of items) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Formato de items incorrecto. Cada item debe tener productId y quantity válidos"
                });
            }
        }
        
        // Verificar que el usuario exista
        const checkUserQuery = `SELECT * FROM usuarios WHERE Id_Usuario = :userId`;
        const userResult = await db.executeQuery(checkUserQuery, { userId });
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        
        // Verificar que todos los productos existan y obtener sus precios
        let productIds = items.map(item => item.productId);
        
        const checkProductsQuery = `
            SELECT Id_Producto, Precio 
            FROM productos 
            WHERE Id_Producto IN (${productIds.join(',')})
        `;
        
        const productsResult = await db.executeQuery(checkProductsQuery);
        
        if (productsResult.rows.length !== productIds.length) {
            return res.status(404).json({
                status: "error",
                message: "Uno o más productos no existen"
            });
        }
        
        // Convertir resultados a un mapa para fácil acceso
        const productPrices = {};
        productsResult.rows.forEach(row => {
            productPrices[row.ID_PRODUCTO] = row.PRECIO;
        });
        
        // Calcular monto total
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += productPrices[item.productId] * item.quantity;
        });
        
        const oracledb = require('oracledb');
        
        // Crear la orden primero con autoCommit en true para asegurarnos que se guarde inmediatamente
        const insertOrderQuery = `
            INSERT INTO orden_compra (
                Id_Usuario,
                Estado
            ) VALUES (
                :userId,
                :estado
            ) RETURNING Id_Orden INTO :orderId
        `;
        
        const orderBindParams = {
            userId: userId,
            estado: 'processing',
            orderId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        };
        
        // Insertar la orden y obtener su ID
        const orderResult = await db.executeQuery(insertOrderQuery, orderBindParams, { autoCommit: true });
        const orderId = orderResult.outBinds.orderId[0];
        
        console.log("Orden creada con ID:", orderId);
        
        // Insertar los detalles de la orden uno por uno
        for (const item of items) {
            const insertDetailQuery = `
                INSERT INTO detalle_orden (
                    Id_Orden,
                    Id_Producto,
                    Cantidad,
                    Precio_Unitario
                ) VALUES (
                    :orderId,
                    :productId,
                    :quantity,
                    :price
                )
            `;
            
            await db.executeQuery(insertDetailQuery, {
                orderId: orderId,
                productId: item.productId,
                quantity: item.quantity,
                price: productPrices[item.productId]
            }, { autoCommit: true });
        }
        
        // Devolver respuesta exitosa
        res.status(201).json({
            status: "success",
            message: "Order created successfully",
            orderId: orderId,
            totalAmount: totalAmount.toFixed(2),
            orderStatus: "processing"
        });
        
    } catch (error) {
        console.error('Error al crear orden:', error);
        next(error);
    }
};

exports.listOrders = async (req, res, next) => {
    try {
        // Extraer parámetros de filtrado de la consulta
        const { status, startDate, endDate, userId } = req.query;
        
        // Construir la consulta base
        let query = `
            SELECT 
                oc.Id_Orden as orderId, 
                oc.Id_Usuario as userId, 
                oc.Estado as status, 
                oc.Fecha_Creacion as createdAt,
                SUM(do.Cantidad * do.Precio_Unitario) as totalAmount
            FROM 
                orden_compra oc
            JOIN 
                detalle_orden do ON oc.Id_Orden = do.Id_Orden
        `;
        
        // Inicializar arreglo para los parámetros de filtrado
        let whereConditions = [];
        let bindParams = {};
        
        // Agregar condiciones de filtrado según parámetros recibidos
        if (status) {
            whereConditions.push('oc.Estado = :status');
            bindParams.status = status;
        }
        
        if (startDate) {
            whereConditions.push('oc.Fecha_Creacion >= TO_TIMESTAMP(:startDate, \'YYYY-MM-DD\')');
            bindParams.startDate = startDate;
        }
        
        if (endDate) {
            whereConditions.push('oc.Fecha_Creacion <= TO_TIMESTAMP(:endDate, \'YYYY-MM-DD\')');
            bindParams.endDate = endDate;
        }
        
        if (userId) {
            whereConditions.push('oc.Id_Usuario = :userId');
            bindParams.userId = userId;
        }
        
        // Agregar las condiciones WHERE a la consulta si existen
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        
        // Agregar GROUP BY para totalAmount
        query += ' GROUP BY oc.Id_Orden, oc.Id_Usuario, oc.Estado, oc.Fecha_Creacion';
        
        // Ordenar por fecha de creación, más reciente primero
        query += ' ORDER BY oc.Fecha_Creacion DESC';
        
        // Ejecutar la consulta
        const result = await db.executeQuery(query, bindParams);
        
        // Formatear los resultados
        const orders = result.rows.map(row => {
            return {
                orderId: row.ORDERID,
                userId: row.USERID,
                totalAmount: parseFloat(row.TOTALAMOUNT).toFixed(2),
                status: row.STATUS,
                createdAt: new Date(row.CREATEDAT).toISOString().split('T')[0]
            };
        });
        
        // Enviar respuesta
        res.status(200).json({
            orders: orders
        });
        
    } catch (error) {
        console.error('Error al listar órdenes:', error);
        next(error);
    }
};

exports.getOrderDetails = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        
        // Validar que el ID sea un número
        if (!orderId || isNaN(orderId)) {
            return res.status(400).json({
                status: "error",
                message: "ID de orden inválido"
            });
        }
        
        // Obtener información básica de la orden
        const orderQuery = `
            SELECT 
                oc.Id_Orden as orderId,
                oc.Id_Usuario as userId,
                oc.Estado as status,
                oc.Fecha_Creacion as createdAt
            FROM 
                orden_compra oc
            WHERE 
                oc.Id_Orden = :orderId
        `;
        
        const orderResult = await db.executeQuery(orderQuery, { orderId });
        
        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Orden no encontrada"
            });
        }
        
        // Obtener los detalles de la orden (items)
        const itemsQuery = `
            SELECT 
                do.Id_Producto as productId,
                do.Cantidad as quantity,
                do.Precio_Unitario as price,
                p.Nombre as productName
            FROM 
                detalle_orden do
            JOIN
                productos p ON do.Id_Producto = p.Id_Producto
            WHERE 
                do.Id_Orden = :orderId
        `;
        
        const itemsResult = await db.executeQuery(itemsQuery, { orderId });
        
        // Calcular el monto total sumando todos los items
        let totalAmount = 0;
        const items = itemsResult.rows.map(row => {
            const quantity = row.QUANTITY;
            const price = row.PRICE;
            const subtotal = quantity * price;
            totalAmount += subtotal;
            
            return {
                productId: row.PRODUCTID,
                productName: row.PRODUCTNAME,
                quantity: quantity,
                price: parseFloat(price).toFixed(2),
                subtotal: parseFloat(subtotal).toFixed(2)
            };
        });
        
        // Preparar la respuesta
        const orderDetails = {
            orderId: orderResult.rows[0].ORDERID,
            userId: orderResult.rows[0].USERID,
            items: items,
            totalAmount: parseFloat(totalAmount).toFixed(2),
            status: orderResult.rows[0].STATUS,
            createdAt: new Date(orderResult.rows[0].CREATEDAT).toISOString().split('T')[0]
        };
        
        // Enviar respuesta
        res.status(200).json(orderDetails);
        
    } catch (error) {
        console.error('Error al obtener detalles de orden:', error);
        next(error);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        
        // Validar que el ID sea un número
        if (!orderId || isNaN(orderId)) {
            return res.status(400).json({
                status: "error",
                message: "ID de orden inválido"
            });
        }
        
        // Validar que se proporcionó un estado
        if (!status) {
            return res.status(400).json({
                status: "error",
                message: "El estado de la orden es requerido"
            });
        }
        
        // Validar que el estado sea uno de los permitidos
        const allowedStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                status: "error",
                message: "Estado de orden inválido. Los estados permitidos son: processing, shipped, delivered, cancelled"
            });
        }
        
        // Verificar que la orden exista
        const checkOrderQuery = `SELECT * FROM orden_compra WHERE Id_Orden = :orderId`;
        const orderResult = await db.executeQuery(checkOrderQuery, { orderId });
        
        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Orden no encontrada"
            });
        }
        
        // Actualizar el estado de la orden
        const updateQuery = `
            UPDATE orden_compra
            SET Estado = :status
            WHERE Id_Orden = :orderId
        `;
        
        await db.executeQuery(updateQuery, {
            status: status,
            orderId: orderId
        }, { autoCommit: true });
        
        // Devolver respuesta exitosa
        res.status(200).json({
            status: "success",
            message: "Order updated successfully",
            orderId: orderId,
            newStatus: status
        });
        
    } catch (error) {
        console.error('Error al actualizar estado de orden:', error);
        next(error);
    }
};