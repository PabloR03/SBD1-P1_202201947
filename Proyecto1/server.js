const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

    // Configurar middleware
    app.use(cors());
    app.use(express.json());

    // Definir puerto
    const PORT = process.env.PORT || 3000;

    // Rutas API
    app.use('/api', apiRoutes);

    // Ruta raíz
    app.get('/', (req, res) => {
    res.json({ message: 'API de Oracle funcionando!' });
    });

    // Middleware para manejo de errores
    app.use(errorHandler);

    // Iniciar servidor
    async function startServer() {
    try {
        // Inicializar la conexión a la base de datos
        await db.initialize();
        
        app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
        console.log(`Endpoint de registro: http://localhost:${PORT}/api/users`);
        });
        
        // Manejar el cierre del servidor
        process.on('SIGINT', async () => {
        try {
            await db.close();
            console.log('Aplicación cerrada correctamente');
            process.exit(0);
        } catch (err) {
            console.error('Error al cerrar la aplicación:', err);
            process.exit(1);
        }
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor:', err);
        process.exit(1);
    }
}

startServer();