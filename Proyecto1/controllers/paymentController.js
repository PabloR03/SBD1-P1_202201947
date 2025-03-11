const db = require('../config/database');
const oracledb = require('oracledb');

exports.registerPayment = async (req, res, next) => {
    try {
        const { orderId, amount, method } = req.body;
        
        // Validar campos requeridos
        if (!orderId || !amount || !method) {
            return res.status(400).json({
                status: "error",
                message: "Datos incompletos: orderId, amount y method son requeridos"
            });
        }
        
        // Validar que la orden exista
        const checkOrderQuery = `
            SELECT oc.Id_Orden, oc.Id_Usuario, oc.Estado,
                   SUM(do.Cantidad * do.Precio_Unitario) as total_amount
            FROM orden_compra oc
            JOIN detalle_orden do ON oc.Id_Orden = do.Id_Orden
            WHERE oc.Id_Orden = :orderId
            GROUP BY oc.Id_Orden, oc.Id_Usuario, oc.Estado
        `;
        
        const orderResult = await db.executeQuery(checkOrderQuery, { orderId });
        
        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Orden no encontrada"
            });
        }
        
        // Verificar que la orden no esté cancelada
        if (orderResult.rows[0].ESTADO === 'cancelled') {
            return res.status(400).json({
                status: "error",
                message: "No se puede registrar pago para una orden cancelada"
            });
        }
        
        // Verificar que el monto sea correcto (opcional)
        const orderTotal = parseFloat(orderResult.rows[0].TOTAL_AMOUNT);
        if (Math.abs(orderTotal - amount) > 0.01) {  // Permitir una pequeña diferencia por redondeo
            return res.status(400).json({
                status: "error",
                message: `El monto del pago (${amount}) no coincide con el total de la orden (${orderTotal.toFixed(2)})`
            });
        }
        
        const userId = orderResult.rows[0].ID_USUARIO;
        
        // Verificar si ya existe este método de pago para el usuario
        const checkMethodQuery = `
            SELECT mpu.Id_Metodo_Pago
            FROM metodos_pago_usuario mpu
            JOIN metodos_pago mp ON mpu.Id_Metodo_Pago = mp.Id_Metodo_Pago
            WHERE mpu.Id_Usuario = :userId AND LOWER(mp.Nombre) = LOWER(:method)
        `;
        
        let methodId;
        const methodResult = await db.executeQuery(checkMethodQuery, { userId, method });
        
        if (methodResult.rows.length === 0) {
            // No existe este método para el usuario, necesitamos crearlo
            
            // Primero, verificar si existe el método en la tabla metodos_pago
            const checkPaymentMethodQuery = `
                SELECT Id_Metodo_Pago
                FROM metodos_pago
                WHERE LOWER(Nombre) = LOWER(:method)
            `;
            
            const paymentMethodResult = await db.executeQuery(checkPaymentMethodQuery, { method });
            
            if (paymentMethodResult.rows.length === 0) {
                // El método no existe, crearlo en la tabla metodos_pago
                const insertMethodQuery = `
                    INSERT INTO metodos_pago (
                        Nombre,
                        Descripcion
                    ) VALUES (
                        :method,
                        :description
                    ) RETURNING Id_Metodo_Pago INTO :methodId
                `;
                
                const methodBindParams = {
                    method: method,
                    description: `Método de pago ${method}`,
                    methodId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                };
                
                const newMethodResult = await db.executeQuery(insertMethodQuery, methodBindParams, { autoCommit: true });
                methodId = newMethodResult.outBinds.methodId[0];
            } else {
                methodId = paymentMethodResult.rows[0].ID_METODO_PAGO;
            }
            
            // Ahora asociar este método al usuario
            const insertUserMethodQuery = `
                INSERT INTO metodos_pago_usuario (
                    Id_Usuario,
                    Id_Metodo_Pago,
                    Detalles
                ) VALUES (
                    :userId,
                    :methodId,
                    :details
                )
            `;
            
            await db.executeQuery(insertUserMethodQuery, {
                userId: userId,
                methodId: methodId,
                details: JSON.stringify({ createdFromOrderPayment: true })
            }, { autoCommit: true });
        } else {
            methodId = methodResult.rows[0].ID_METODO_PAGO;
        }
        
        // Registrar el pago
        const insertPaymentQuery = `
            INSERT INTO pagos (
                Id_Orden,
                Id_Metodo_Pago,
                Estado
            ) VALUES (
                :orderId,
                :methodId,
                :status
            ) RETURNING Id_Pago INTO :paymentId
        `;
        
        const paymentBindParams = {
            orderId: orderId,
            methodId: methodId,
            status: 'approved',
            paymentId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        };
        
        // Insertar el pago y obtener su ID
        const paymentResult = await db.executeQuery(insertPaymentQuery, paymentBindParams, { autoCommit: true });
        const paymentId = paymentResult.outBinds.paymentId[0];
        
        // Actualizar el estado de la orden a 'processing' si no lo estaba ya
        if (orderResult.rows[0].ESTADO !== 'processing') {
            const updateOrderQuery = `
                UPDATE orden_compra
                SET Estado = 'processing'
                WHERE Id_Orden = :orderId
            `;
            
            await db.executeQuery(updateOrderQuery, { orderId }, { autoCommit: true });
        }
        
        // Devolver respuesta exitosa
        res.status(201).json({
            status: "success",
            message: "Payment registered successfully",
            paymentId: paymentId,
            paymentStatus: "approved",
            orderId: orderId,
            amount: parseFloat(amount).toFixed(2)
        });
        
    } catch (error) {
        console.error('Error al registrar pago:', error);
        next(error);
    }
};

