const db = require('../utils/db');

module.exports = {
  getAllGroups: async () => {
    const [rows] = await db.execute(
      `
      SELECT 
        groups.group_id, 
        groups.group_name, 
        groups.expiration_date, 
        educations.education_name,
        COUNT(DISTINCT groups_users.user_id) AS user_count,
        COUNT(DISTINCT groups_users_stacks.stack_id) AS stack_count
      FROM
        \`groups\`
      LEFT JOIN groups_users 
        ON groups.group_id = groups_users.group_id
      LEFT JOIN groups_users_stacks 
        ON groups_users.groups_users_id = groups_users_stacks.groups_users_id
      LEFT JOIN educations 
        ON groups.education_id = educations.education_id
      GROUP BY 
        groups.group_id, groups.group_name, groups.expiration_date, educations.education_name
      ORDER BY 
        groups.group_name ASC;
      `
    );
    return rows;
  },
  getAllEducations: async () => {
    const [rows] = await db.execute(`SELECT education_id, education_name FROM educations ORDER BY education_name ASC`);
    return rows;
  },

  getAllUsers: async () => {
    const [rows] = await db.execute(`SELECT user_id, user_name, email FROM users ORDER BY user_name ASC`);
    return rows;
  },

  createGroup: async (groupData) => {
    const { group_name, education_id, expiration_date} = groupData;
    const [result] = await db.execute(
        `INSERT INTO \`groups\` (group_name, education_id, expiration_date) VALUES (?, ?, ?)`,
        [group_name, education_id, expiration_date]
    );
    return result;
},

  addUsersToGroup: async (groupId, userIds) => {
    if (!Array.isArray(userIds)) return;

    const placeholders = userIds.map(() => '(?, ?)').join(', ');
    const values = [];
    userIds.forEach(userId => {
      values.push(groupId, userId);
    });

    await db.execute(
      `INSERT INTO groups_users (group_id, user_id) VALUES ${placeholders}`,
      values
    );
  }

}