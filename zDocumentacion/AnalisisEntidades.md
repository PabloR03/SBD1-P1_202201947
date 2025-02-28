# ESQUEMA CONCEPTUAL

Análisis de las entidades y descripciones de la base de datos.

## Usuarios
    Id_Usuario
    Rol (Cliente, Trabajador, etc.)
    Cui
    Nombre
    Apellido
    Correo
    Telefono
    Estado (Activo o Inactivo)
    Fecha_Registro
    Estado_Correo (Confirmado o No Confirmado)
    Direccion
    Metodo_Pago
    Created_At
    Updated_At

## Trabajadores
    Id_Trabajador
    Cui
    Nombre
    Apellido
    Cargo
    Departamento
    Telefono
    Correo_Institucional
    Id_Sede
    Estado (Activo o Inactivo)
    Created_At
    Updated_At

## Sedes
        Id_Sede
        Nombre
        Direccion
        Created_At
        Updated_At

## Productos
    Id_Producto
    Sku
    Nombre
    Descripcion
    Precio
    Slug
    Cantidad_Inventario
    Id_Categoria
    Nombre
    Descripcion
    Disponibilidad (Activo o No)
    Id_Imagen
    Created_At
    Updated_At

## Imagenes
        Id_Imagen
        Id_Producto
        Url_Imagen
        Created_At
        Updated_At

## Orden_Compra
    Id_Orden
    Id_Cliente
    Fecha_Creacion
    Estado
    Total
    Created_At
    Updated_At

## Detalle_Orden
        Id_Detalle
        Id_Orden 
        Id_Producto
        Cantidad
        Precio_Unitario
        Subtotal
        Created_At
        Updated_At

