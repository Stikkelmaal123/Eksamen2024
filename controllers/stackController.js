const stackModel = require('../models/stacks');

exports.getStacks = async (req, res) => {
    try {
        const stacks = await stackModel.getAllStacks();
        res.render('stacks', { title: 'All Stacks', stacks });
    } catch (error) {
        console.error('Error fetching stacks:', error.message);
        res.status(500).send('Failed to fetch stacks.');
    }
};