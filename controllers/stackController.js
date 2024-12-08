const stacksModel = require('../models/stacks'); // DB model for stacks
const db = require('../utils/db'); // Database utility for executing queries
const portainerApi = require('../utils/portainerApi'); // Portainer API utility
const { v4: uuidv4 } = require('uuid'); // For generating unique strings

exports.createStack = async (req, res) => {
    try {
        const { stackName, templateName, subdomain } = req.body;

        if (!stackName || !templateName || !subdomain) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate a unique random string for "CHANGEME"
        const randomString = uuidv4();

        // Create stack template
        const stackTemplate = {
            networks: {
                "traefik-proxy": { external: true },
            },
            services: {
                test: {
                    image: "nginx:latest",
                    networks: ["traefik-proxy"],
                    deploy: {
                        labels: [
                            "traefik.enable=true",
                            `traefik.http.routers.${randomString}.rule=Host(\`${subdomain}\`)`,
                            `traefik.http.routers.${randomString}.entrypoints=web,websecure`,
                            `traefik.http.routers.${randomString}.tls.certresolver=letsencrypt`,
                            `traefik.http.services.${randomString}.loadbalancer.server.port=80`,
                        ],
                    },
                },
            },
        };

        // Convert the stack template to JSON
        const stackFileContent = JSON.stringify(stackTemplate, null, 2);

        // Pass username and password for authentication
        const endpointId = 5;
        const username = "alpha"; // Replace with your actual username
        const password = "Ladida.12"; // Replace with your actual password

        // Call Portainer API to create the stack
        const createdStack = await portainerApi.createStack(
            stackName,
            stackFileContent,
            endpointId,
            username,
            password
        );

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


