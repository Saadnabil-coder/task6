
const mysql = require('mysql2/promise');   

const pool = mysql.createPool({
    host: 'localhost',
    user: 'saad',           
    password: '12345678',
    database: 'retail_store',  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function executeQuery(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database Error:', error.message);
        throw error;
    }
}

module.exports = { pool, executeQuery };
