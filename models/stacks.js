const db = require('../utils/db');
// const { createStack, getEndpoints } = require('../utils/portainerApi');

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
    }
}