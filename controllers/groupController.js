const groupsModel = require('../models/groups'); // DB model for groups


exports.getAllGroups = async (req, res) => {
  try {
      const groups = await groupsModel.getAllGroups();
      console.log(groups); // Log to see the data being returned
      res.render('groups', { title: 'All groups', groups });
  } catch (error) {
      console.error('Error fetching groups', error.message);
      res.status(500).send('Failed to fetch groups.');
  }
};


