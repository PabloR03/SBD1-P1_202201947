const oracledb = require('oracledb');
require('dotenv').config();

// Configuración del pool de conexiones
const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTSTRING,
    poolMin: parseInt(process.env.ORACLE_POOL_MIN) || 2,
    poolMax: parseInt(process.env.ORACLE_POOL_MAX) || 5
};

async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Pool de conexión a Oracle inicializado con éxito');
    } catch (err) {
        console.error('Error al inicializar el pool de conexión:', err);
        throw err;
    }
}

async function close() {
    try {
        await oracledb.getPool().close(0);
        console.log('Pool de conexión cerrado');
    } catch (err) {
        console.error('Error al cerrar el pool de conexión:', err);
        throw err;
    }
}

async function executeQuery(query, params = [], options = {}) {
    let connection;
    try {
        connection = await oracledb.getPool().getConnection();
        
        // Ajuste para ejecutar la consulta con parámetros de salida (como en RETURNING INTO)
        const result = await connection.execute(query, params, { 
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            autoCommit: true, // Habilitar commit automático para consultas de inserción
            ...options 
        });

        return result;
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexión:', err);
            }
        }
    }
}

module.exports = {
    initialize,
    close,
    executeQuery
};
