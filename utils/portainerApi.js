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


const sanitizeName = (name) => name.toLowerCase().replace(/\s+/g, '');

const getStackIdByName = async (stackName) => {
    const token = await getToken();
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.get(`${BASE_URL}/stacks`, {
        httpsAgent,
        headers: { Authorization: `Bearer ${token}` },
    });

    const stacks = response.data;

    // Normalize stack name for comparison
    const saniStackName = sanitizeName(stackName);

    // Find stack ID by name
    const stack = stacks.find(s => sanitizeName(s.Name) === saniStackName);

    if (!stack) {
        throw new Error(`Stack with name '${stackName}' not found.`);
    }

    return stack.Id;
};
// Stop (Pause) all services in a stack
const stopStack = async (stackName) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('No token found. Please log in.');

        const stackId = await getStackIdByName(stackName); // Fetch stack ID dynamically
        console.log(`Attempting to stop stack '${stackName}' with ID: ${stackId}`);

        // Include endpointId in the query parameter
        const response = await axios.post(
            `${BASE_URL}/stacks/${stackId}/stop?endpointId=${ENDPOINT_ID}`,
            null, // No payload needed
            {
                httpsAgent,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(`Stack '${stackName}' stopped successfully.`);
        return { message: `Stack '${stackName}' stopped successfully.` };

    } catch (error) {
        if (error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);
        } else {
            console.error('Error stopping stack:', error.message);
        }
        throw new Error(`Failed to stop stack '${stackName}': ${error.message}`);
    }
};


// Start (Unpause) all services in a stack
const startStack = async (stackName) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('No token found. Please log in.');

        const stackId = await getStackIdByName(stackName); // Fetch stack ID dynamically
        console.log(`Attempting to start stack '${stackName}' with ID: ${stackId}`);

        // Include endpointId in the query parameter
        const response = await axios.post(
            `${BASE_URL}/stacks/${stackId}/start?endpointId=${ENDPOINT_ID}`,
            null, // No payload needed
            {
                httpsAgent,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(`Stack '${stackName}' started successfully.`);
        return { message: `Stack '${stackName}' started successfully.` };

    } catch (error) {
        if (error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);
        } else {
            console.error('Error starting stack:', error.message);
        }
        throw new Error(`Failed to start stack '${stackName}': ${error.message}`);
    }
};

const deleteStack = async (stackName) => {
    try {
        const token = await getToken();
        if (!token) throw new Error('No token found. Please log in.');

        const stackId = await getStackIdByName(stackName); // Fetch stack ID dynamically
        console.log(`Resolved Stack ID for '${stackName}': ${stackId}`);
        console.log(`DELETE URL: ${BASE_URL}/stacks/${stackId}?endpointId=${ENDPOINT_ID}`);

        // Send DELETE request to the Portainer API
        const response = await axios.delete(
            `${BASE_URL}/stacks/${stackId}?endpointId=${ENDPOINT_ID}`,
            {
                httpsAgent,
                headers: { Authorization: `Bearer ${token}` },
                validateStatus: (status) => status === 204 || status < 500,
            }
        );

        console.log(`Stack '${stackName}' (ID: ${stackId}) deleted successfully.`);
        return { message: `Stack '${stackName}' deleted successfully.` };
    } catch (error) {
        if (error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);
        } else {
            console.error('Error deleting stack:', error.message);
        }
        throw new Error(`Failed to delete stack '${stackName}': ${error.message}`);
    }
};


module.exports = { login, getSwarmID, createStack, stopStack, startStack, getAllStacks, deleteStack};
