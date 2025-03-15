-- Controladores de Auntenticación
SELECT Id_Usuario, Rol, Nombre, Apellido, Correo, Contrasena, Estado 
FROM usuarios 
WHERE Correo = :correo;

UPDATE usuarios 
SET Updated_At = CURRENT_TIMESTAMP 
WHERE Id_Usuario = :userId;

-- Controladores de Categorias
SELECT * FROM categorias 
WHERE Nombre = :nombre;

INSERT INTO categorias (
    Nombre, 
    Descripcion
) VALUES (
    :nombre, 
    :descripcion
) RETURNING Id_Categoria INTO :id;

-- Controladores de Orden
SELECT * FROM usuarios WHERE Id_Usuario = :userId;

SELECT Id_Producto, Precio 
FROM productos;
--WHERE Id_Producto IN (${productIds.join(',')})

INSERT INTO orden_compra (
    Id_Usuario,
    Estado
) VALUES (
    :userId,
    :estado
) RETURNING Id_Orden INTO :orderId;

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
);

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
--[WHERE conditions]
GROUP BY oc.Id_Orden, oc.Id_Usuario, oc.Estado, oc.Fecha_Creacion
ORDER BY oc.Fecha_Creacion DESC;

SELECT 
    oc.Id_Orden as orderId,
    oc.Id_Usuario as userId,
    oc.Estado as status,
    oc.Fecha_Creacion as createdAt
FROM 
    orden_compra oc
WHERE 
    oc.Id_Orden = :orderId;

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
    do.Id_Orden = :orderId;

SELECT * FROM orden_compra WHERE Id_Orden = :orderId;

UPDATE orden_compra
SET Estado = :status
WHERE Id_Orden = :orderId;

-- Controladores de Pagos

SELECT oc.Id_Orden, oc.Id_Usuario, oc.Estado,
       SUM(do.Cantidad * do.Precio_Unitario) as total_amount
FROM orden_compra oc
JOIN detalle_orden do ON oc.Id_Orden = do.Id_Orden
WHERE oc.Id_Orden = :orderId
GROUP BY oc.Id_Orden, oc.Id_Usuario, oc.Estado;

SELECT mpu.Id_Metodo_Pago
FROM metodos_pago_usuario mpu
JOIN metodos_pago mp ON mpu.Id_Metodo_Pago = mp.Id_Metodo_Pago
WHERE mpu.Id_Usuario = :userId AND LOWER(mp.Nombre) = LOWER(:method);

SELECT Id_Metodo_Pago
FROM metodos_pago
WHERE LOWER(Nombre) = LOWER(:method);

INSERT INTO metodos_pago (
    Nombre,
    Descripcion
) VALUES (
    :method,
    :description
) RETURNING Id_Metodo_Pago INTO :methodId;

INSERT INTO metodos_pago_usuario (
    Id_Usuario,
    Id_Metodo_Pago,
    Detalles
) VALUES (
    :userId,
    :methodId,
    :details
);

INSERT INTO pagos (
    Id_Orden,
    Id_Metodo_Pago,
    Estado
) VALUES (
    :orderId,
    :methodId,
    :status
) RETURNING Id_Pago INTO :paymentId;

UPDATE orden_compra
SET Estado = 'processing'
WHERE Id_Orden = :orderId;

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
-- Add your WHERE conditions here if needed
GROUP BY p.Id_Pago, p.Id_Orden, mp.Nombre, p.Estado, p.Fecha_Transaccion
ORDER BY p.Fecha_Transaccion DESC;

-- Controladores de Productos
SELECT * FROM productos 
WHERE Sku = :sku;

SELECT * FROM categorias 
WHERE Id_Categoria = :id_categoria;

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
) RETURNING Id_Producto INTO :id;

SELECT 
    Id_Producto AS ID, 
    Nombre AS NAME, 
    Precio AS PRICE, 
    Disponibilidad AS STOCK
FROM productos;

SELECT 
    p.Id_Producto AS ID, 
    p.Nombre AS NAME, 
    p.Descripcion AS DESCRIPTION,
    p.Precio AS PRICE, 
    p.Disponibilidad AS STOCK,
    c.Nombre AS CATEGORY
FROM productos p
JOIN categorias c ON p.Id_Categoria = c.Id_Categoria
WHERE p.Id_Producto = :productId;

SELECT Id_Producto FROM productos WHERE Id_Producto = :id;

UPDATE productos SET 
    Nombre = :nombre,
    Descripcion = :descripcion,
    Precio = :precio,
    Disponibilidad = :disponibilidad,
    Updated_At = CURRENT_TIMESTAMP
WHERE Id_Producto = :id;

UPDATE productos 
SET Disponibilidad = 0, 
    Updated_At = CURRENT_TIMESTAMP 
WHERE Id_Producto = :id;

-- Controladores de Usuarios
SELECT * FROM usuarios 
WHERE Correo = :correo OR Identificacion_Nacional = :identificacion;

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
) RETURNING Id_Usuario INTO :id;

SELECT Id_Usuario, Nombre, Apellido, Correo, Telefono 
FROM usuarios 
WHERE Id_Usuario = :id;

SELECT Id_Usuario 
FROM usuarios 
WHERE Id_Usuario = :id;

UPDATE usuarios 
SET Telefono = :telefono, 
    Correo = :correo, 
    Nombre = :nombre, 
    Apellido = :apellido, 
    Estado = :estado,
    Updated_At = CURRENT_TIMESTAMP 
WHERE Id_Usuario = :id;

UPDATE usuarios 
SET Estado = 'Inactivo' 
WHERE Id_Usuario = :id;