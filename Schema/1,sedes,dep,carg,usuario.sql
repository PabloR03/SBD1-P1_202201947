-- Insertar datos en la tabla Departamentos
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Recursos Humanos', 'Departamento encargado de la gestión del personal.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Tecnología', 'Departamento de desarrollo y mantenimiento tecnológico.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Finanzas', 'Departamento encargado de la contabilidad y presupuestos.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Ventas', 'Departamento de ventas y atención al cliente.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Marketing', 'Departamento de publicidad y estrategias de mercado.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Producción', 'Departamento de fabricación y control de calidad.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Logística', 'Departamento de distribución y almacenamiento.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Compras', 'Departamento encargado de la adquisición de insumos.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Legal', 'Departamento de asesoría jurídica y cumplimiento normativo.');
INSERT INTO departamentos (Nombre, Descripcion) VALUES ('Atención al Cliente', 'Departamento encargado de la relación con los clientes.');

-- Insertar datos en la tabla Cargos
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Gerente', 'Responsable de la gestión general de la empresa.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Analista', 'Encargado del análisis de datos y toma de decisiones.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Desarrollador', 'Encargado del desarrollo de software y sistemas.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Contador', 'Encargado de la contabilidad y finanzas de la empresa.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Vendedor', 'Responsable de la comercialización de productos y servicios.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Diseñador', 'Encargado del diseño gráfico y visual de la empresa.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Operario', 'Trabajador de producción y manufactura.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Almacenero', 'Encargado de la gestión de inventarios y almacenamiento.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Abogado', 'Asesor legal de la empresa.');
INSERT INTO cargos (Nombre, Descripcion) VALUES ('Soporte Técnico', 'Encargado de la asistencia técnica y mantenimiento.');

-- Insertar datos en la tabla Sedes
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Central', 'Av. Principal 123, Ciudad A.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Norte', 'Calle Secundaria 456, Ciudad B.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Sur', 'Av. Industrial 789, Ciudad C.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Este', 'Carrera 12 No. 34-56, Ciudad D.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Oeste', 'Av. Comercial 678, Ciudad E.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Regional 1', 'Calle 5 No. 67-89, Ciudad F.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Regional 2', 'Calle 8 No. 90-12, Ciudad G.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Regional 3', 'Carrera 15 No. 23-45, Ciudad H.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Regional 4', 'Av. Empresarial 321, Ciudad I.');
INSERT INTO sedes (Nombre, Direccion) VALUES ('Sede Regional 5', 'Carrera 50 No. 10-20, Ciudad J.');

-- Insertar datos en la tabla Usuarios
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Cliente', 'CC12345678', 'Juan', 'Pérez', 'juan.perez@email.com', 'hashedpassword1', '3001234567', 'Activo', 'Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Cliente', 'CC23456789', 'María', 'Gómez', 'maria.gomez@email.com', 'hashedpassword2', '3012345678', 'Activo', 'No Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Trabajador', 'CC34567890', 'Carlos', 'López', 'carlos.lopez@email.com', 'hashedpassword3', '3023456789', 'Inactivo', 'Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Trabajador', 'CC45678901', 'Ana', 'Martínez', 'ana.martinez@email.com', 'hashedpassword4', '3034567890', 'Activo', 'No Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Cliente', 'CC56789012', 'Luis', 'Hernández', 'luis.hernandez@email.com', 'hashedpassword5', '3045678901', 'Activo', 'Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Trabajador', 'CC67890123', 'Elena', 'Rodríguez', 'elena.rodriguez@email.com', 'hashedpassword6', '3056789012', 'Inactivo', 'No Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Cliente', 'CC78901234', 'David', 'Sánchez', 'david.sanchez@email.com', 'hashedpassword7', '3067890123', 'Activo', 'Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Trabajador', 'CC89012345', 'Sofía', 'Ramírez', 'sofia.ramirez@email.com', 'hashedpassword8', '3078901234', 'Activo', 'No Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Cliente', 'CC90123456', 'Javier', 'Torres', 'javier.torres@email.com', 'hashedpassword9', '3089012345', 'Activo', 'Confirmado');
INSERT INTO usuarios (Rol, Identificacion_Nacional, Nombre, Apellido, Correo, Contrasena, Telefono, Estado, Estado_Correo) VALUES ('Trabajador', 'CC01234567', 'Paula', 'Mendoza', 'paula.mendoza@email.com', 'hashedpassword10', '3090123456', 'Inactivo', 'No Confirmado');

COMMIT;
