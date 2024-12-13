const stacksModel = require('../models/stacks'); // DB model for stacks
const { getTemplateByName } = require('../models/templates');
const { processYaml } = require('../utils/yamlProcessor');
const portainerApi = require('../utils/portainerApi'); // Portainer API utility

exports.createStack = async (req, res) => {
    try {
        const { stackName, templateName, subdomain, subdomain2 } = req.body;

        // Validate input
        if (!stackName || !templateName || !subdomain) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

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
        res.render('stacks', { title: 'All Stacks', stacks });
    } catch (error) {
        console.error('Error fetching stacks:', error.message);
        res.status(500).send('Failed to fetch stacks.');
    }
};

exports.renderCreateStackForm = (req, res) => {
    // Render a form for creating a stack
    res.render('createStack', { title: 'Create a New Stack' });
};


