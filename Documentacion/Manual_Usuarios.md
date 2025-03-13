# Sistema de Base de Datos 1

# B

## PROYECTO 1

### Primer Semestre 2025

```js
Universidad San Carlos de Guatemala

Programador:    Pablo Andres Rodriguez Lima 202201947

```


## El proyecto consiste en la creación de una API RESTful para una tienda en línea. La API permite a los usuarios registrarse, iniciar sesión, ver su perfil, actualizar su perfil, eliminar su perfil, ver productos, ver un producto específico, crear un producto, actualizar un producto, eliminar un producto, ver todas las órdenes, ver una orden específica, crear una orden, actualizar una orden, ver todos los pagos, ver un pago específico, crear un pago, actualizar un pago y eliminar un pago.


## Objetivos
- Crear una API RESTful para una tienda en línea
- Permitir a los usuarios registrarse, iniciar sesión, ver su perfil, actualizar su perfil, eliminar su perfil
- Permitir a los usuarios ver productos, ver un producto específico, crear un producto, actualizar un producto, eliminar un producto
- Permitir a los usuarios ver todas las órdenes, ver una orden específica, crear una orden, actualizar una orden


## Tecnologías
    - Node.js
    - Express.js
    - MySQL
    - JWT
    - Bcrypt

## Instalación
```
npm install
```

## Ejecución
Backend
```
npm start
```
Dockers
```
docker start oracle-xe
```

## Endpoints

POST /api/users - Crear un usuario
Este endpoint permite a los usuarios registrarse en la aplicación.
## POST /api/users
```
http://localhost:3000/api/users
```
{
  "Rol": "Cliente",
  "Identificacion_Nacional": "321654987",
  "Nombre": "Prueba1",
  "Apellido": "Apellido2",
  "Correo": "Prueba@gmail.com",
  "Contrasena": "123654",
  "Telefono": "12345678"
}
{
  "status": "success",
  "message": "User created successfully",
  "userId": 11
}

POST /api/login - Iniciar sesión
Este endpoint permite a los usuarios iniciar sesión en la aplicación.
## POST /api/login
```
http://localhost:3000/api/login
```
{
  "Correo": "Prueba@gmail.com",
  "Contrasena": "123654"
}
{
  "status": "success",
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJyb2xlIjoiQ2xpZW50ZSIsImlhdCI6MTc0MTg0MDA3NCwiZXhwIjoxNzQxOTI2NDc0fQ.d3lsUWASlCDii3OCcOdJYYqwhV859OQI_v8HnZmWPWw",
  "user": {
    "id": 11,
    "nombre": "Prueba1",
    "apellido": "Apellido2",
    "correo": "Prueba@gmail.com",
    "rol": "Cliente"
  }
}

GET /api/profile - Ver perfil
Este endpoint permite a los usuarios ver su perfil.
## GET /api/profile
```
http://localhost:3000/api/profile
```
Bearer Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJyb2xlIjoiQ2xpZW50ZSIsImlhdCI6MTc0MTg0MDA3NCwiZXhwIjoxNzQxOTI2NDc0fQ.d3lsUWASlCDii3OCcOdJYYqwhV859OQI_v8HnZmWPWw
{
  "id": 11,
  "nombre": "Prueba1",
  "apellido": "Apellido2",
  "correo": "Prueba@gmail.com",
  "telefono": "12345678"
}

PUT /api/profile - Actualizar perfil
Este endpoint permite a los usuarios actualizar su perfil.
## PUT /api/users/11
```
http://localhost:3000/api/users/11
```
{
  "Telefono": "1234567890",
  "Correo": "nuevo_correo@ejemplo.com",
  "Nombre": "Andres",
  "Apellido": "Galvez",
  "Estado": "Inactivo"
}
{
  "status": "success",
  "message": "Usuario actualizado exitosamente"
}

DELETE /api/users/11 - Eliminar usuario
Este endpoint permite a los usuarios eliminar su perfil.
## DELETE /api/users/11
```
http://localhost:3000/api/users/11
```
{
  "status": "success",
  "message": "Usuario eliminado exitosamente"
}

