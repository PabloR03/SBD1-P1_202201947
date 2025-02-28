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