## Pagos
    Id_Pago
    Id_Orden
    Fecha_Transaccion
    Monto_Total
    Metodo_Pago (Tarjeta, Transferencia, etc.)
    Estado (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

## Envios
    Id_Envio
    Id_Orden
    Fecha_Despacho
    Direccion_Entrega
    Empresa_Transporte
    Numero_Seguimiento
    Estado (En tránsito, Entregado, Devuelto)
    Created_At
    Updated_At

## Devoluciones
    Id_Devolucion
    Id_Orden
    Fecha_Solicitud
    Motivo
    Estado (En revisión, Aprobada, Rechazada)
    Id_producto
    Created_At
    Updated_At

## Traslado_Productos
    Id_Traslado
    Fecha_Movimiento
    Id_Almacen_Origen 
    Id_Almacen_Destino
    Id_Producto
    Cantidad_Transferida
    Estado
    Fecha_Estimada_Llegada
    Created_At
    Updated_At

Posibles relaciones entre las entidades:

Usuarios - Orden_Compra:
Un usuario puede realizar muchas órdenes de compra.

Trabajadores - Sedes:
Muchos trabajadores pueden pertenecer a una sede.

Productos - Categorías:
Muchos productos pueden pertenecer a una categoría.

Productos - Imágenes:
Un producto puede tener muchas imágenes.

Orden_Compra - Detalle_Orden:
Una orden puede tener muchos detalles (productos).

Productos - Detalle_Orden:
Un producto puede aparecer en muchos detalles de órdenes.

Orden_Compra - Pagos:
Una orden puede tener uno o varios pagos.

Orden_Compra - Envíos:
Una orden tiene un envío.

Orden_Compra - Devoluciones:
Una orden puede tener varias devoluciones.

Productos - Devoluciones:
Un producto puede tener muchas devoluciones.

Productos - Traslado_Productos:
Un producto puede tener muchos traslados.

Almacenes - Traslado_Productos:
Un almacén puede ser origen o destino de muchos traslados.



# Esquema Logico

Se ha realizado el análisis de las entidades y se ha llegado a la conclusión de que se necesitan las siguientes tablas para la base de datos y se determinan clave primaria y clave foránea para cada tabla. (Proceso de normalizacion de la base de datos)

## Tablas 1FN

### Usuarios
    Id_Usuario (PK)
    Rol (Cliente, Trabajador, etc.)
    Cui
    Nombre
    Apellido
    Correo
    Telefono
    Estado (Activo o Inactivo)
    Fecha_Registro
    Estado_Correo (Confirmado o No Confirmado)
    Direccion
    Metodo_Pago
    Created_At
    Updated_At

### Trabajadores
    Id_Trabajador (PK)
    Cui
    Nombre
    Apellido
    Cargo
    Departamento
    Telefono
    Correo_Institucional
    Id_Sede (FK, referencia a la sede donde trabaja)
    Estado (Activo o Inactivo)
    Created_At
    Updated_At

### Sedes
        Id_Sede (PK)
        Nombre
        Direccion
        Created_At
        Updated_At

### Productos
    Id_Producto (PK)
    Sku
    Nombre
    Descripcion
    Precio
    Slug
    Cantidad_Inventario
    Id_Categoria (FK, referencia a Categorías)
    Disponibilidad (Activo o No)
    Id_Imagen (FK, referencia a Imágenes)
    Created_At
    Updated_At

### Categoria
        Id_Categoria (PK)
        Nombre
        Descripcion
        Created_At
        Updated_At

### Imagenes
        Id_Imagen (PK)
        Id_Producto (FK)
        Url_Imagen
        Created_At
        Updated_At

### Orden_Compra
    Id_Orden (PK)
    Id_Cliente (FK, referencia a Usuarios)
    Fecha_Creacion
    Estado
    Total
    Created_At
    Updated_At

### Detalle_Orden
        Id_Detalle (PK)
        Id_Orden (FK)
        Id_Producto (FK)
        Cantidad
        Precio_Unitario
        Subtotal
        Created_At
        Updated_At

### Pagos
    Id_Pago (PK)
    Id_Orden (FK)
    Fecha_Transaccion
    Monto_Total
    Metodo_Pago (Tarjeta, Transferencia, etc.)
    Estado (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

### Envios
    Id_Envio (PK)
    Id_Orden (FK)
    Fecha_Despacho
    Direccion_Entrega
    Empresa_Transporte
    Numero_Seguimiento
    Estado (En tránsito, Entregado, Devuelto)
    Created_At
    Updated_At

### Devoluciones
    Id_Devolucion (PK)
    Id_Orden (FK)
    Fecha_Solicitud
    Motivo
    Estado (En revisión, Aprobada, Rechazada)
    Id_producto (FK)
    Created_At
    Updated_At

### Traslado_Productos
    Id_Traslado (PK)
    Fecha_Movimiento
    Id_Almacen_Origen (FK, referencia a Sedes)
    Id_Almacen_Destino (FK, referencia a Sedes)
    Id_Producto (FK)
    Cantidad_Transferida
    Estado
    Fecha_Estimada_Llegada
    Created_At
    Updated_At

### Metodos_Pago
        Id_Metodo_Pago (PK)
        Nombre
        Descripcion
        Created_At
        Updated_At

## Tablas 2FN

Cambios: 
Normalización de la tabla Usuarios:

- Se extrajo el campo "Direccion" para crear una tabla independiente llamada "Direcciones".
- Se extrajo el campo "Metodo_Pago" para crear una relación con la tabla "Metodos_Pago_Usuario".

Creación de nuevas tablas relacionales:

- "Direcciones": Permite a un usuario tener múltiples direcciones con diferentes tipos (envío, facturación).
- "Metodos_Pago_Usuario": Establece una relación muchos a muchos entre usuarios y métodos de pago.
- "Inventario": Separa la gestión de cantidades de productos por sede.

Normalización de Productos:

- Se eliminó "Cantidad_Inventario" de la tabla "Productos" y se trasladó a la nueva tabla "Inventario".
- Se eliminó la referencia directa a "Id_Imagen", permitiendo una relación uno a muchos más clara desde la tabla "Imagenes".

Normalización de Categorías:

- Se corrigió el esquema separando correctamente "Categorias" como una tabla independiente (ya estaba en 1FN pero aquí se hace más explícito).

Normalización de Orden_Compra:

- Se eliminó el campo "Total" de "Orden_Compra", ya que este es un dato calculable a partir de los "Detalle_Orden".

Normalización de Devoluciones:

- Se eliminó el campo "Id_producto" de la tabla "Devoluciones", probablemente porque esta información ya está accesible a través de "Detalle_Orden".

Normalización de Envíos:

- La tabla "Envios" fue eliminada en la 2FN, posiblemente porque sus datos se integraron en otra tabla o porque se decidió manejar esta información de otra manera.

### Usuarios
    Id_Usuario (PK)
    Rol (Cliente, Trabajador, etc.)
    Cui
    Nombre
    Apellido
    Correo
    Telefono
    Estado (Activo o Inactivo)
    Fecha_Registro
    Estado_Correo (Confirmado o No Confirmado)
    Created_At
    Updated_At

### Direcciones
    Id_Direccion (PK)
    Id_Usuario (FK)
    Direccion
    Tipo (Envío, Facturación, etc.)
    Created_At
    Updated_At

### Metodos_Pago_Usuario
    Id_Metodo_Pago_Usuario (PK)
    Id_Usuario (FK)
    Id_Metodo_Pago (FK)
    Detalles (opcional, para almacenar información específica como el número de tarjeta)
    Created_At
    Updated_At

### Trabajadores
    Id_Trabajador (PK)
    Cui
    Nombre
    Apellido
    Cargo
    Departamento
    Telefono
    Correo_Institucional
    Id_Sede (FK, referencia a Sedes)
    Estado (Activo o Inactivo)
    Created_At
    Updated_At

### Sedes
    Id_Sede (PK)
    Nombre
    Direccion
    Created_At
    Updated_At

### Productos
    Id_Producto (PK)
    Sku
    Nombre
    Descripcion
    Precio
    Slug
    Id_Categoria (FK, referencia a Categorias)
    Disponibilidad (Activo o No)
    Created_At
    Updated_At

### Inventario
    Id_Inventario (PK)
    Id_Producto (FK)
    Id_Sede (FK)
    Cantidad
    Created_At
    Updated_At

### Categorias
    Id_Categoria (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

### Imagenes
    Id_Imagen (PK)
    Id_Producto (FK)
    Url_Imagen
    Created_At
    Updated_At

### Orden_Compra
    Id_Orden (PK)
    Id_Cliente (FK, referencia a Usuarios)
    Fecha_Creacion
    Estado
    Created_At
    Updated_At

### Detalle_Orden
    Id_Detalle (PK)
    Id_Orden (FK)
    Id_Producto (FK)
    Cantidad
    Precio_Unitario
    Subtotal
    Created_At
    Updated_At

### Pagos
    Id_Pago (PK)
    Id_Orden (FK)
    Fecha_Transaccion
    Monto_Total
    Metodo_Pago (Tarjeta, Transferencia, etc.)
    Estado (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

### Devoluciones
    Id_Devolucion (PK)
    Id_Orden (FK)
    Fecha_Solicitud
    Motivo
    Estado (En revisión, Aprobada, Rechazada)
    Created_At
    Updated_At

### Traslado_Productos
    Id_Traslado (PK)
    Fecha_Movimiento
    Id_Almacen_Origen (FK, referencia a Sedes)
    Id_Almacen_Destino (FK, referencia a Sedes)
    Id_Producto (FK)
    Cantidad_Transferida
    Estado
    Fecha_Estimada_Llegada
    Created_At
    Updated_At

### Metodos_Pago
    Id_Metodo_Pago (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

## Tablas 3FN

Normalización de Trabajadores:

- Se extrajeron los campos "Cargo" y "Departamento" para crear las tablas independientes "Cargos" y "Departamentos".
- Se reemplazaron por claves foráneas (Id_Cargo e Id_Departamento).

Normalización de estados en múltiples tablas:

- Se creó la tabla "Estados_Orden" para reemplazar el campo "Estado" en Orden_Compra.
- Se creó la tabla "Estados_Pago" para reemplazar el campo "Estado" en Pagos.
- Se creó la tabla "Estados_Devolucion" para reemplazar el campo "Estado" en Devoluciones.
- Se creó la tabla "Estados_Traslado" para reemplazar el campo "Estado" en Traslado_Productos.

Normalización de Pagos:

- Se eliminó el campo "Metodo_Pago" y se reemplazó por una clave foránea a la tabla "Metodos_Pago".

Productos:

- La tabla Productos no aparece en el esquema 3FN que me has proporcionado, pero asumo que se mantiene similar a la 2FN.

Envíos:

- La tabla Envíos sigue sin aparecer en la 3FN, confirmando que esta entidad fue eliminada o fusionada en el proceso de normalización.

### Usuarios (Clientes)
    Id_Usuario (PK)
    Cui
    Nombre
    Apellido
    Telefono
    Correo
    Estado (Activo o Inactivo)
    Estado_Correo (Confirmado o No Confirmado)
        Rol (Cliente, Trabajador, etc.)
        Fecha_Registro
    Created_At
    Updated_At

### Direcciones
    Id_Direccion (PK)
    Id_Usuario (FK)
    Direccion
        Tipo (Envío, Facturación, etc.)
    Created_At
    Updated_At

### Metodos_Pago_Usuario (pagos)
    Id_Metodo_Pago_Usuario (PK)
    Id_Usuario (FK)
            Id_Metodo_Pago (FK)
    Created_At
    Updated_At

### Trabajadores
    Id_Trabajador (PK)
    Cui
    Nombre
    Apellido
    Id_Cargo (FK, referencia a Cargos)
    Id_Departamento (FK, referencia a Departamentos)
    Telefono
    Correo_Institucional
    Id_Sede (FK, referencia a Sedes)
    Estado (Activo o Inactivo)
    Created_At
    Updated_At

### Cargos
    Id_Cargo (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

### Departamentos
    Id_Departamento (PK)
    Nombre
        Descripcion
    Created_At
    Updated_At

### Sedes
    Id_Sede (PK)
    Nombre
    Direccion
    Created_At
    Updated_At

### Inventario
    Id_Inventario (PK)
    Id_Producto (FK)
    Id_Sede (FK)
    Cantidad
    Created_At
    Updated_At

### Categorias (Categorias)
    Id_Categoria (PK)
    Nombre
        Descripcion 
    Created_At
    Updated_At

### Imagenes
    Id_Imagen (PK)
    Id_Producto (FK)
    Url_Imagen
    Created_At
    Updated_At

### Orden_Compra (Ordenes)
    Id_Orden (PK)
    Id_Cliente (FK, referencia a Usuarios)
    Id_Sede (FK, referencia a Sedes)
    Id_Metodo_Pago (FK, referencia a Metodos_Pago)
        Id_Estado (FK, referencia a Estados_Orden)
    Created_At
    Updated_At

### Estados_Orden
    Id_Estado (PK)
    Nombre (Pendiente, En proceso, Completada, etc.)
    Created_At
    Updated_At

### Detalle_Orden
    Id_Detalle (PK)
    Id_Orden (FK)
    Id_Producto (FK)
    Cantidad
    Precio_Unitario
    Subtotal
    Created_At
    Updated_At

### Pagos (Pagos_ordenes)
    Id_Pago (PK)
    Id_Orden (FK)
    Metodo_Pago
            Id_Estado (ESTADO)
    Created_At
    Updated_At

### Estados_Pago
    Id_Estado (PK)
    Nombre (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

### Devoluciones (productos)
    Id_Devolucion (PK)
    Id_Orden (FK)
    Fecha_Solicitud
    Motivo
    Id_Estado (FK, referencia a Estados_Devolucion)
    Created_At
    Updated_At

### Estados_Devolucion
    Id_Estado (PK)
    Nombre (En revisión, Aprobada, Rechazada)
    Created_At
    Updated_At

### Traslado_Productos
    Id_Traslado (PK)
    Fecha_Movimiento
    Id_Almacen_Origen (FK, referencia a Sedes)
    Id_Almacen_Destino (FK, referencia a Sedes)
    Id_Producto (FK)
    Cantidad_Transferida
    Id_Estado (FK, referencia a Estados_Traslado)
    Fecha_Estimada_Llegada
    Created_At
    Updated_At

### Estados_Traslado
    Id_Estado (PK)
    Nombre (En tránsito, Completado, Cancelado)
    Created_At
    Updated_At

### Metodos_Pago
    Id_Metodo_Pago (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

### Productos
    Id_Producto (PK)
    Sku
    Nombre
    Descripcion
    Precio
    Slug
    Id_Categoria (FK)
    Id_Estado_Disponibilidad (FK)
    Created_At
    Updated_At

### Estados_Disponibilidad
    Id_Estado_Disponibilidad (PK)
    Nombre (Activo, Inactivo)
    Created_At
    Updated_At

### Envios
    Id_Envio (PK)
    Id_Orden (FK)
    Fecha_Despacho
    Id_Direccion (FK, referencia a Direcciones)
    Id_Empresa_Transporte (FK)
    Numero_Seguimiento
    Id_Estado (FK, referencia a Estados_Envio)
    Created_At
    Updated_At

### Estados_Envio
    Id_Estado (PK)
    Nombre (En tránsito, Entregado, Devuelto)
    Created_At
    Updated_At

### Empresas_Transporte
    Id_Empresa_Transporte (PK)
    Nombre
    Informacion_Contacto
    Created_At
    Updated_At

# [Tabla Relaciones](/zDocumentacion/Tabla%20Relaciones.pdf)

Usuarios y Direcciones → Un usuario puede tener múltiples direcciones (facturación, envío, etc.).

Usuarios y Métodos de Pago Usuario → Un usuario puede registrar múltiples métodos de pago.

Órdenes de Compra y Métodos de Pago Usuario → Cada orden se paga con un método de pago registrado por el usuario.

Órdenes de Compra y Productos → Una orden puede contener varios productos.

Órdenes de Compra y Sedes → Las órdenes pueden estar asociadas a una sede desde donde se gestionan.

Productos y Inventario → Los productos se almacenan en un inventario en una sede específica.

Inventario y Sedes → Cada sede tiene su propio inventario.

Trabajadores y Sedes → Un trabajador pertenece a una sede específica.

Trabajadores y Departamentos → Un trabajador pertenece a un departamento.

Departamentos y Cargos → Cada trabajador tiene un cargo dentro de un departamento.

Órdenes de Compra y Pagos → Cada orden tiene un pago asociado.

Órdenes de Compra y Devoluciones → Una orden puede generar una solicitud de devolución.

Productos y Traslados → Los productos pueden ser trasladados entre sedes.

Órdenes de Compra y Envíos → Cada orden genera un envío hacia una dirección del usuario.

Estados → Controlan los distintos estados de las órdenes, pagos, devoluciones, traslados y envíos.

# [Tabla Cardinalidad](/zDocumentacion/Tabla%20Cardinalidad.pdf)

## Relaciones 1:N (uno a muchos)

Usuarios → Direcciones: Un usuario puede tener múltiples direcciones

Usuarios → Metodos_Pago_Usuario: Un usuario puede tener múltiples métodos de pago asociados

Usuarios → Orden_Compra: Un usuario puede realizar múltiples órdenes de compra

Direcciones → Envios: Una dirección puede ser utilizada en múltiples envíos

Metodos_Pago → Metodos_Pago_Usuario: Un método de pago general puede estar vinculado a múltiples métodos de pago de usuario

Cargos → Trabajadores: Un cargo puede estar asignado a múltiples trabajadores

Departamentos → Trabajadores: Un departamento puede tener múltiples trabajadores

Sedes → Trabajadores: Una sede puede tener múltiples trabajadores

Sedes → Inventario: Una sede puede tener múltiples productos en inventario

Sedes → Orden_Compra: Una sede puede estar asociada a múltiples órdenes de compra

Sedes → Traslado_Productos (como origen): Una sede puede ser origen de múltiples traslados de productos

Sedes → Traslado_Productos (como destino): Una sede puede ser destino de múltiples traslados de productos

Categorias → Productos: Una categoría puede tener múltiples productos

Productos → Imagenes: Un producto puede tener múltiples imágenes

Productos → Inventario: Un producto puede estar en múltiples registros de inventario

Productos → Detalle_Orden: Un producto puede estar en múltiples detalles de órdenes

Productos → Traslado_Productos: Un producto puede ser trasladado múltiples veces

Orden_Compra → Detalle_Orden: Una orden de compra puede tener múltiples detalles

Orden_Compra → Pagos: Una orden de compra puede tener múltiples pagos asociados

Orden_Compra → Devoluciones: Una orden de compra puede tener múltiples devoluciones

Orden_Compra → Envios: Una orden de compra puede tener múltiples envíos

Estados_Orden → Orden_Compra: Un estado puede estar asociado a múltiples órdenes de compra

Estados_Pago → Pagos: Un estado de pago puede estar asociado a múltiples pagos

Estados_Devolucion → Devoluciones: Un estado de devolución puede estar asociado a múltiples devoluciones

Estados_Traslado → Traslado_Productos: Un estado de traslado puede estar asociado a múltiples traslados

Estados_Envio → Envios: Un estado de envío puede estar asociado a múltiples envíos

Empresas_Transporte → Envios: Una empresa de transporte puede estar asociada a múltiples envíos

Estados_Disponibilidad → Productos: Un estado de disponibilidad puede estar asociado a múltiples productos

Metodos_Pago → Orden_Compra: Un método de pago puede estar asociado a múltiples órdenes de compra

## Relaciones N:1 (muchos a uno)

Direcciones → Usuarios: Cada dirección pertenece a un usuario

Metodos_Pago_Usuario → Usuarios: Cada método de pago está asociado a un usuario

Metodos_Pago_Usuario → Metodos_Pago: Cada método de pago del usuario está vinculado a un método de pago general

Trabajadores → Cargos: Cada trabajador tiene un cargo

Trabajadores → Departamentos: Cada trabajador pertenece a un departamento

Trabajadores → Sedes: Cada trabajador está asociado a una sede

Inventario → Productos: Cada registro de inventario está asociado a un producto

Inventario → Sedes: Cada registro de inventario está asociado a una sede

Imagenes → Productos: Cada imagen está asociada a un producto

Orden_Compra → Usuarios: Cada orden de compra está asociada a un usuario

Orden_Compra → Sedes: Cada orden de compra está asociada a una sede

Orden_Compra → Metodos_Pago: Cada orden de compra está asociada a un método de pago

Orden_Compra → Estados_Orden: Cada orden de compra tiene un estado

Detalle_Orden → Orden_Compra: Cada detalle está asociado a una orden de compra

Detalle_Orden → Productos: Cada detalle está asociado a un producto

Pagos → Orden_Compra: Cada pago está asociado a una orden de compra

Pagos → Estados_Pago: Cada pago tiene un estado

Devoluciones → Orden_Compra: Cada devolución está asociada a una orden de compra

Devoluciones → Estados_Devolucion: Cada devolución tiene un estado

Traslado_Productos → Sedes (como origen): Cada traslado tiene un almacén de origen

Traslado_Productos → Sedes (como destino): Cada traslado tiene un almacén de destino

Traslado_Productos → Productos: Cada traslado está asociado a un producto

Traslado_Productos → Estados_Traslado: Cada traslado tiene un estado

Productos → Categorias: Cada producto pertenece a una categoría

Productos → Estados_Disponibilidad: Cada producto tiene un estado de disponibilidad

Envios → Orden_Compra: Cada envío está asociado a una orden de compra

Envios → Direcciones: Cada envío tiene una dirección de destino

Envios → Empresas_Transporte: Cada envío está asociado a una empresa de transporte

Envios → Estados_Envio: Cada envío tiene un estado


ENTIDADES FINALES ASOCIADAS A CSV
### Usuarios - CSV CLIENTES
	### Usuario_Metodos_Pago - ENLAZADA A USUARIOS

### Trabajadores - CSV TRABJADORES
	### Departamentos - CSV DEPARTAMENTOS
	### Sedes - CSV SEDES

### Productos - CSV PRODUCTOS
	### Categoria - CSV CATEGORIA
	### Inventario - CSV INVENTARIO
	### Imágenes - CSV IMAGENES

### Orden_Compra - CSV ORDENES

### Detalle_Orden - CSV ORDENES PRODUCTOS

### Pagos - CSV PAGOS ORDENES

### Metodos_Pago - CSV PAGOS

### Envios - CSV ORDENES ENTREGADAS

### Direcciones - CSV DIRECCIONES

### Devoluciones - CSV PRODUCTOS DEVOLUCION

### Detalle_Movimientos - CSV MOVIMIENTO PRODUCTOS

### Traslado_Productos - CSV MOVIMIENTOS
