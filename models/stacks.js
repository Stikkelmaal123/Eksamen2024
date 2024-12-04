const db = require('../utils/db');
// const { createStack, getEndpoints } = require('../utils/portainerApi');

module.exports = {

    getAllStacks: async () => {
        const [rows] = await db.execute(
            'SELECT * FROM stacks JOIN users ON stacks.user_id = users.user_id'
        );
        return rows;
    }
}