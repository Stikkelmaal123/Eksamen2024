const stacksModel = require('../models/stacks'); // DB model for stacks





exports.getStacks = async (req, res) => {
  try {
      const stacks = await stacksModel.getAllStacks();
      res.render('groups', { title: 'All Stacks', stacks });
  } catch (error) {
      console.error('Error fetching stacks:', error.message);
      res.status(500).send('Failed to fetch stacks.');
  }
};