const mysql = require('mysql2/promise');

// Opret forbindelse til MySQL-databasen
const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',    
    password: 'root', 
    database: 'portainer',   
});

exports.query = async (query, params) => {
    try {
        const [results] = await pool.execute(query, params);
        return results; // Return results of the query
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

module.exports = pool;
