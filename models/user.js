const db = require('../utils/db'); // Utility to handle DB connections and queries

// Function to get a user by email and password
const getUserByEmailAndPassword = async (email, password) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const result = await db.query(query, [email, password]);
        
        if (result.length > 0) {
            return result[0]; // Return the first user found
        } else {
            return null; // No user found
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// You could also add other functions to handle user registration, password reset, etc.
const createUser = async (email, password) => {
    try {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const result = await db.query(query, [email, password]);
        return result.insertId; // Return the user ID after creation
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

module.exports = { getUserByEmailAndPassword, createUser };