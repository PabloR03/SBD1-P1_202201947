# DESCRIPCIÓN DE TABLAS

## Tablas y Descripciones

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

---