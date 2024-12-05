const axios = require('axios');

const BASE_URL = 'http://portainer.kubelab.dk/api'
let token = null;

//login
const login = async function login(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, { username, password });
        token = response.data.jwt;
        console.log('Authenticated with Portainer', token);
        return token;
    } catch (error) {
        console.error('Error authenticating with Portainer', error.response?.data || error.message);
        throw error;
    }   
}


async function createStack(name, swarmId, fileContent, endpointId) {
    try {
        if (!token) {
            throw new Error('User is not authenticated.');
        }
        const payload = {
            Name: name,
            SwarmID: swarmId,
            StackFileContent: fileContent,
            EndpointID: endpointId,
        };

        console.log('Payload', payload);

        const response = await axios.post(`${BASE_URL}/stacks/create/swarm`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating stack:', error.response?.data || error.message);
        throw error;
    }
}

// Hent endpoints
async function getEndpoints() {
    try {
        const response = await axios.get(`${BASE_URL}/endpoints`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching endpoints:', error.response?.data || error.message);
        throw error;
    }
}
