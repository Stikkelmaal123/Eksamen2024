const db = require('../utils/db');

module.exports = {
 getAllGroups : async () => {
      const [rows] = await db.execute(
        `
        SELECT 
          g.group_id,
          g.group_name,
          g.expiration_date,
          e.education_name, -- Include education_name
          COUNT(gu.user_id) AS user_count
        FROM
          \`groups\` g
        LEFT JOIN groups_users gu
          ON g.group_id = gu.group_id
        LEFT JOIN educations e
          ON g.education_id = e.education_id
        GROUP BY 
          g.group_id, g.group_name, g.expiration_date, e.education_name
        ORDER BY 
          g.group_name ASC;
        `
      );  
      return rows;
  }
}