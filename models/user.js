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
                u.password,  -- Henter hash fra DB
                u.admin
            FROM 
                users u
            LEFT JOIN 
                groups_users gu ON u.user_id = gu.user_id
            WHERE 
                u.email = ?;
        `;
        const [result] = await db.query(query, [email]);
        
        if (result.length > 0) {
            const user = result[0];

            // 🔥 Brug bcrypt.compare til at validere password korrekt
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return null; // Forkert password
            }

            // ✅ Slet password fra objektet, før vi returnerer det
            delete user.password;
            return user;
        } else {
            return null; // Ingen bruger fundet
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