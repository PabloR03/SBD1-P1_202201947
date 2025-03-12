-- Insertar datos en la tabla Pagos (asociadas a órdenes y métodos de pago)
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (1, 1, 'Aprobado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (2, 2, 'Pendiente');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (3, 3, 'Rechazado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (4, 1, 'Aprobado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (5, 2, 'Pendiente');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (6, 3, 'Aprobado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (7, 1, 'Rechazado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (8, 2, 'Aprobado');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (9, 3, 'Pendiente');
INSERT INTO pagos (Id_Orden, Id_Metodo_Pago, Estado) VALUES (10, 1, 'Aprobado');

-- Insertar datos en la tabla Envios (asociadas a órdenes, direcciones y empresas de transporte)
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (1, 1, 1, 'TRK123456', 'En tránsito');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (2, 2, 2, 'TRK123457', 'Entregado');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (3, 3, 3, 'TRK123458', 'Pendiente');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (4, 4, 1, 'TRK123459', 'En tránsito');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (5, 5, 2, 'TRK123460', 'Entregado');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (6, 6, 3, 'TRK123461', 'Pendiente');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (7, 7, 1, 'TRK123462', 'En tránsito');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (8, 8, 2, 'TRK123463', 'Entregado');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (9, 9, 3, 'TRK123464', 'Pendiente');
INSERT INTO envios (Id_Orden, Id_Direccion, Id_Empresa_Transporte, Numero_Seguimiento, Estado) VALUES (10, 10, 1, 'TRK123465', 'En tránsito');

-- Insertar datos en la tabla Devoluciones (asociadas a órdenes)
INSERT INTO devoluciones (Id_Orden, Motivo, Estado) VALUES(2, 'Producto defectuoso', 'Procesando');
INSERT INTO devoluciones (Id_Orden, Motivo, Estado) VALUES(4, 'Recibí un artículo incorrecto', 'Aprobado');
INSERT INTO devoluciones (Id_Orden, Motivo, Estado) VALUES(6, 'No era lo esperado', 'Rechazado');
INSERT INTO devoluciones (Id_Orden, Motivo, Estado) VALUES(8, 'El producto llegó roto', 'Aprobado');
INSERT INTO devoluciones (Id_Orden, Motivo, Estado) VALUES(10, 'Cambio de decisión', 'Procesando');

-- Insertar datos en la tabla Traslado_Productos (asociadas a sedes y empresas de transporte)
INSERT INTO traslado_productos (Id_Sede_Origen, Id_Sede_Destino, Estado, Fecha_Estimada_Llegada, Id_Empresa_Transporte) VALUES(1, 2, 'En tránsito', CURRENT_TIMESTAMP + INTERVAL '3' DAY, 1);
INSERT INTO traslado_productos (Id_Sede_Origen, Id_Sede_Destino, Estado, Fecha_Estimada_Llegada, Id_Empresa_Transporte) VALUES(2, 3, 'Pendiente', CURRENT_TIMESTAMP + INTERVAL '5' DAY, 2);
INSERT INTO traslado_productos (Id_Sede_Origen, Id_Sede_Destino, Estado, Fecha_Estimada_Llegada, Id_Empresa_Transporte) VALUES(3, 1, 'Completado', CURRENT_TIMESTAMP + INTERVAL '2' DAY, 3);
INSERT INTO traslado_productos (Id_Sede_Origen, Id_Sede_Destino, Estado, Fecha_Estimada_Llegada, Id_Empresa_Transporte) VALUES(1, 3, 'En tránsito', CURRENT_TIMESTAMP + INTERVAL '4' DAY, 1);
INSERT INTO traslado_productos (Id_Sede_Origen, Id_Sede_Destino, Estado, Fecha_Estimada_Llegada, Id_Empresa_Transporte) VALUES(2, 1, 'Pendiente', CURRENT_TIMESTAMP + INTERVAL '6' DAY, 2);

-- Insertar datos en la tabla Detalle_Traslado_Productos (asociadas a traslados y productos)
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(1, 1, 10, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(1, 3, 5, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(2, 2, 8, 'Regular');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(2, 4, 6, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(3, 5, 12, 'Defectuoso');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(3, 6, 3, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(4, 7, 15, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(4, 8, 7, 'Bueno');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(5, 9, 4, 'Regular');
INSERT INTO detalle_traslado_productos (Id_Traslado, Id_Producto, Cantidad_Transferida, Estado_Producto) VALUES(5, 10, 2, 'Bueno');

COMMIT;
