# Fases de Normalización

Entidades a utilizar:

```markdown
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

```

## 1 Forma normal

Aplicando principios de normalización, se asegura que no haya duplicación de datos y que cada celda contenga un solo valor, lo que facilita las operaciones de búsqueda, inserción, actualización y eliminación de datos.

Usuarios

- Id_Usuario(PK)
- Rol (Cliente, Trabajador, etc.)
- Cui
- Nombre
- Apellido
- Correo
- Telefono
- Estado (Activo o Inactivo)
- Fecha_Registro
- Estado_Correo (Confirmado o No Confirmado)
- Direccion
- Metodo_Pago
- Created_At
- Updated_At

| Id_Usuario (PK) | Rol | Cui | Nombre | Apellido | Correo | Telefono | Estado | Fecha_Registro | Estado_Correo | Direccion | Metodo_Pago | Created_At | Updated_At |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 001 | Cliente | 1234567890123 | Juan | Pérez | juan.perez@email.com | 55123456 | Activo | 2024-01-15 | Confirmado | Zona 10, Ciudad de Guatemala | Tarjeta | 2024-01-15 10:30:00 | 2024-02-20 14:45:00 |
| 002 | Trabajador | 9876543210123 | María | González | maria.gonzalez@empresa.com | 42789123 | Activo | 2023-11-05 | Confirmado | Zona 4, Ciudad de Guatemala | Transferencia | 2023-11-05 09:15:00 | 2024-01-30 11:20:00 |

Trabajadores 

- Id_Trabajador (PK)
- Cui
- Nombre
- Apellido
- Cargo
- Departamento
- Telefono
- Correo_Institucional
- Id_Sede (FK, referencia a la sede donde trabaja)
- Estado (Activo o Inactivo)
- Created_At
- Updated_At

| Id_Trabajador (PK) | Cui | Nombre | Apellido | Cargo | Departamento | Telefono | Correo_Institucional | Id_Sede (FK) | Estado | Created_At | Updated_At |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T001 | 9876543210123 | Carlos | Ramírez | Vendedor | Ventas | 54321678 | carlos.ramirez@empresa.com | S001 | Activo | 2023-10-15 08:30:00 | 2024-01-20 16:45:00 |
| T002 | 4567891230123 | Ana | López | Gerente | Administración | 58769432 | ana.lopez@empresa.com | S002 | Activo | 2023-08-10 09:15:00 | 2024-02-05 10:30:00 |

Sedes

- Id_Sede (PK)
- Nombre
- Direccion
- Created_At
- Updated_At

| Id_Sede (PK) | Nombre | Direccion | Created_At | Updated_At |
| --- | --- | --- | --- | --- |
| S001 | Sede Central | Zona 10, Ciudad de Guatemala | 2023-01-15 08:00:00 | 2024-01-10 14:30:00 |
| S002 | Sede Norte | Zona 4, Quetzaltenango | 2023-05-20 10:15:00 | 2023-12-05 09:45:00 |

Productos

- Id_Producto (PK)
- Sku
- Nombre
- Descripcion
- Precio
- Slug
- Cantidad_Inventario
- Categoria
- Disponibilidad (Activo o No)
- Id_Imagen (FK, referencia a Imágenes)
- Created_At
- Updated_At

| Id_Producto (PK) | Sku | Nombre | Descripcion | Precio | Slug | Cantidad_Inventario | Id_Categoria (FK) | Disponibilidad | Id_Imagen (FK) | Created_At | Updated_At |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P001 | LAP-HP-15 | Laptop HP 15 | Laptop HP 15.6" Core i5 8GB RAM 512GB SSD | 4999.99 | laptop-hp-15 | 25 | C001 | Activo | IMG001 | 2024-01-10 09:30:00 | 2024-02-15 14:20:00 |
| P002 | CEL-SAM-A54 | Samsung Galaxy A54 | Smartphone Samsung Galaxy A54 128GB 8GB RAM | 2799.99 | samsung-galaxy-a54 | 42 | C002 | Activo | IMG002 | 2024-01-15 10:45:00 | 2024-02-20 11:30:00 |

Orden

- **Id_Orden (PK)**
- **Id_Usuario (FK, referencia a Usuarios)**
- **Id_Departamento (FK, referencia a Departamentos)**
- **Id_Metodo_Pago (FK, referencia a Metodos_Pago)**
- **Created_At**
- **Updated_At**

| Id_Orden (PK) | Id_Usuario (FK) | Id_Departamento (FK) | Id_Metodo_Pago (FK) | Created_At           | Updated_At           |
|--------------|---------------|---------------------|-------------------|----------------------|----------------------|
| 1001        | 001           | 5                   | 2                 | 2024-02-15 08:45:00  | 2024-02-16 10:00:00  |
| 1002        | 002           | 3                   | 1                 | 2024-02-18 14:20:00  | 2024-02-19 09:30:00  |

Pagos

- **Id_Pago (PK)**
- **Id_Usuario (FK, referencia a Usuarios)**
- **Id_Metodo_Pago (FK, referencia a Metodo_Pago)** (Tarjeta, Transferencia, etc.)
- **Monto_Total**
- **Estado** (Pendiente, Aprobado, Rechazado)
- **Created_At**
- **Updated_At**

