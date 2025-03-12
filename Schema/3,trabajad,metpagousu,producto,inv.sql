-- Insertar datos en la tabla Trabajadores (asignando usuarios trabajadores existentes)
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (3, 1, 1, 'carlos.lopez@empresa.com', 1, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (4, 2, 2, 'ana.martinez@empresa.com', 2, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (6, 3, 3, 'elena.rodriguez@empresa.com', 3, 'Inactivo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (8, 4, 4, 'sofia.ramirez@empresa.com', 4, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (10, 5, 5, 'paula.mendoza@empresa.com', 5, 'Inactivo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (3, 6, 6, 'carlos.otra@empresa.com', 6, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (4, 7, 7, 'ana.otra@empresa.com', 7, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (6, 8, 8, 'elena.otra@empresa.com', 8, 'Inactivo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (8, 9, 9, 'sofia.otra@empresa.com', 9, 'Activo');
INSERT INTO trabajadores (Id_Usuario, Id_Cargo, Id_Departamento, Correo_Institucional, Id_Sede, Estado) VALUES (10, 10, 10, 'paula.otra@empresa.com', 10, 'Inactivo');

-- Insertar datos en la tabla Métodos de Pago de Usuario (asignando métodos de pago a usuarios)
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (1, 1, 'Visa terminada en 1234');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (2, 2, 'Débito Mastercard terminada en 5678');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (3, 3, 'Cuenta PayPal vinculada a correo@example.com');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (4, 4, 'Transferencia bancaria a cuenta 000111222');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (5, 5, 'Pago en efectivo en tienda');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (6, 6, 'Pago con Bitcoin wallet 1A2B3C4D');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (7, 7, 'Pago móvil con App X');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (8, 8, 'Cheque No. 987654');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (9, 9, 'Canje de puntos de fidelidad');
INSERT INTO metodos_pago_usuario (Id_Usuario, Id_Metodo_Pago, Detalles) VALUES (10, 10, 'Pago contra entrega en domicilio');

-- Insertar datos en la tabla Productos (asignando categorías)
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('ELEC001', 'Smartphone XYZ', 'Teléfono inteligente con 128GB de almacenamiento.', 599.99, 'smartphone-xyz', 1, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('ROPA002', 'Chaqueta de Cuero', 'Chaqueta de cuero genuino para invierno.', 129.99, 'chaqueta-cuero', 2, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('HOG003', 'Aspiradora 3000', 'Aspiradora con tecnología ciclónica.', 199.99, 'aspiradora-3000', 3, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('DEP004', 'Bicicleta Montaña', 'Bicicleta con suspensión delantera y 21 velocidades.', 349.99, 'bicicleta-montana', 4, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('JUG005', 'Lego Star Set', 'Set de construcción LEGO Star Wars.', 89.99, 'lego-star-set', 5, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('SAL006', 'Vitaminas C+Zinc', 'Suplemento de vitamina C con zinc.', 19.99, 'vitaminas-c-zinc', 6, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('AUT007', 'Batería de Auto', 'Batería de 12V para automóvil.', 159.99, 'bateria-auto', 7, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('ALI008', 'Café Premium', 'Paquete de café premium de 1kg.', 24.99, 'cafe-premium', 8, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('LIB009', 'Libro de Ciencia', 'Libro sobre física moderna y teorías avanzadas.', 39.99, 'libro-ciencia', 9, 1);
INSERT INTO productos (Sku, Nombre, Descripcion, Precio, Slug, Id_Categoria, Disponibilidad) VALUES('MAS010', 'Collar para Perro', 'Collar ajustable con placa de identificación.', 14.99, 'collar-perro', 10, 1);

-- Insertar datos en la tabla Inventario (asignando productos a sedes)
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(1, 1, 50);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(2, 2, 30);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(3, 3, 20);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(4, 4, 25);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(5, 5, 40);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(6, 6, 60);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(7, 7, 15);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(8, 8, 80);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(9, 9, 10);
INSERT INTO inventario (Id_Producto, Id_Sede, Cantidad) VALUES(10, 10, 35);

COMMIT;
