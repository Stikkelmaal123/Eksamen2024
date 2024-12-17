const stacksModel = require('../models/stacks'); // DB model for stacks
const groupsModel = require('../models/groups'); // DB model for groups
const db = require('../utils/db');
const { getTemplateByName, getAllTemplates } = require('../models/templates');
const { processYaml } = require('../utils/yamlProcessor');
const portainerApi = require('../utils/portainerApi'); // Portainer API utility

exports.createStack = async (req, res) => {
    try {
        const { stackName, templateName, subdomain, subdomain2 } = req.body;
        const userId = req.session.userId; // User ID from session
        const groupId = req.session.groupId;
        // Validate input
        if (!stackName || !templateName || !subdomain) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const saveStackQuery = `
        INSERT INTO stacks (stack_name, template_name, sub_domain)
        VALUES (?, ?, CONCAT(?, '.kubelab.dk'))`;
        const [stackResult] = await db.query(saveStackQuery, [stackName, templateName, subdomain]);

        const stackId = stackResult.insertId;

        const linkStackQuery = `
            INSERT INTO groups_users_stacks (stack_id, groups_users_id)
            SELECT ?, groups_users.groups_users_id
            FROM groups_users
            WHERE groups_users.user_id = ? AND groups_users.group_id = ?`;
        await db.query(linkStackQuery, [stackId, userId, groupId]);

        // Fetch the YAML template
        const templateContent = await getTemplateByName(templateName);
        if (!templateContent) {
            return res.status(404).json({ error: 'Template not found' });
        }

        // Process the YAML template
        const processedYaml = await processYaml(templateContent, { subdomain, subdomain2 });

        // Create the stack using Portainer API
        const stackCreationResponse = await portainerApi.createStack(stackName, processedYaml);

        return res.status(201).json({
            message: 'Stack created successfully',
            stack: stackCreationResponse,
        });
    } catch (error) {
        console.error('Error creating stack:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


exports.startStack = async (req, res) => {
    try {
        const { stackName } = req.body;
        if (!stackName) return res.status(400).json({ error: 'Stack name is required.' });

        const result = await portainerApi.startStack(stackName);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error starting stack:', error.message);
        return res.status(500).json({ error: 'Failed to start stack.' });
    }
};

// Stop Stack
exports.stopStack = async (req, res) => {
    try {
        const { stackName } = req.body;
        if (!stackName) return res.status(400).json({ error: 'Stack name is required.' });

        const result = await portainerApi.stopStack(stackName);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error stopping stack:', error.message);
        return res.status(500).json({ error: 'Failed to stop stack.' });
    }
};

exports.deleteStack = async (req, res) => {
    try {
        const { stackName } = req.query; // Get stackName from query params
        console.log('Received DELETE request with stackName:', stackName);

        if (!stackName) return res.status(400).json({ error: 'Stack name is required.' });

        // Call the Portainer API utility to delete the stack
        const result = await portainerApi.deleteStack(stackName);

        // Return success message
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting stack:', error.message);
        return res.status(500).json({ error: 'Failed to delete stack.' });
    }
};


exports.getStacks = async (req, res) => {
    try {
        const allStacks = await stacksModel.getAllStacks();
        const portainerStacks = await portainerApi.getAllStacks(); // Fetch Portainer stacks

        const sanitizeName = (name) => name.toLowerCase().replace(/\s+/g, '');

        const filteredStacks = allStacks.filter(stack =>
            portainerStacks.some(pStack => pStack.Name === sanitizeName(stack.stack_name))
        );
        const stacks = await stacksModel.getAllStacks();
        const educations = await groupsModel.getAllEducations(); // Fetch educations
        const users = await groupsModel.getAllUsers(); // Fetch users here
        const templates = await getAllTemplates();
        res.render('stacks', { title: 'All Stacks', filteredStacks, educations, users, templates }); // Pass to view
    } catch (error) {
        console.error('Error fetching stacks or educations:', error.message);
        res.status(500).send('Failed to fetch stacks or educations.');
    }
};

exports.renderCreateStackForm = async (req, res) => {
    try{
        res.render('create-stack', { title: 'All Stacks', stacks, educations, templates }); 
    } catch (error) {
        console.error('Error fetching stacks or educations:', error.message);
        res.status(500).send('Failed to fetch stacks or educations.');
    }
};