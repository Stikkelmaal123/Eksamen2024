const axios = require('axios');

const BASE_URL = 'http://portainer.kubelab.dk/api';
let token = null;

// Login function to authenticate with the Portainer API
const login = async function login(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, { username, password });
        token = response.data.jwt;
        console.log('Authenticated with Portainer', token);
        return token;
    } catch (error) {
        console.error('Error authenticating with Portainer:', error.response?.data || error.message);
        throw error;
    }   
};


const getSwarmID = async (endpointId) => {
    try {
        const response = await axios.get(`${BASE_URL}/endpoints/${endpointId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.SwarmID; // SwarmID is part of the endpoint data
    } catch (error) {
        console.error('Error fetching Swarm ID:', error.response?.data || error.message);
        throw error;
    }
};

// Create stack function
const createStack = async (name, fileContent, endpointId, username, password) => {
    try {
        // Ensure the user is logged in
        if (!token) {
            console.log('No token found. Logging in...');
            await login(username, password);
        }

        const swarmId = await getSwarmID(endpointId);
        if (!swarmId) {
            throw new Error('SwarmID not found for the specified endpoint');
        }

        const payload = {
            Name: name,
            StackFileContent: fileContent,
            EndpointId: endpointId,
            SwarmID: swarmId,
            ComposeFormat: "3.8",
        };

        console.log('Payload for stack creation:', payload);

        const response = await axios.post(
            `${BASE_URL}/stacks?type=1&method=string&endpointId=${endpointId}`,
            payload,
            {
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

module.exports = { login, getSwarmID, createStack };
