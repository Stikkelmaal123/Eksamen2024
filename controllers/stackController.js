const stacksModel = require('../models/stacks'); // DB model for stacks
const db = require('../utils/db'); // Database utility for executing queries
const portainerApi = require('../utils/portainerApi'); // Portainer API utility
const { v4: uuidv4 } = require('uuid'); // For generating unique strings

exports.createStack = async (req, res) => {
    try {
        const { stackName, templateName, subdomain, groupsUsersId } = req.body;

        if (!stackName || !templateName || !subdomain || !groupsUsersId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate unique identifier for stack configuration
        const randomString = uuidv4();

        // Create stack template
        const stackTemplate = {
            networks: {
                "traefik-proxy": { external: true },
            },
            services: {
                test: {
                    image: "nginx:latest",
                    environment: [
                        `SUBDOMAIN=${subdomain}`,
                    ],
                },
            },
        };

        // Convert template to YAML (example conversion)
        const yaml = require('js-yaml');
        const stackFileContent = yaml.dump(stackTemplate);

        // Call Portainer API to create the stack
        const createdStack = await portainerApi.createStack(stackName, stackFileContent);

        // Save stack details in the database
        const query = 'INSERT INTO stacks (stack_name, template_name, sub_domain) VALUES (?, ?, ?)';
        await db.query(query, [stackName, templateName, subdomain]);

        res.status(201).json({ message: 'Stack created successfully', stackId: createdStack.Id });
    } catch (error) {
        console.error('Error in createStack:', error.message);
        res.status(500).json({ error: 'Internal server error' });
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


