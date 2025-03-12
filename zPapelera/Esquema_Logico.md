# DESCRIPCION DEL ESQUEMA LÓGICO

## Entidades

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
    Id_Usuario (FK)
    Id_Cargo (FK, referencia a Cargos)
    Id_Departamento (FK, referencia a Departamentos)
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

### Empresas_Transporte
    Id_Empresa_Transporte (PK)
    Nombre
    Informacion_Contacto
    Created_At
    Updated_At

### Metodos_Pago
    Id_Metodo_Pago (PK)
    Nombre
    Descripcion
    Created_At
    Updated_At

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