# Universidad de San Carlos de Guatemala
## Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Sistemas de Bases de Datos - 0774
### Sección B
### Proyecto 1
### Primer Semestre 2025

**Programador:** Pablo Andrés Rodríguez Lima  
**Carné:** 202201947

# [ESQUEMA CONCEPTUAL](/Documentacion/Modelos/Conceptual.pdf)

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

![Esquema Conceptual](/Documentacion/Conceptual1.jpg)

#  Proceso de Normalización

## Fases de Normalización

Entidades a utilizar:

### Usuarios
    Id_Usuario (PK)
    Rol (Cliente, Trabajador, etc.)
    Identificacion_Nacional
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
    Identificacion_Nacional
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

### Orden
    Id_Orden (PK)
    Id_Usuario (FK, referencia a Usuarios)
    Id_Departamento (FK, referencia a Departamentos)
    Id_Metodo_Pago (FK, referencia a Metodos_Pago) 
    Created_At
    Updated_At

### Pagos
    Id_Pago (PK)
    Id_Usuario (FK, referencia a Usuarios)
    Id_Metodo_Pago(FK, referencia a Metodo Pago) (Tarjeta, Transferencia, etc.)
    Monto_Total
    Estado (Pendiente, AprobaLdo, Rechazado)
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


## 1 Forma normal

Aplicando principios de normalización, se asegura que no haya duplicación de datos y que cada celda contenga un solo valor, lo que facilita las operaciones de búsqueda, inserción, actualización y eliminación de datos.

### Usuarios
    Id_Usuario(PK)
    Rol (Cliente, Trabajador, etc.)
    Identificacion_Nacional
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
    Identificacion_Nacional
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
    Categoria
    Disponibilidad (Activo o No)
    Id_Imagen (FK, referencia a Imágenes)
    Created_At
    Updated_At

### Orden
    Id_Orden (PK)
    Id_Usuario (FK, referencia a Usuarios)
    Id_Departamento (FK, referencia a Departamentos)
    Id_Metodo_Pago (FK, referencia a Metodos_Pago)
    Created_At
    Updated_At