POST /api/categories - Crear una categoría
Este endpoint permite a los usuarios crear una categoría.
## POST /api/categories
```
http://localhost:3000/api/categories
```
{
  "Nombre": "Electrónicos"
}
{
  "status": "success",
  "message": "Categoría creada exitosamente",
  "categoryId": 11
}

POST /api/products - Crear un producto
Este endpoint permite a los usuarios crear un producto.
## POST /api/products
```
http://localhost:3000/api/products
```
{
    "Sku": "123ABS",
    "Nombre": "Laptop t",
    "Descripcion": "Laptop de alto rendimiento",
    "Precio": 780.00,
    "Slug": "laptop-2",
    "Id_Categoria": 1,
    "Disponibilidad": 1
}
{
  "status": "success",
  "message": "Producto creado exitosamente",
  "productId": 11
}

GET /api/products - Ver productos
Este endpoint permite a los usuarios ver todos los productos.
## GET /api/products
```
http://localhost:3000/api/products
```
{
  "status": "success",
  "products": [
    {
      "id": 1,
      "name": "Smartphone XYZ",
      "price": 599.99,
      "stock": 1
    },
    {
      "id": 2,
      "name": "Chaqueta de Cuero",
      "price": 129.99,
      "stock": 1
    },
    {
      "id": 3,
      "name": "Aspiradora 3000",
      "price": 199.99,
      "stock": 1
    },
    {
      "id": 4,
      "name": "Bicicleta Montaña",
      "price": 349.99,
      "stock": 1
    },
    {
      "id": 5,
      "name": "Lego Star Set",
      "price": 89.99,
      "stock": 1
    },
    {
      "id": 6,
      "name": "Vitaminas C+Zinc",
      "price": 19.99,
      "stock": 1
    },
    {
      "id": 7,
      "name": "Batería de Auto",
      "price": 159.99,
      "stock": 1
    },
    {
      "id": 8,
      "name": "Café Premium",
      "price": 24.99,
      "stock": 1
    },
    {
      "id": 9,
      "name": "Libro de Ciencia",
      "price": 39.99,
      "stock": 1
    },
    {
      "id": 10,
      "name": "Collar para Perro",
      "price": 14.99,
      "stock": 1
    },
    {
      "id": 11,
      "name": "Laptop t",
      "price": 780,
      "stock": 1
    }
  ]
}

GET /api/products/11 - Ver producto
Este endpoint permite a los usuarios ver un producto específico.
## GET /api/products/11
```
http://localhost:3000/api/products/11
```
{
  "status": "success",
  "product": {
    "id": 11,
    "name": "Laptop t",
    "price": 780,
    "stock": 1
  }
}

PUT /api/products/11 - Actualizar producto
Este endpoint permite a los usuarios actualizar un producto.
## PUT /api/products/11
```
http://localhost:3000/api/products/11
```
{
  "Precio": 800.00,
  "Stock": 15
}
{
  "status": "success",
  "message": "Producto actualizado exitosamente"
}

DELETE /api/products/11 - Eliminar producto
Este endpoint permite a los usuarios eliminar un producto.
## DELETE /api/products/11
```
http://localhost:3000/api/products/11
```
{
  "status": "success",
  "message": "Producto eliminado exitosamente"
}

POST /api/orders - Crear una orden
Este endpoint permite a los usuarios crear una orden.
## POST /api/orders
```
http://localhost:3000/api/orders
```
{
  "Id_Usuario": 1,
  "Id_Producto": 1,
  "Cantidad": 1,
  "Precio": 599.99
}
{
  "status": "success",
  "message": "Orden creada exitosamente",
  "orderId": 11
}

GET /api/orders - Ver órdenes
Este endpoint permite a los usuarios ver todas las órdenes.
## GET /api/orders
```
http://localhost:3000/api/orders
```
{
  "userId": 10,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "shippingAddress": "Calle 123, Ciudad",
  "paymentMethod": "credit_card"
}

