const db = require('../utils/db'); // Utility to handle DB connections and queries
const bcrypt = require('bcrypt');
// Function to get a user by email and password
const getUserByEmailAndPassword = async (email, password) => {
    try {
        const query = `
            SELECT 
                u.user_id, 
                gu.group_id, 
                u.email,
                u.admin
            FROM 
                users u
            JOIN 
                groups_users gu ON u.user_id = gu.user_id
            WHERE 
                u.email = ? AND u.password = ?;
        `;
        const [result] = await db.query(query, [email, password]);
        
        if (result.length > 0) {
            return result[0]; // Return the first user found with their group
        } else {
            return null; // No user found
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};



const addUser = async (name, email, password, role = 0) => {
    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            throw new Error(`User with email ${email} already exists.`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (user_name, email, password, admin)
            VALUES (?, ?, ?, ?);
        `;
        const result = await db.query(query, [name, email, hashedPassword, role]);
        return result;
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw error;
    }
};
module.exports = { getUserByEmailAndPassword, addUser};