### Pagos
    Id_Pago (PK)
    Id_Usuario (FK, referencia a Usuarios)
    Id_Orden
    Id_Metodo_Pago (FK, referencia a Metodo_Pago) (Tarjeta, Transferencia, etc.)
    Monto_Total
    Estado (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

### Envios
    Id_Envio (PK)
    Id_Orden (FK, referencia a Orden)
    Fecha_Despacho
    Direccion_Entrega
    Empresa_Transporte
    Numero_Seguimiento
    Estado (En tránsito, Entregado, Devuelto)
    Created_At
    Updated_At

### Devoluciones
    Id_Devolucion (PK)
    Id_Orden (FK, referencia a Orden)
    Fecha_Solicitud
    Motivo
    Estado(En revisión, Aprobada, Rechazada)
    Id_Producto (FK, referencia a Producto)
    Created_At
    Updated_At

### Traslado_Productos
    Id_Traslado (PK)
    Fecha_Movimiento
    Id_Almacen_Origen (FK, referencia a Sedes)
    Id_Almacen_Destino (FK, referencia a Sedes)
    Id_Producto (FK)
    Cantidad_Transferida
    Estado (Pendiente, En tránsito, Completado, Cancelado)
    Fecha_Estimada_Llegada
    Created_At
    Updated_At


## 2 Forma normal

Para cumplir con la segunda forma normal, se deben cumplir con los siguientes requisitos:
debe estar en la primera forma normal, no debe haber dependencias parciales y todos los atributos no clave deben depender de la clave primaria.

Normalización de la tabla Usuarios:

- Se extrajo el campo "Direccion" para crear una tabla independiente llamada "Direcciones".
- Se extrajo el campo "Metodo_Pago" para crear una relación con la tabla "Metodos_Pago_Usuario".

### Usuarios
    Id_Usuario (PK)
    Rol (Cliente, Trabajador, etc.)
    Identificacion_Nacional
    Nombre
    Apellido
    Correo
    Telefono
    Estado (Activo o Inactivo)
    Fecha_Registro
    Estado_Correo (Confirmado o No Confirmado)
    Id_Metodo_Pago_Usuario (FK)
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
    Id_Usuario (FK)
    Cargo
    Departamento
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

Normalización de Productos:

- Se eliminó "Cantidad_Inventario" de la tabla "Productos" y se trasladó a la nueva tabla "Inventario".
- Se eliminó la referencia directa a "Id_Imagen", permitiendo una relación uno a muchos más clara desde la tabla "Imagenes".

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

Normalización de Orden_Compra:

- Se eliminó el campo "Total" de "Orden_Compra", ya que este es un dato calculable a partir de los "Detalle_Orden".

### Orden_Compra
    Id_Orden (PK)
    Id_Usuario (FK, referencia a Usuarios)
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
    Created_At
    Updated_At

### Envios
    Id_Envio (PK)
    Id_Orden (FK)
    Fecha_Despacho
    Id_Direccion (FK)
    Empresa_Transporte
    Numero_Seguimiento
    Estado (En tránsito, Entregado, Devuelto)
    Created_At
    Updated_At

### Pagos
    Id_Pago (PK)
    Id_Orden (FK)
    Fecha_Transaccion
    Id_Metodo_Pago (FK, referencia a Metodos_Pago)
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
    Id_Sede (FK, referencia a Sedes)
    Id_Sede (FK, referencia a Sedes)
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

## 3 Forma normal

### Usuarios
    Id_Usuario (PK)
    Rol (Cliente, Trabajador, etc.)
    Identificacion_Nacional
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
    Id_Usuario (FK)
    Id_Cargo (FK, referencia a Cargos)
    Id_Departamento (FK, referencia a Departamentos)
    Correo_Institucional
    Id_Sede (FK, referencia a la sede donde trabaja)
    Estado (Activo o Inactivo)
    Created_At
    Updated_At

Se implementaron dos nuevas tablas: Departamentos y Cargos. Estas tablas contienen la información descriptiva de los departamentos y cargos de la empresa, permitiendo que múltiples trabajadores puedan estar asociados a un mismo departamento o cargo sin necesidad de duplicar la información descriptiva.

### Departamentos
    Id_Departamento (PK)
    Nombre
        Descripcion
    Created_At
    Updated_At

### Cargos
    Id_Cargo (PK)
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
    Id_Usuario (FK, referencia a Usuarios)
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
    Created_At
    Updated_At

### Pagos
    Id_Pago (PK)
    Id_Orden (FK)
    Fecha_Transaccion
    Id_Metodo_Pago (FK, referencia a Metodos_Pago)
    Estado (Pendiente, Aprobado, Rechazado)
    Created_At
    Updated_At

### Metodos_Pago
    Id_Metodo_Pago (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

### Envios
    Id_Envio (PK)
    Id_Orden (FK)
    Fecha_Despacho
    Id_Direccion (FK)
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
    Created_At
    Updated_At

### Traslado_Productos
    Id_Traslado (PK)
    Fecha_Movimiento
    Id_Sede_Origen (FK, referencia a Sedes)
    Id_Sede_Destino (FK, referencia a Sedes)
    Estado (En preparación, En tránsito, Entregado, Cancelado)
    Fecha_Estimada_Llegada
    Id_Empresa_Transporte (FK, referencia a Empresas_Transporte)
    Created_At
    Updated_At

### Detalle_Traslado_Productos
    Id_Detalle_Traslado (PK)
    Id_Traslado (FK, referencia a Traslados)
    Id_Producto (FK, referencia a Productos)
    Cantidad_Transferida
    Estado_Producto (Pendiente, Enviado, Recibido)
    Created_At
    Updated_At

Se creó una nueva entidad llamada Empresas_Transporte para almacenar la información relacionada con las empresas que realizan el transporte de productos. Esta tabla incluye un identificador único, el nombre de la empresa y la información de contacto, evitando así la repetición de estos datos en la tabla de traslados.

### Empresas_Transporte
    Id_Empresa_Transporte (PK)
    Nombre
    Informacion_Contacto
    Created_At
    Updated_At

# [Descripción de las tablas](/Documentacion/Modelos/Logico.pdf)

### Usuarios
**Descripción:** Almacena la información de los usuarios registrados en la plataforma, incluyendo clientes y trabajadores.

- **Id_Usuario (PK):** Identificador único del usuario.
- **Rol:** Rol asignado al usuario (Cliente, Trabajador, etc.).
- **Cui:** Número de identificación personal.
- **Nombre:** Nombre del usuario.
- **Apellido:** Apellido del usuario.
- **Correo:** Dirección de correo electrónico.
- **Teléfono:** Número de contacto.
- **Estado:** Estado de la cuenta (Activo o Inactivo).
- **Fecha_Registro:** Fecha en que se registró el usuario.
- **Estado_Correo:** Indica si el correo fue confirmado.
- **Contraseña:** Contraseña del usuario.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Direcciones
**Descripción:** Contiene las direcciones asociadas a cada usuario.

- **Id_Direccion (PK):** Identificador único de la dirección.
- **Id_Usuario (FK):** Referencia al usuario propietario de la dirección.
- **Direccion:** Dirección física.
- **Tipo:** Tipo de dirección (Envío, Facturación, etc.).
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización.

### Métodos de Pago de Usuario
**Descripción:** Almacena los métodos de pago asociados a los usuarios.

- **Id_Metodo_Pago_Usuario (PK):** Identificador único del método de pago del usuario.
- **Id_Usuario (FK):** Referencia al usuario.
- **Id_Metodo_Pago (FK):** Referencia al método de pago.
- **Detalles:** Información adicional sobre el método de pago.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización.

### Trabajadores
**Descripción:** Contiene la información de los trabajadores registrados en el sistema.

- **Id_Trabajador (PK):** Identificador único del trabajador.
- **Id_Usuario (FK):** Referencia al usuario asociado.
- **Id_Cargo (FK):** Referencia al cargo del trabajador.
- **Id_Departamento (FK):** Referencia al departamento donde trabaja.
- **Correo_Institucional:** Correo asignado por la empresa.
- **Id_Sede (FK):** Referencia a la sede donde trabaja.
- **Estado:** Estado laboral (Activo o Inactivo).
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Sedes
**Descripción:** Almacena la información de las diferentes sedes de la empresa.

- **Id_Sede (PK):** Identificador único de la sede.
- **Nombre:** Nombre de la sede.
- **Direccion:** Dirección física de la sede.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Departamentos
**Descripción:** Contiene información sobre los departamentos de la empresa.

- **Id_Departamento (PK):** Identificador único del departamento.
- **Nombre:** Nombre del departamento.
- **Descripcion:** Descripción del departamento.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Cargos
**Descripción:** Define los distintos cargos dentro de la empresa.

- **Id_Cargo (PK):** Identificador único del cargo.
- **Nombre:** Nombre del cargo.
- **Descripcion:** Descripción del cargo.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Productos
**Descripción:** Contiene la información de los productos disponibles en el sistema.

- **Id_Producto (PK):** Identificador único del producto.
- **Sku:** Código único de identificación.
- **Nombre:** Nombre del producto.
- **Descripcion:** Descripción del producto.
- **Precio:** Precio de venta.
- **Slug:** Identificador amigable para URL.
- **Id_Categoria (FK):** Referencia a la categoría del producto.
- **Disponibilidad:** Estado del producto (Activo o No).
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Inventario
**Descripción:** Gestiona el stock de productos en distintas sedes.

- **Id_Inventario (PK):** Identificador único del inventario.
- **Id_Producto (FK):** Producto en el inventario.
- **Id_Sede (FK):** Sede donde se encuentra el producto.
- **Cantidad:** Cantidad disponible.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Categorías
**Descripción:** Contiene las categorías de los productos.

- **Id_Categoria (PK):** Identificador único de la categoría.
- **Nombre:** Nombre de la categoría.
- **Descripcion:** Descripción de la categoría.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Imágenes
**Descripción:** Almacena las imágenes asociadas a los productos.

- **Id_Imagen (PK):** Identificador único de la imagen.
- **Id_Producto (FK):** Referencia al producto asociado a la imagen.
- **Url_Imagen:** URL donde está alojada la imagen.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Órdenes de Compra
**Descripción:** Representa las compras realizadas por los usuarios.

- **Id_Orden (PK):** Identificador único de la orden.
- **Id_Usuario (FK):** Usuario que realizó la compra.
- **Fecha_Creacion:** Fecha en que se realizó la compra.
- **Estado:** Estado actual de la orden.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Detalle de Orden
**Descripción:** Contiene los productos dentro de una orden de compra.

- **Id_Detalle (PK):** Identificador único del detalle.
- **Id_Orden (FK):** Referencia a la orden de compra.
- **Id_Producto (FK):** Producto comprado.
- **Cantidad:** Cantidad adquirida.
- **Precio_Unitario:** Precio por unidad del producto.
- **Id_Departamento (FK):** Departamento encargado del producto.
- **Id_Metodo_Pago (FK):** Método de pago utilizado.
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Envíos
**Descripción:** Gestiona la entrega de pedidos a los clientes.

- **Id_Envio (PK):** Identificador único del envío.
- **Id_Orden (FK):** Orden asociada al envío.
- **Fecha_Despacho:** Fecha en que se despachó el pedido.
- **Id_Direccion (FK):** Dirección de entrega.
- **Empresa_Transporte:** Empresa encargada del envío.
- **Numero_Seguimiento:** Código de seguimiento.
- **Estado:** Estado del envío (En tránsito, Entregado, Devuelto).
- **Created_At:** Fecha de creación.
- **Updated_At:** Fecha de última actualización.

### Pagos
**Descripción:** Registra los pagos realizados por los usuarios para sus órdenes.

- **Id_Pago (PK):** Identificador único del pago.
- **Id_Orden (FK):** Referencia a la orden asociada al pago.
- **Fecha_Transaccion:** Fecha en que se realizó el pago.
- **Monto_Total:** Monto total de la transacción.
- **Id_Metodo_Pago (FK):** Referencia al método de pago utilizado.
- **Estado:** Estado del pago (Pendiente, Aprobado, Rechazado).
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Devoluciones
**Descripción:** Registra las solicitudes de devolución realizadas por los usuarios.

- **Id_Devolucion (PK):** Identificador único de la devolución.
- **Id_Orden (FK):** Referencia a la orden asociada a la devolución.
- **Fecha_Solicitud:** Fecha en que se solicitó la devolución.
- **Motivo:** Razón de la solicitud de devolución.
- **Estado:** Estado de la devolución (En revisión, Aprobada, Rechazada).
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Traslado de Productos
**Descripción:** Gestiona el movimiento de productos entre diferentes sedes.

- **Id_Traslado (PK):** Identificador único del traslado.
- **Fecha_Movimiento:** Fecha en que se realizó el traslado.
- **Id_Sede_Origen (FK):** Sede de origen del traslado.
- **Id_Sede_Destino (FK):** Sede de destino del traslado.
- **Estado:** Estado del traslado (En preparación, En tránsito, Entregado, Cancelado).
- **Fecha_Estimada_Llegada:** Fecha estimada de llegada del traslado.
- **Id_Empresa_Transporte (FK):** Referencia a la empresa de transporte encargada del traslado.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Detalle de Traslado de Productos
**Descripción:** Contiene los detalles de los productos trasladados entre sedes.

- **Id_Detalle_Traslado (PK):** Identificador único del detalle de traslado.
- **Id_Traslado (FK):** Referencia al traslado asociado.
- **Id_Producto (FK):** Referencia al producto trasladado.
- **Cantidad_Transferida:** Cantidad de productos trasladados.
- **Estado_Producto:** Estado del producto (Pendiente, Enviado, Recibido).
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Empresas de Transporte
**Descripción:** Registra la información de las empresas de transporte asociadas.

- **Id_Empresa_Transporte (PK):** Identificador único de la empresa de transporte.
- **Nombre:** Nombre de la empresa.
- **Informacion_Contacto:** Datos de contacto de la empresa de transporte.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

### Métodos de Pago
**Descripción:** Contiene los distintos métodos de pago disponibles en la plataforma.

- **Id_Metodo_Pago (PK):** Identificador único del método de pago.
- **Nombre:** Nombre del método de pago.
- **Descripcion:** Descripción del método de pago.
- **Created_At:** Fecha de creación del registro.
- **Updated_At:** Fecha de última actualización del registro.

![Esquema Logico](/Documentacion/Logico1.jpg)
---

# [Esquema Logico](/Documentacion/Modelos/Relational.pdf)

## Definicion teorica de tabla de relaciones  
1. **Usuarios**:
   - Usuarios → Direcciones: Un usuario puede tener múltiples direcciones
   - Usuarios → Métodos de Pago de Usuario: Un usuario puede tener múltiples métodos de pago
   - Usuarios → Trabajadores: Un usuario puede ser un trabajador
   - Usuarios → Órdenes de Compra: Un usuario puede realizar múltiples órdenes

2. **Direcciones**:
   - Direcciones → Usuarios: Una dirección pertenece a un usuario
   - Direcciones → Envíos: Una dirección puede ser destino de múltiples envíos

3. **Métodos de Pago de Usuario**:
   - Métodos de Pago de Usuario → Usuarios: Un método de pago de usuario pertenece a un usuario
   - Métodos de Pago de Usuario → Métodos de Pago: Un método de pago de usuario es de un tipo específico

4. **Trabajadores**:
   - Trabajadores → Usuarios: Un trabajador es un usuario
   - Trabajadores → Cargos: Un trabajador tiene un cargo específico
   - Trabajadores → Departamentos: Un trabajador pertenece a un departamento
   - Trabajadores → Sedes: Un trabajador está asignado a una sede

5. **Sedes**:
   - Sedes → Trabajadores: Una sede puede tener múltiples trabajadores
   - Sedes → Inventario: Una sede puede tener múltiples registros de inventario
   - Sedes → Traslado de Productos (origen): Una sede puede ser origen de múltiples traslados
   - Sedes → Traslado de Productos (destino): Una sede puede ser destino de múltiples traslados

6. **Departamentos**:
   - Departamentos → Trabajadores: Un departamento puede tener múltiples trabajadores

7. **Cargos**:
   - Cargos → Trabajadores: Un cargo puede ser asignado a múltiples trabajadores

8. **Productos**:
   - Productos → Categorías: Un producto pertenece a una categoría
   - Productos → Inventario: Un producto puede estar en múltiples inventarios
   - Productos → Imágenes: Un producto puede tener múltiples imágenes
   - Productos → Detalle de Orden: Un producto puede estar en múltiples detalles de orden
   - Productos → Detalle de Traslado de Productos: Un producto puede estar en múltiples traslados

9. **Inventario**:
   - Inventario → Productos: Un inventario corresponde a un producto
   - Inventario → Sedes: Un inventario está asociado a una sede

10. **Categorías**:
    - Categorías → Productos: Una categoría puede tener múltiples productos

11. **Imágenes**:
    - Imágenes → Productos: Una imagen pertenece a un producto

12. **Órdenes de Compra**:
    - Órdenes de Compra → Usuarios: Una orden pertenece a un usuario
    - Órdenes de Compra → Detalle de Orden: Una orden tiene múltiples detalles
    - Órdenes de Compra → Envíos: Una orden puede tener uno o más envíos
    - Órdenes de Compra → Pagos: Una orden puede tener uno o más pagos
    - Órdenes de Compra → Devoluciones: Una orden puede tener una o más devoluciones

13. **Detalle de Orden**:
    - Detalle de Orden → Órdenes de Compra: Un detalle pertenece a una orden
    - Detalle de Orden → Productos: Un detalle se refiere a un producto

14. **Envíos**:
    - Envíos → Órdenes de Compra: Un envío está asociado a una orden
    - Envíos → Direcciones: Un envío se dirige a una dirección
    - Envíos → Empresas de Transporte: Un envío es realizado por una empresa de transporte

15. **Pagos**:
    - Pagos → Órdenes de Compra: Un pago corresponde a una orden
    - Pagos → Métodos de Pago: Un pago utiliza un método de pago específico

16. **Devoluciones**:
    - Devoluciones → Órdenes de Compra: Una devolución está asociada a una orden

17. **Traslado de Productos**:
    - Traslado de Productos → Sedes (origen): Un traslado tiene una sede de origen
    - Traslado de Productos → Sedes (destino): Un traslado tiene una sede de destino
    - Traslado de Productos → Empresas de Transporte: Un traslado puede ser realizado por una empresa de transporte
    - Traslado de Productos → Detalle de Traslado de Productos: Un traslado tiene múltiples detalles

18. **Detalle de Traslado de Productos**:
    - Detalle de Traslado de Productos → Traslado de Productos: Un detalle pertenece a un traslado
    - Detalle de Traslado de Productos → Productos: Un detalle se refiere a un producto

19. **Empresas de Transporte**:
    - Empresas de Transporte → Envíos: Una empresa puede realizar múltiples envíos
    - Empresas de Transporte → Traslado de Productos: Una empresa puede realizar múltiples traslados

20. **Métodos de Pago**:
    - Métodos de Pago → Métodos de Pago de Usuario: Un método de pago puede ser utilizado por múltiples usuarios
    - Métodos de Pago → Pagos: Un método de pago puede ser utilizado en múltiples pagos

## TABLA DE RELACIONES

| Relaciones | Usuarios | Direcciones | Metodos_Pago_Usuario | Trabajadores | Sedes | Departamentos | Cargos | Productos | Inventario | Categorias | Imagenes | Orden_Compra | Detalle_Orden | Envios | Pagos | Devoluciones | Traslado_Productos | Detalle_Traslado_Productos | Empresas_Transporte | Metodos_Pago |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Usuarios |  | TIENE | TIENE | PUEDE SER |  |  |  |  |  |  |  | MULTIPLES |  |  |  |  |  |  |  |  |
| Direcciones | PERTENECE |  |  |  |  |  |  |  |  |  |  |  |  | MULTIPLES |  |  |  |  |  |  |
| Metodos_Pago_Usuario | PERTENECE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | TIPO |
| Trabajadores | ES |  |  |  | ASIGNADO | PERTENECE | TIENE |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Sedes |  |  |  | MULTIPLES |  |  |  |  | MULTIPLES |  |  |  |  |  |  |  | MULTIPLES |  |  |  |
| Departamentos |  |  |  | MULTIPLES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Cargos |  |  |  | PUEDE SER |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Productos |  |  |  |  |  |  |  |  | MULTIPLES | PERTENECE | MULTIPLES |  | MULTIPLES |  |  |  |  | MULTIPLES |  |  |
| Inventario |  |  |  |  | ASOCIADO |  |  | CORRESPONDE |  |  |  |  |  |  |  |  |  |  |  |  |
| Categorias |  |  |  |  |  |  |  | MULTIPLES |  |  |  |  |  |  |  |  |  |  |  |  |
| Imagenes |  |  |  |  |  |  |  | MULTIPLES |  |  |  |  |  |  |  |  |  |  |  |  |
| Orden_Compra | PERTENECE |  |  |  |  |  |  |  |  |  |  |  | MULTIPLES | TIENE | TIENE | MULTIPLES |  |  |  |  |
| Detalle_Orden |  |  |  |  |  |  |  | TIENE |  |  |  | PERTENECE |  |  |  |  |  |  |  |  |
| Envios |  | DIRIGE |  |  |  |  |  |  |  |  |  | ASOCIADO |  |  |  |  |  |  | REALIZA |  |
| Pagos |  |  |  |  |  |  |  |  |  |  |  | CORRESPONDE |  |  |  |  |  |  |  | UTILIZA |
| Devoluciones |  |  |  |  |  |  |  |  |  |  |  | ASOCIADO |  |  |  |  |  |  |  |  |
| Traslado_Productos |  |  |  |  | TIENE |  |  |  |  |  |  |  |  |  |  |  |  | MULTIPLES | LO REALIZA |  |
| Detalle_Traslado_Productos |  |  |  |  |  |  |  | REFIERE |  |  |  |  |  |  |  |  | PERTENECE |  |  |  |
| Empresas_Transporte |  |  |  |  |  |  |  |  |  |  |  |  |  | MULTIPLES |  |  | MULTIPLES |  |  |  |
| Metodos_Pago |  |  | UTILIZADO |  |  |  |  |  |  |  |  |  |  |  | MULTIPLES |  |  |  |  |  |

## Definicion teorica de tabla de cardinalidad

1. **Usuarios**:
   - Usuarios → Direcciones: 1:N (Un usuario puede tener muchas direcciones)
   - Usuarios → Métodos de Pago de Usuario: 1:N (Un usuario puede tener muchos métodos de pago)
   - Usuarios → Trabajadores: 1:1 (Un usuario puede ser un trabajador)
   - Usuarios → Órdenes de Compra: 1:N (Un usuario puede realizar muchas órdenes)

2. **Direcciones**:
   - Direcciones → Usuarios: N:1 (Muchas direcciones pertenecen a un usuario)
   - Direcciones → Envíos: 1:N (Una dirección puede ser destino de muchos envíos)

3. **Métodos de Pago de Usuario**:
   - Métodos de Pago de Usuario → Usuarios: N:1 (Muchos métodos de pago pertenecen a un usuario)
   - Métodos de Pago de Usuario → Métodos de Pago: N:1 (Muchos registros de pago de usuario pueden usar el mismo método de pago)

4. **Trabajadores**:
   - Trabajadores → Usuarios: 1:1 (Un trabajador es exactamente un usuario)
   - Trabajadores → Cargos: N:1 (Muchos trabajadores pueden tener el mismo cargo)
   - Trabajadores → Departamentos: N:1 (Muchos trabajadores pueden pertenecer al mismo departamento)
   - Trabajadores → Sedes: N:1 (Muchos trabajadores pueden estar asignados a la misma sede)

5. **Sedes**:
   - Sedes → Trabajadores: 1:N (Una sede puede tener muchos trabajadores)
   - Sedes → Inventario: 1:N (Una sede puede tener muchos registros de inventario)
   - Sedes → Traslado de Productos (origen): 1:N (Una sede puede ser origen de muchos traslados)
   - Sedes → Traslado de Productos (destino): 1:N (Una sede puede ser destino de muchos traslados)

6. **Departamentos**:
   - Departamentos → Trabajadores: 1:N (Un departamento puede tener muchos trabajadores)

7. **Cargos**:
   - Cargos → Trabajadores: 1:N (Un cargo puede ser asignado a muchos trabajadores)

8. **Productos**:
   - Productos → Categorías: N:1 (Muchos productos pueden pertenecer a una categoría)
   - Productos → Inventario: 1:N (Un producto puede estar en múltiples inventarios, uno por sede)
   - Productos → Imágenes: 1:N (Un producto puede tener muchas imágenes)
   - Productos → Detalle de Orden: 1:N (Un producto puede estar en muchos detalles de orden)
   - Productos → Detalle de Traslado de Productos: 1:N (Un producto puede estar en muchos detalles de traslado)

9. **Inventario**:
   - Inventario → Productos: N:1 (Muchos registros de inventario corresponden a diferentes productos)
   - Inventario → Sedes: N:1 (Muchos registros de inventario corresponden a diferentes sedes)

10. **Categorías**:
    - Categorías → Productos: 1:N (Una categoría puede tener muchos productos)

11. **Imágenes**:
    - Imágenes → Productos: N:1 (Muchas imágenes pueden pertenecer a un producto)

12. **Órdenes de Compra**:
    - Órdenes de Compra → Usuarios: N:1 (Muchas órdenes pertenecen a un usuario)
    - Órdenes de Compra → Detalle de Orden: 1:N (Una orden tiene muchos detalles)
    - Órdenes de Compra → Envíos: 1:N (Una orden puede tener varios envíos)
    - Órdenes de Compra → Pagos: 1:N (Una orden puede tener varios pagos)
    - Órdenes de Compra → Devoluciones: 1:N (Una orden puede tener varias devoluciones)

13. **Detalle de Orden**:
    - Detalle de Orden → Órdenes de Compra: N:1 (Muchos detalles pertenecen a una orden)
    - Detalle de Orden → Productos: N:1 (Muchos detalles se refieren a diferentes productos)

14. **Envíos**:
    - Envíos → Órdenes de Compra: N:1 (Muchos envíos están asociados a una orden)
    - Envíos → Direcciones: N:1 (Muchos envíos se dirigen a una dirección)
    - Envíos → Empresas de Transporte: N:1 (Muchos envíos son realizados por una empresa de transporte)

15. **Pagos**:
    - Pagos → Órdenes de Compra: N:1 (Muchos pagos corresponden a una orden)
    - Pagos → Métodos de Pago: N:1 (Muchos pagos utilizan un mismo método de pago)

16. **Devoluciones**:
    - Devoluciones → Órdenes de Compra: N:1 (Muchas devoluciones están asociadas a una orden)

17. **Traslado de Productos**:
    - Traslado de Productos → Sedes (origen): N:1 (Muchos traslados tienen la misma sede de origen)
    - Traslado de Productos → Sedes (destino): N:1 (Muchos traslados tienen la misma sede de destino)
    - Traslado de Productos → Empresas de Transporte: N:1 (Muchos traslados son realizados por una empresa de transporte)
    - Traslado de Productos → Detalle de Traslado de Productos: 1:N (Un traslado tiene muchos detalles)

18. **Detalle de Traslado de Productos**:
    - Detalle de Traslado de Productos → Traslado de Productos: N:1 (Muchos detalles pertenecen a un traslado)
    - Detalle de Traslado de Productos → Productos: N:1 (Muchos detalles se refieren a diferentes productos)

19. **Empresas de Transporte**:
    - Empresas de Transporte → Envíos: 1:N (Una empresa puede realizar muchos envíos)
    - Empresas de Transporte → Traslado de Productos: 1:N (Una empresa puede realizar muchos traslados)

20. **Métodos de Pago**:
    - Métodos de Pago → Métodos de Pago de Usuario: 1:N (Un método de pago puede ser utilizado por muchos usuarios)
    - Métodos de Pago → Pagos: 1:N (Un método de pago puede ser utilizado en muchos pagos)

## TABLA DE CARDINALIDAD

| Relaciones | Usuarios | Direcciones | Metodos_Pago_Usuario | Trabajadores | Sedes | Departamentos | Cargos | Productos | Inventario | Categorias | Imagenes | Orden_Compra | Detalle_Orden | Envios | Pagos | Devoluciones | Traslado_Productos | Detalle_Traslado_Productos | Empresas_Transporte | Metodos_Pago |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Usuarios |  | 1:N | 1:N | 1:1 |  |  |  |  |  |  |  | 1:N |  |  |  |  |  |  |  |  |
| Direcciones | N:1 |  |  |  |  |  |  |  |  |  |  |  |  | 1:N |  |  |  |  |  |  |
| Metodos_Pago_Usuario | N:1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | N:1 |
| Trabajadores | 1:1 |  |  |  | N:1 | N:1 | N:1 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Sedes |  |  |  | 1:N |  |  |  |  | 1:N |  |  |  |  |  |  |  | 1:N |  |  |  |
| Departamentos |  |  |  | 1:N |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Cargos |  |  |  | 1:N |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Productos |  |  |  |  |  |  |  |  | 1:N | N:1 | 1:N |  | 1:N |  |  |  |  | 1:N |  |  |
| Inventario |  |  |  |  | N:1 |  |  | N:1 |  |  |  |  |  |  |  |  |  |  |  |  |
| Categorias |  |  |  |  |  |  |  | 1:N |  |  |  |  |  |  |  |  |  |  |  |  |
| Imagenes |  |  |  |  |  |  |  | N:1 |  |  |  |  |  |  |  |  |  |  |  |  |
| Orden_Compra | N:1 |  |  |  |  |  |  |  |  |  |  |  | 1:N | 1:N | 1:N | 1:N |  |  |  |  |
| Detalle_Orden |  |  |  |  |  |  |  | N:1 |  |  |  | N:1 |  |  |  |  |  |  |  |  |
| Envios |  | N:1 |  |  |  |  |  |  |  |  |  | N:1 |  |  |  |  |  |  | N:1 |  |
| Pagos |  |  |  |  |  |  |  |  |  |  |  | N:1 |  |  |  |  |  |  |  | N:1 |
| Devoluciones |  |  |  |  |  |  |  |  |  |  |  | N:1 |  |  |  |  |  |  |  |  |
| Traslado_Productos |  |  |  |  | N:1 |  |  |  |  |  |  |  |  |  |  |  |  | 1:N | N:1 |  |
| Detalle_Traslado_Productos |  |  |  |  |  |  |  | N:1 |  |  |  |  |  |  |  |  | N:1 |  |  |  |
| Empresas_Transporte |  |  |  |  |  |  |  |  |  |  |  |  |  | 1:N |  |  | 1:N |  |  |  |
| Metodos_Pago |  |  | 1:N |  |  |  |  |  |  |  |  |  |  |  | 1:N |  |  |  |  |  |

![Diagrama de Relaciones](/Documentacion/Relational1.jpg)

# Esquema Fisico
DROP TABLE DETALLE_TRASLADO_PRODUCTOS CASCADE CONSTRAINTS;
DROP TABLE TRASLADO_PRODUCTOS CASCADE CONSTRAINTS;
DROP TABLE DEVOLUCIONES CASCADE CONSTRAINTS;
DROP TABLE ENVIOS CASCADE CONSTRAINTS;
DROP TABLE EMPRESAS_TRANSPORTE CASCADE CONSTRAINTS;
DROP TABLE PAGOS CASCADE CONSTRAINTS;
DROP TABLE DETALLE_ORDEN CASCADE CONSTRAINTS;
DROP TABLE ORDEN_COMPRA CASCADE CONSTRAINTS;
DROP TABLE IMAGENES CASCADE CONSTRAINTS;
DROP TABLE INVENTARIO CASCADE CONSTRAINTS;
DROP TABLE PRODUCTOS CASCADE CONSTRAINTS;
DROP TABLE CATEGORIAS CASCADE CONSTRAINTS;
DROP TABLE TRABAJADORES CASCADE CONSTRAINTS;
DROP TABLE SEDES CASCADE CONSTRAINTS;
DROP TABLE CARGOS CASCADE CONSTRAINTS;
DROP TABLE DEPARTAMENTOS CASCADE CONSTRAINTS;
DROP TABLE METODOS_PAGO_USUARIO CASCADE CONSTRAINTS;
DROP TABLE METODOS_PAGO CASCADE CONSTRAINTS;
DROP TABLE DIRECCIONES CASCADE CONSTRAINTS;
DROP TABLE USUARIOS CASCADE CONSTRAINTS;

-- Tabla Usuarios
CREATE TABLE usuarios (
    Id_Usuario NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Rol VARCHAR2(20) NOT NULL CHECK (Rol IN ('Cliente', 'Trabajador')),
    Identificacion_Nacional VARCHAR2(50) UNIQUE NOT NULL,
    Nombre VARCHAR2(100) NOT NULL,
    Apellido VARCHAR2(100) NOT NULL,
    Correo VARCHAR2(150) UNIQUE NOT NULL,
    Contrasena VARCHAR2(255) NOT NULL,
    Telefono VARCHAR2(20) NOT NULL,
    Estado VARCHAR2(20) DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    Fecha_Registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Estado_Correo VARCHAR2(20) DEFAULT 'No Confirmado' CHECK (Estado_Correo IN ('Confirmado', 'No Confirmado')),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verificación de creación
SELECT table_name FROM user_tables WHERE table_name = 'USUARIOS';

-- Tabla Departamentos (sin dependencias)
CREATE TABLE departamentos (
    Id_Departamento NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(100) UNIQUE NOT NULL,
    Descripcion CLOB,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Cargos (sin dependencias)
CREATE TABLE cargos (
    Id_Cargo NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(100) UNIQUE NOT NULL,
    Descripcion CLOB,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Sedes (sin dependencias)
CREATE TABLE sedes (
    Id_Sede NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(100) NOT NULL,
    Direccion CLOB NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Categorias (sin dependencias)
CREATE TABLE categorias (
    Id_Categoria NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(255) NOT NULL,
    Descripcion CLOB,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Métodos de Pago (sin dependencias)
CREATE TABLE metodos_pago (
    Id_Metodo_Pago NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(100) NOT NULL,
    Descripcion CLOB,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Empresas_Transporte (sin dependencias)
CREATE TABLE empresas_transporte (
    Id_Empresa_Transporte NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(255) NOT NULL,
    Informacion_Contacto CLOB NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Direcciones (depende de usuarios)
CREATE TABLE direcciones (
    Id_Direccion NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Usuario NUMBER NOT NULL,
    Direccion CLOB NOT NULL,
    Tipo VARCHAR2(20) NOT NULL CHECK (Tipo IN ('Envío', 'Facturación')),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dir_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuarios(Id_Usuario)
);

-- Tabla Trabajadores (depende de usuarios, cargos, departamentos, sedes)
CREATE TABLE trabajadores (
    Id_Trabajador NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Usuario NUMBER NOT NULL,
    Id_Cargo NUMBER,
    Id_Departamento NUMBER,
    Correo_Institucional VARCHAR2(150) UNIQUE NOT NULL,
    Id_Sede NUMBER,
    Estado VARCHAR2(20) DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_trab_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuarios(Id_Usuario),
    CONSTRAINT fk_trab_cargo FOREIGN KEY (Id_Cargo) REFERENCES cargos(Id_Cargo),
    CONSTRAINT fk_trab_departamento FOREIGN KEY (Id_Departamento) REFERENCES departamentos(Id_Departamento),
    CONSTRAINT fk_trab_sede FOREIGN KEY (Id_Sede) REFERENCES sedes(Id_Sede)
);

-- Tabla Métodos de Pago de Usuario (depende de usuarios, metodos_pago)
CREATE TABLE metodos_pago_usuario (
    Id_Metodo_Pago_Usuario NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Usuario NUMBER NOT NULL,
    Id_Metodo_Pago NUMBER NOT NULL,
    Detalles CLOB,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mpu_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuarios(Id_Usuario),
    CONSTRAINT fk_mpu_metodo FOREIGN KEY (Id_Metodo_Pago) REFERENCES metodos_pago(Id_Metodo_Pago)
);

-- Tabla Productos (depende de categorias)
CREATE TABLE productos (
    Id_Producto NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Sku VARCHAR2(50) UNIQUE NOT NULL,
    Nombre VARCHAR2(255) NOT NULL,
    Descripcion CLOB,
    Precio NUMBER(10,2) NOT NULL,
    Slug VARCHAR2(255) UNIQUE NOT NULL,
    Id_Categoria NUMBER NOT NULL,
    Disponibilidad NUMBER(1) DEFAULT 1 CHECK (Disponibilidad IN (0, 1)),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prod_categoria FOREIGN KEY (Id_Categoria) REFERENCES categorias(Id_Categoria)
);

-- Tabla Inventario (depende de productos, sedes)
CREATE TABLE inventario (
    Id_Inventario NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Producto NUMBER NOT NULL,
    Id_Sede NUMBER NOT NULL,
    Cantidad NUMBER DEFAULT 0,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_inv_producto FOREIGN KEY (Id_Producto) REFERENCES productos(Id_Producto),
    CONSTRAINT fk_inv_sede FOREIGN KEY (Id_Sede) REFERENCES sedes(Id_Sede)
);

-- Tabla Imagenes (depende de productos)
CREATE TABLE imagenes (
    Id_Imagen NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Producto NUMBER NOT NULL,
    Url_Imagen CLOB NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_img_producto FOREIGN KEY (Id_Producto) REFERENCES productos(Id_Producto)
);

-- Tabla Orden_Compra (depende de usuarios)
CREATE TABLE orden_compra (
    Id_Orden NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Usuario NUMBER NOT NULL,
    Fecha_Creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Estado VARCHAR2(50) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orden_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuarios(Id_Usuario)
);

-- Tabla Detalle_Orden (depende de orden_compra, productos)
CREATE TABLE detalle_orden (
    Id_Detalle NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Orden NUMBER NOT NULL,
    Id_Producto NUMBER NOT NULL,
    Cantidad NUMBER NOT NULL,
    Precio_Unitario NUMBER(10,2) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_detalle_orden FOREIGN KEY (Id_Orden) REFERENCES orden_compra(Id_Orden),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (Id_Producto) REFERENCES productos(Id_Producto)
);

-- Tabla Pagos (depende de orden_compra, metodos_pago)
CREATE TABLE pagos (
    Id_Pago NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Orden NUMBER NOT NULL,
    Fecha_Transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Id_Metodo_Pago NUMBER NOT NULL,
    Estado VARCHAR2(50) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pago_orden FOREIGN KEY (Id_Orden) REFERENCES orden_compra(Id_Orden),
    CONSTRAINT fk_pago_metodo FOREIGN KEY (Id_Metodo_Pago) REFERENCES metodos_pago(Id_Metodo_Pago)
);

-- Tabla Envios (depende de orden_compra, direcciones, empresas_transporte)
CREATE TABLE envios (
    Id_Envio NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Orden NUMBER NOT NULL,
    Fecha_Despacho TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Id_Direccion NUMBER NOT NULL,
    Id_Empresa_Transporte NUMBER NOT NULL,
    Numero_Seguimiento VARCHAR2(255) UNIQUE NOT NULL,
    Estado VARCHAR2(50) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_envio_orden FOREIGN KEY (Id_Orden) REFERENCES orden_compra(Id_Orden),
    CONSTRAINT fk_envio_direccion FOREIGN KEY (Id_Direccion) REFERENCES direcciones(Id_Direccion),
    CONSTRAINT fk_envio_transporte FOREIGN KEY (Id_Empresa_Transporte) REFERENCES empresas_transporte(Id_Empresa_Transporte)
);

-- Tabla Devoluciones (depende de orden_compra)
CREATE TABLE devoluciones (
    Id_Devolucion NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Orden NUMBER NOT NULL,
    Fecha_Solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Motivo CLOB NOT NULL,
    Estado VARCHAR2(50) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_devolucion_orden FOREIGN KEY (Id_Orden) REFERENCES orden_compra(Id_Orden)
);

-- Tabla Traslado_Productos (depende de sedes, empresas_transporte)
CREATE TABLE traslado_productos (
    Id_Traslado NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Fecha_Movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Id_Sede_Origen NUMBER NOT NULL,
    Id_Sede_Destino NUMBER NOT NULL,
    Estado VARCHAR2(50) NOT NULL,
    Fecha_Estimada_Llegada TIMESTAMP,
    Id_Empresa_Transporte NUMBER NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_traslado_origen FOREIGN KEY (Id_Sede_Origen) REFERENCES sedes(Id_Sede),
    CONSTRAINT fk_traslado_destino FOREIGN KEY (Id_Sede_Destino) REFERENCES sedes(Id_Sede),
    CONSTRAINT fk_traslado_transporte FOREIGN KEY (Id_Empresa_Transporte) REFERENCES empresas_transporte(Id_Empresa_Transporte)
);

-- Tabla Detalle_Traslado_Productos (depende de traslado_productos, productos)
CREATE TABLE detalle_traslado_productos (
    Id_Detalle_Traslado NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    Id_Traslado NUMBER NOT NULL,
    Id_Producto NUMBER NOT NULL,
    Cantidad_Transferida NUMBER NOT NULL,
    Estado_Producto VARCHAR2(50) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dtp_traslado FOREIGN KEY (Id_Traslado) REFERENCES traslado_productos(Id_Traslado),
    CONSTRAINT fk_dtp_producto FOREIGN KEY (Id_Producto) REFERENCES productos(Id_Producto)
);

-- Verificar que todas las tablas fueron creadas
SELECT table_name FROM user_tables 
WHERE table_name IN (
    'USUARIOS', 'DIRECCIONES', 'METODOS_PAGO', 'METODOS_PAGO_USUARIO',
    'DEPARTAMENTOS', 'CARGOS', 'SEDES', 'TRABAJADORES',
    'CATEGORIAS', 'PRODUCTOS', 'INVENTARIO', 'IMAGENES',
    'ORDEN_COMPRA', 'DETALLE_ORDEN', 'PAGOS', 'EMPRESAS_TRANSPORTE',
    'ENVIOS', 'DEVOLUCIONES', 'TRASLADO_PRODUCTOS', 'DETALLE_TRASLADO_PRODUCTOS'
);