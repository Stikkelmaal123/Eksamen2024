const db = require('../utils/db');

// Function to get a user by email and password
exports.getUserByEmailAndPassword = async (email, password) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const users = await db.query(query, [email, password]);
    return users[0]; // Return the first user if found
};
