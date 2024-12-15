const groupsModel = require('../models/groups'); // DB model for groups




exports.getCreateGroupPage = async (req, res) => {
  try {
    const educations = await groupsModel.getAllEducations();
    res.render('create-group', { title: 'Create Group', educations });
  } catch (error) {
    console.error('Error fetching educations:', error.message);
    res.status(500).send('Failed to load create group page.');
  }
};

exports.createGroup = async (req, res) => {
  try {
    console.log('Request Headers:', req.headers); // Inspect headers
    console.log('Request body:', req.body); // Log the request body to debug
    const { groupName, educationId, expirationDate } = req.body;

    // Validate input
    if (!groupName || !educationId || !expirationDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const groupData = {
      group_name: groupName,
      education_id: educationId,
      expiration_date: expirationDate,
    };

    const result = await groupsModel.createGroup(groupData);
    res.status(201).json({ success: true, groupId: result.insertId });
  } catch (error) {
    console.error('Error creating group:', error.message);
    res.status(500).json({ error: 'Failed to create group. Group already exists' });
  }
};




exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupsModel.getAllGroups();
    const educations = await groupsModel.getAllEducations(); // Fetch educations
    console.log('Educations:', educations); // Debug to ensure educations are fetched
    res.render('groups', { title: 'All groups', groups, educations }); // Pass educations
  } catch (error) {
    console.error('Error fetching groups or educations:', error.message);
    res.status(500).send('Failed to fetch groups or educations.');
  }
};




