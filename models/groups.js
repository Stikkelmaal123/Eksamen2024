const db = require('../utils/db');

module.exports = {
 getAllGroups : async () => {
      const [rows] = await db.execute(
        `
        SELECT 
          groups.group_id, 
          groups.group_name, 
          groups.expiration_date, 
          educations.education_name,
          COUNT(groups_users.user_id) AS user_count
        FROM
          \`groups\`
        LEFT JOIN groups_users 
          ON groups.group_id = groups_users.group_id
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

  createGroup: async (groupData) => {
    const { group_name, education_id, expiration_date} = groupData;
    const result = await db.execute(
        `INSERT INTO \`groups\` (group_name, education_id, expiration_date) VALUES (?, ?, ?)`,
        [group_name, education_id, expiration_date]
    );
    return result;
}

}