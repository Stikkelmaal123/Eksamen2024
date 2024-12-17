const axios = require('axios');
const https = require('https');
const { saveToken, getToken } = require('./tokenStore');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL = 'https://portainer.kubelab.dk/api';
const ENDPOINT_ID = 5;

async function login() {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth`, 
            {  username: 'alpha', password: 'Ladida.12' },
            { httpsAgent }
            
        );

        const token = response.data.jwt;
        console.log('JWT Token acquired:', token);

        // Save token to memory
        await saveToken(token);

        return token;
    } catch (error) {
        console.error('Error during login:', error.message);
        throw new Error('Failed to authenticate with Portainer');
    }
}


const getSwarmID = async () => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No token found in session storage. Please log in.');
        }

        const response = await axios.get(
            `${BASE_URL}/endpoints/${ENDPOINT_ID}/docker/swarm`,
            {
                httpsAgent,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('Swarm Data:', response.data);

        const swarmId = response.data.ID;
        if (!swarmId) {
            throw new Error('SwarmID not found in Swarm data.');
        }

        return swarmId;
    } catch (error) {
        console.error('Error fetching Swarm ID:', error.response?.data || error.message);
        throw error;
    }
};


// Create stack function
const createStack = async (stackName, processedYaml) => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No token found in session storage. Please log in.');
        }

        const swarmId = await getSwarmID(); 
        console.log('Swarm ID:', swarmId);

        const payload = {
            Name: stackName,
            StackFileContent: processedYaml,
            EndpointId: ENDPOINT_ID,
            SwarmID: swarmId,
            ComposeFormat: "3.8",
        };

        console.log('Payload for Stack Creation:', JSON.stringify(payload, null, 2));

        const response = await axios.post(
            `${BASE_URL}/stacks?type=1&method=string&endpointId=${ENDPOINT_ID}`,
            payload,
            {
                httpsAgent,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error creating stack:', error.response?.data || error.message);
        throw error;
    }
};

const getAllStacks = async () => {
    const token = await getToken();
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.get(`${BASE_URL}/stacks`, {
        httpsAgent,
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};


const getStackServices = async (stackName) => {
    const token = await getToken();
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.get(
        `${BASE_URL}/endpoints/${ENDPOINT_ID}/docker/services`,
        {
            httpsAgent,
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    // Filter services by stack name label
    const services = response.data.filter(service => 
        service.Spec?.Labels?.['com.docker.stack.namespace'] === stackName
    );

    if (!services.length) throw new Error(`No services found for stack: ${stackName}`);
    return services;
};

const sanitizeName = (name) => name.toLowerCase().replace(/\s+/g, '');

// Stop (Pause) all services in a stack
const stopStack = async (stackName) => {
    const saniStackName = sanitizeName(stackName);
    console.log(`Stopping stack: ${stackName} (Sanitized: ${saniStackName})`);
    const token = await getToken();
    if (!token) throw new Error('No token found. Please log in.');

    const services = await getStackServices(saniStackName);

    for (const service of services) {
        await axios.post(
            `${BASE_URL}/endpoints/${ENDPOINT_ID}/docker/services/${service.ID}/pause`,
            null, // No payload
            {
                httpsAgent,
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(`Service ${service.Spec.Name} paused.`);
    }

    return { message: `Stack '${stackName}' stopped successfully.` };
};

// Start (Unpause) all services in a stack
const startStack = async (stackName) => {
    const saniStackName = sanitizeName(stackName);
    const token = await getToken();
    if (!token) throw new Error('No token found. Please log in.');

    const services = await getStackServices(saniStackName);

    for (const service of services) {
        await axios.post(
            `${BASE_URL}/endpoints/${ENDPOINT_ID}/docker/services/${service.ID}/unpause`,
            null, // No payload
            {
                httpsAgent,
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(`Service ${service.Spec.Name} unpaused.`);
    }

    return { message: `Stack '${stackName}' started successfully.` };
};

module.exports = { login, getSwarmID, createStack, stopStack, startStack, getAllStacks };
