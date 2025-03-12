-- Insertar datos en la tabla Imágenes (asociadas a productos)
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (1, 'https://imagenes.com/smartphone.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (2, 'https://imagenes.com/chaqueta.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (3, 'https://imagenes.com/aspiradora.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (4, 'https://imagenes.com/bicicleta.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (5, 'https://imagenes.com/lego.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (6, 'https://imagenes.com/vitaminas.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (7, 'https://imagenes.com/bateria.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (8, 'https://imagenes.com/cafe.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (9, 'https://imagenes.com/libro.jpg');
INSERT INTO imagenes (Id_Producto, Url_Imagen) VALUES (10, 'https://imagenes.com/collar.jpg');

-- Insertar datos en la tabla Orden_Compra (asociadas a usuarios)
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (1, 'Pendiente');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (2, 'Completada');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (3, 'Cancelada');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (4, 'Pendiente');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (5, 'En Proceso');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (6, 'Completada');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (7, 'Pendiente');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (8, 'Cancelada');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (9, 'En Proceso');
INSERT INTO orden_compra (Id_Usuario, Estado) VALUES (10, 'Completada');

-- Insertar datos en la tabla Detalle_Orden (asociadas a órdenes y productos)
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(1, 1, 1, 599.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(1, 3, 2, 199.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(2, 2, 1, 129.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(3, 5, 3, 89.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(4, 4, 1, 349.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(5, 6, 4, 19.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(6, 7, 1, 159.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(7, 8, 2, 24.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(8, 9, 1, 39.99);
INSERT INTO detalle_orden (Id_Orden, Id_Producto, Cantidad, Precio_Unitario) VALUES(9, 10, 5, 14.99);

COMMIT;
