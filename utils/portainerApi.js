const axios = require('axios');
const https = require('https');

const BASE_URL = 'https://portainer.kubelab.dk/api';

async function login() {
    try {
        const agent = new https.Agent({ 
            rejectUnauthorized: false // Ignore SSL certificate errors
        });
        
        const response = await axios.post(
            `${BASE_URL}/auth`,
            { username: 'alpha', password: 'Ladida.12' },
            { httpsAgent: agent }
        );
        
        console.log('JWT Token:', response.data.jwt);
        return response.data.jwt;
    } catch (error) {
        console.error('Error authenticating with Portainer:', error.message);
        throw error;
    }
}
            


const getSwarmID = async (endpointId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/endpoints/${endpointId}/docker/swarm`,
            {
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
const createStack = async (name, fileContent, endpointId) => {
    try {
        if (!token) {
            throw new Error('You are not logged in');
        }

        const swarmId = await getSwarmID(endpointId); 
        console.log('Swarm ID:', swarmId);

        const payload = {
            Name: name,
            StackFileContent: fileContent,
            EndpointId: endpointId,
            SwarmID: swarmId,
            ComposeFormat: "3.8",
        };

        console.log('Payload for Stack Creation:', payload);

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
