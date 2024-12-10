const mysql = require('mysql2/promise');

// Opret forbindelse til MySQL-databasen
const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',    
    password: 'root', 
    database: 'portainer',   
});

module.exports = pool;
