const groupsModel = require('../models/groups'); // DB model for groups
const { getAllTemplates } = require('../models/templates');




exports.getCreateGroupPage = async (req, res) => {
  try {
    const educations = await groupsModel.getAllEducations();
    const users = await groupsModel.getAllUsers(); // Fetch all users
    res.render('create-group', { title: 'Create Group', educations, users });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Failed to load create group page.');
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { groupName, educationId, expirationDate, userIds } = req.body;

    // Validate input
    if (!groupName || !educationId || !expirationDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const groupData = {
      group_name: groupName,
      education_id: educationId,
      expiration_date: expirationDate,
    };

    // Create the group
    const result = await groupsModel.createGroup(groupData);
    const groupId = result.insertId;

    // If any users were selected, add them
    if (userIds && userIds.length > 0) {
      await groupsModel.addUsersToGroup(groupId, userIds);
    }

    res.status(201).json({ success: true, groupId: groupId });
  } catch (error) {
    console.error('Error creating group:', error.message);
    res.status(500).json({ error: 'Failed to create group. Group may already exist.' });
  }
};




exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupsModel.getAllGroups();
    const educations = await groupsModel.getAllEducations();
    const users = await groupsModel.getAllUsers(); // Fetch users here
    const templates = await getAllTemplates();
    res.render('groups', { title: 'All groups', groups, educations, users, templates });
  } catch (error) {
    console.error('Error fetching groups, educations, or users:', error.message);
    res.status(500).send('Failed to fetch data.');
  }
};



