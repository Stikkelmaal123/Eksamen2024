const db = require('../utils/db');

exports.getTemplateByName = async (templateName) => {
    const query = `SELECT ymlfile FROM templates WHERE template_name = ?`;
    const [results] = await db.query(query, [templateName]);
    return results.length ? results[0].ymlfile : null; 
};