| Id_Pago (PK) | Id_Usuario (FK) | Id_Metodo_Pago (FK) | Monto_Total | Estado     | Created_At           | Updated_At           |
|-------------|---------------|------------------|------------|-----------|----------------------|----------------------|
| 5001        | 001           | 2 (Tarjeta)      | 250.75     | Aprobado  | 2024-02-15 10:00:00  | 2024-02-15 10:30:00  |
| 5002        | 002           | 1 (Transferencia)| 100.00     | Pendiente | 2024-02-18 12:20:00  | 2024-02-18 12:45:00  |
| 5003        | 001           | 3 (Efectivo)     | 75.50      | Rechazado | 2024-02-19 14:40:00  | 2024-02-19 15:10:00  |


Envios

- **Id_Envio (PK)**
- **Id_Orden (FK, referencia a Orden)**
- **Fecha_Despacho**
- **Direccion_Entrega**
- **Empresa_Transporte**
- **Numero_Seguimiento**
- **Estado** (En tránsito, Entregado, Devuelto)
- **Created_At**
- **Updated_At**

| Id_Envio (PK) | Id_Orden (FK) | Fecha_Despacho     | Direccion_Entrega           | Empresa_Transporte | Numero_Seguimiento | Estado       | Created_At           | Updated_At           |
|--------------|--------------|-------------------|---------------------------|-------------------|-------------------|-------------|----------------------|----------------------|
| 7001        | 1001         | 2024-02-16        | Zona 10, Ciudad de Guatemala | DHL               | TRK123456789      | En tránsito | 2024-02-16 08:00:00  | 2024-02-16 12:30:00  |
| 7002        | 1002         | 2024-02-19        | Zona 4, Ciudad de Guatemala  | FedEx             | TRK987654321      | Entregado   | 2024-02-19 10:15:00  | 2024-02-20 09:45:00  |
| 7003        | 1001         | 2024-02-21        | Zona 7, Ciudad de Guatemala  | UPS               | TRK567890123      | Devuelto    | 2024-02-21 14:20:00  | 2024-02-22 11:00:00  |

Devoluciones

- **Id_Devolucion (PK)**
- **Id_Orden (FK, referencia a Orden)**
- **Fecha_Solicitud**
- **Motivo**
- **Estado** (En revisión, Aprobada, Rechazada)
- **Id_Producto (FK, referencia a Producto)**
- **Created_At**
- **Updated_At**

| Id_Devolucion (PK) | Id_Orden (FK) | Fecha_Solicitud | Motivo                | Estado      | Id_Producto (FK) | Created_At           | Updated_At           |
|--------------------|--------------|----------------|----------------------|------------|----------------|----------------------|----------------------|
| 9001              | 1001         | 2024-02-20     | Producto defectuoso  | En revisión | 3005           | 2024-02-20 10:15:00  | 2024-02-20 12:00:00  |
| 9002              | 1002         | 2024-02-22     | No era lo esperado   | Aprobada    | 3010           | 2024-02-22 14:30:00  | 2024-02-23 09:45:00  |
| 9003              | 1003         | 2024-02-25     | Pedido incorrecto    | Rechazada   | 3020           | 2024-02-25 16:40:00  | 2024-02-26 08:20:00  |

Traslado_Productos

- **Id_Traslado (PK)**

- **Fecha_Movimiento**
- **Id_Almacen_Origen (FK, referencia a Sedes)**
- **Id_Almacen_Destino (FK, referencia a Sedes)**
- **Id_Producto (FK)**
- **Cantidad_Transferida**
- **Estado** (Pendiente, En tránsito, Completado, Cancelado)
- **Fecha_Estimada_Llegada**
- **Created_At**
- **Updated_At**

| Id_Traslado (PK) | Fecha_Movimiento | Id_Almacen_Origen (FK) | Id_Almacen_Destino (FK) | Id_Producto (FK) | Cantidad_Transferida | Estado      | Fecha_Estimada_Llegada | Created_At           | Updated_At           |
|------------------|-----------------|-----------------------|-----------------------|----------------|-------------------|------------|---------------------|----------------------|----------------------|
| 8001            | 2024-02-15       | 101                   | 202                   | 3005           | 50                | En tránsito | 2024-02-17         | 2024-02-15 08:00:00  | 2024-02-16 12:30:00  |
| 8002            | 2024-02-18       | 102                   | 203                   | 3010           | 30                | Completado | 2024-02-19         | 2024-02-18 10:15:00  | 2024-02-19 09:45:00  |
| 8003            | 2024-02-20       | 103                   | 204                   | 3020           | 20                | Pendiente  | 2024-02-22         | 2024-02-20 14:40:00  | 2024-02-21 08:20:00  |


## 2 Forma normal

Para cumplir con la segunda forma normal, se deben cumplir con los siguientes requisitos:
debe estar en la primera forma normal, no debe haber dependencias parciales y todos los atributos no clave deben depender de la clave primaria.

Normalización de la tabla Usuarios:

- Se extrajo el campo "Direccion" para crear una tabla independiente llamada "Direcciones".
- Se extrajo el campo "Metodo_Pago" para crear una relación con la tabla "Metodos_Pago_Usuario".

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

## Esquema de base de datos en Tercera Forma Normal (3FN)

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

Se creó una nueva entidad llamada Empresas_Transporte para almacenar la información relacionada con las empresas que realizan el transporte de productos. Esta tabla incluye un identificador único, el nombre de la empresa y la información de contacto, evitando así la repetición de estos datos en la tabla de traslados.

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