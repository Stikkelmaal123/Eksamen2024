const groupsModel = require('../models/groups'); // DB model for groups




exports.createGroup = async (req, res) => {
  try {
      const { groupName, educationCheckbox, expirationDate} = req.body;

      // Validate input
      if (!groupName || !educationCheckbox || !expirationDate) {
          return res.status(400).json({ error: 'Missing required fields' });

      };
  } catch (error) {
      console.error('Error creating group:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};




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