exports.listPayments = async (req, res, next) => {
    try {
        // Extraer parámetros de filtrado de la consulta
        const { orderId, status, startDate, endDate, method } = req.query;
        
        // Construir la consulta base
        let query = `
            SELECT 
                p.Id_Pago as paymentId,
                p.Id_Orden as orderId,
                mp.Nombre as method,
                p.Estado as status,
                p.Fecha_Transaccion as createdAt,
                SUM(do.Cantidad * do.Precio_Unitario) as amount
            FROM 
                pagos p
            JOIN 
                metodos_pago mp ON p.Id_Metodo_Pago = mp.Id_Metodo_Pago
            JOIN 
                orden_compra oc ON p.Id_Orden = oc.Id_Orden
            JOIN 
                detalle_orden do ON oc.Id_Orden = do.Id_Orden
        `;
        
        // Inicializar arreglo para los parámetros de filtrado
        let whereConditions = [];
        let bindParams = {};
        
        // Agregar condiciones de filtrado según parámetros recibidos
        if (orderId) {
            whereConditions.push('p.Id_Orden = :orderId');
            bindParams.orderId = orderId;
        }
        
        if (status) {
            whereConditions.push('p.Estado = :status');
            bindParams.status = status;
        }
        
        if (startDate) {
            whereConditions.push('p.Fecha_Transaccion >= TO_TIMESTAMP(:startDate, \'YYYY-MM-DD\')');
            bindParams.startDate = startDate;
        }
        
        if (endDate) {
            whereConditions.push('p.Fecha_Transaccion <= TO_TIMESTAMP(:endDate, \'YYYY-MM-DD\')');
            bindParams.endDate = endDate;
        }
        
        if (method) {
            whereConditions.push('LOWER(mp.Nombre) = LOWER(:method)');
            bindParams.method = method;
        }
        
        // Agregar las condiciones WHERE a la consulta si existen
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        
        // Agregar GROUP BY para calcular el monto total
        query += ' GROUP BY p.Id_Pago, p.Id_Orden, mp.Nombre, p.Estado, p.Fecha_Transaccion';
        
        // Ordenar por fecha de transacción, más reciente primero
        query += ' ORDER BY p.Fecha_Transaccion DESC';
        
        // Ejecutar la consulta
        const result = await db.executeQuery(query, bindParams);
        
        // Formatear los resultados
        const payments = result.rows.map(row => {
            return {
                paymentId: row.PAYMENTID,
                orderId: row.ORDERID,
                amount: parseFloat(row.AMOUNT).toFixed(2),
                method: row.METHOD,
                status: row.STATUS,
                createdAt: new Date(row.CREATEDAT).toISOString()
            };
        });
        
        // Enviar respuesta
        res.status(200).json({
            payments: payments
        });
        
    } catch (error) {
        console.error('Error al listar pagos:', error);
        next(error);
    }
};