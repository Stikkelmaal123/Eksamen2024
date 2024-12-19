const db = require('../utils/db');

module.exports = {
    getAllStacks: async () => {
        const [rows] = await db.execute(
            `SELECT * 
            FROM stacks
            JOIN groups_users_stacks 
                ON stacks.stack_id = groups_users_stacks.stack_id
            JOIN groups_users 
                ON groups_users_stacks.groups_users_id = groups_users.groups_users_id
            JOIN users 
                ON groups_users.user_id = users.user_id
            JOIN \`groups\` 
                ON groups_users.group_id = \`groups\`.group_id`
        );  
        return rows;
    },
    
    getStacksByUserId: async (userId) => {
        const [rows] = await db.execute(
            `SELECT stacks.*, 
                    users.user_name AS owner, 
                    groups.group_name AS group_name
             FROM stacks
             JOIN groups_users_stacks ON stacks.stack_id = groups_users_stacks.stack_id
             JOIN groups_users ON groups_users_stacks.groups_users_id = groups_users.groups_users_id
             JOIN users ON groups_users.user_id = users.user_id
             JOIN \`groups\` ON groups_users.group_id = \`groups\`.group_id
             WHERE groups_users.user_id = ?`,
            [userId]
        );
        return rows;
    },

    createStack: async (stackData, userId, groupId) => {
        const { stack_name, template_name, sub_domain } = stackData;
    
        // Insert into stacks table
        const [stackResult] = await db.execute(
            `INSERT INTO stacks (stack_name, template_name, sub_domain)
             VALUES (?, ?, ?)`,
            [stack_name, template_name, sub_domain]
        );
    
        const stackId = stackResult.insertId;
    
        // Link the stack to the user and group
        await db.execute(
            `INSERT INTO groups_users_stacks (stack_id, groups_users_id)
             SELECT ?, groups_users.groups_users_id
             FROM groups_users
             WHERE groups_users.user_id = ? AND groups_users.group_id = ?`,
            [stackId, userId, groupId]
        );
    
        return stackId; // Return the new stack ID
    }
};
