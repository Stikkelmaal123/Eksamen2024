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
        VALUES (?, ?, ?)`;
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


exports.getStacks = async (req, res) => {
    try {
        const stacks = await stacksModel.getAllStacks();
        const educations = await groupsModel.getAllEducations(); // Fetch educations
        const users = await groupsModel.getAllUsers(); // Fetch users here
        const templates = await getAllTemplates();
        res.render('stacks', { title: 'All Stacks', stacks, educations, users, templates }); // Pass to view
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