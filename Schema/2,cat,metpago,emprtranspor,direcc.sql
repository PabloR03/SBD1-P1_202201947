-- Insertar datos en la tabla Categorías
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Electrónica', 'Productos electrónicos como celulares y computadoras.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Ropa', 'Vestimenta para hombres, mujeres y niños.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Hogar', 'Artículos para el hogar y electrodomésticos.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Deportes', 'Equipos y accesorios deportivos.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Juguetes', 'Juguetes para niños de todas las edades.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Salud', 'Productos de cuidado personal y medicamentos.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Automotriz', 'Accesorios y repuestos para vehículos.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Alimentos', 'Productos comestibles y bebidas.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Libros', 'Libros de diferentes géneros y autores.');
INSERT INTO categorias (Nombre, Descripcion) VALUES ('Mascotas', 'Productos para el cuidado de mascotas.');

-- Insertar datos en la tabla Métodos de Pago
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Tarjeta de Crédito', 'Pago con tarjeta Visa, Mastercard y American Express.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Tarjeta de Débito', 'Pago con tarjetas de débito bancarias.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('PayPal', 'Pago en línea con cuenta PayPal.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Transferencia Bancaria', 'Pago mediante transferencia bancaria directa.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Efectivo', 'Pago en efectivo al recibir el producto.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Criptomonedas', 'Pago con Bitcoin, Ethereum y otras criptomonedas.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Pago Móvil', 'Pago con aplicaciones móviles de bancos locales.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Cheque', 'Pago con cheque bancario.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Puntos de Fidelidad', 'Pago con puntos acumulados en compras anteriores.');
INSERT INTO metodos_pago (Nombre, Descripcion) VALUES('Contra Entrega', 'Pago al momento de recibir el producto.');

-- Insertar datos en la tabla Empresas de Transporte
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('DHL', 'Teléfono: +123456789, Email: contacto@dhl.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('FedEx', 'Teléfono: +987654321, Email: contacto@fedex.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('UPS', 'Teléfono: +567891234, Email: contacto@ups.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('USPS', 'Teléfono: +345678901, Email: contacto@usps.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('Amazon Logistics', 'Teléfono: +112233445, Email: contacto@amazonlogistics.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('Correos Express', 'Teléfono: +998877665, Email: contacto@correosexpress.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('Seur', 'Teléfono: +667788990, Email: contacto@seur.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('MRW', 'Teléfono: +445566778, Email: contacto@mrw.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('Estafeta', 'Teléfono: +223344556, Email: contacto@estafeta.com');
INSERT INTO empresas_transporte (Nombre, Informacion_Contacto) VALUES('Redpack', 'Teléfono: +334455667, Email: contacto@redpack.com');

-- Insertar datos en la tabla Direcciones (se asignan aleatoriamente a usuarios existentes)
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(1, 'Calle 123, Ciudad A, País X', 'Envío');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(2, 'Avenida 456, Ciudad B, País X', 'Facturación');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(3, 'Carrera 789, Ciudad C, País X', 'Envío');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(4, 'Calle 321, Ciudad D, País X', 'Facturación');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(5, 'Avenida 654, Ciudad E, País X', 'Envío');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(6, 'Carrera 987, Ciudad F, País X', 'Facturación');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(7, 'Calle 159, Ciudad G, País X', 'Envío');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(8, 'Avenida 753, Ciudad H, País X', 'Facturación');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(9, 'Carrera 852, Ciudad I, País X', 'Envío');
INSERT INTO direcciones (Id_Usuario, Direccion, Tipo) VALUES(10, 'Calle 369, Ciudad J, País X', 'Facturación');

COMMIT;
