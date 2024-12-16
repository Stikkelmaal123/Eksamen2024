const db = require('../utils/db'); // Utility to handle DB connections and queries

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

module.exports = { getUserByEmailAndPassword};