GET /api/orders/11 - Ver orden
Este endpoint permite a los usuarios ver una orden específica.
## GET /api/orders/11
```
http://localhost:3000/api/orders
```
{
  "orders": [
    {
      "orderId": 11,
      "userId": 10,
      "totalAmount": "1329.97",
      "status": "processing",
      "createdAt": "2025-03-13"
    },
    {
      "orderId": 9,
      "userId": 9,
      "totalAmount": "74.95",
      "status": "En Proceso",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 8,
      "userId": 8,
      "totalAmount": "39.99",
      "status": "Cancelada",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 7,
      "userId": 7,
      "totalAmount": "49.98",
      "status": "Pendiente",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 6,
      "userId": 6,
      "totalAmount": "159.99",
      "status": "Completada",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 5,
      "userId": 5,
      "totalAmount": "79.96",
      "status": "En Proceso",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 4,
      "userId": 4,
      "totalAmount": "349.99",
      "status": "Pendiente",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 3,
      "userId": 3,
      "totalAmount": "269.97",
      "status": "Cancelada",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 2,
      "userId": 2,
      "totalAmount": "129.99",
      "status": "Completada",
      "createdAt": "2025-03-12"
    },
    {
      "orderId": 1,
      "userId": 1,
      "totalAmount": "999.97",
      "status": "Pendiente",
      "createdAt": "2025-03-12"
    }
  ]
}

PUT /api/orders/11 - Actualizar orden
Este endpoint permite a los usuarios actualizar una orden.
## PUT /api/orders/11
```
http://localhost:3000/api/orders/11
```
{
  "status": "shipped"
}
{
  "status": "success",
  "message": "Order updated successfully",
  "orderId": "2",
  "newStatus": "shipped"
}

POST /api/payments - Crear un pago
Este endpoint permite a los usuarios crear un pago.
## POST /api/payments
```
http://localhost:3000/api/payments
```
{
  "orderId": 2, 
"amount": 129.99, 
"method": "credit_card" 
} 
{
  "status": "success",
  "message": "Payment registered successfully",
  "paymentId": 11,
  "paymentStatus": "approved",
  "orderId": 2,
  "amount": "129.99"
}

GET /api/payments - Ver pagos
Este endpoint permite a los usuarios ver todos los pagos.
## GET /api/payments
```
http://localhost:3000/api/payments
```
{
  "payments": [
    {
      "paymentId": 11,
      "orderId": 2,
      "amount": "129.99",
      "method": "credit_card",
      "status": "approved",
      "createdAt": "2025-03-13T04:56:41.842Z"
    },
    {
      "paymentId": 9,
      "orderId": 9,
      "amount": "74.95",
      "method": "PayPal",
      "status": "Pendiente",
      "createdAt": "2025-03-12T04:11:17.202Z"
    },
    {
      "paymentId": 8,
      "orderId": 8,
      "amount": "39.99",
      "method": "Tarjeta de Débito",
      "status": "Aprobado",
      "createdAt": "2025-03-12T04:11:17.193Z"
    },
    {
      "paymentId": 7,
      "orderId": 7,
      "amount": "49.98",
      "method": "Tarjeta de Crédito",
      "status": "Rechazado",
      "createdAt": "2025-03-12T04:11:17.189Z"
    },
    {
      "paymentId": 6,
      "orderId": 6,
      "amount": "159.99",
      "method": "PayPal",
      "status": "Aprobado",
      "createdAt": "2025-03-12T04:11:17.183Z"
    },
    {
      "paymentId": 5,
      "orderId": 5,
      "amount": "79.96",
      "method": "Tarjeta de Débito",
      "status": "Pendiente",
      "createdAt": "2025-03-12T04:11:17.176Z"
    },
    {
      "paymentId": 4,
      "orderId": 4,
      "amount": "349.99",
      "method": "Tarjeta de Crédito",
      "status": "Aprobado",
      "createdAt": "2025-03-12T04:11:17.171Z"
    },
    {
      "paymentId": 3,
      "orderId": 3,
      "amount": "269.97",
      "method": "PayPal",
      "status": "Rechazado",
      "createdAt": "2025-03-12T04:11:17.165Z"
    },
    {
      "paymentId": 2,
      "orderId": 2,
      "amount": "129.99",
      "method": "Tarjeta de Débito",
      "status": "Pendiente",
      "createdAt": "2025-03-12T04:11:17.158Z"
    },
    {
      "paymentId": 1,
      "orderId": 1,
      "amount": "999.97",
      "method": "Tarjeta de Crédito",
      "status": "Aprobado",
      "createdAt": "2025-03-12T04:11:17.148Z"
    }
  ]
}