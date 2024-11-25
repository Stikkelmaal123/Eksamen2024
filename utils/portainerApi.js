const axios = require('axios');

const BASE_URL = 'http://portainer.kubelab.dk/api'
let token = null;

//login
const login = async function login(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, { username, password });
        token = response.data.jwt;
        console.log('Authenticated with Portainer');
        return token;
    } catch (error) {
        console.error('Error authenticating with Portainer', error.response?.data || error.message);
        throw error;
    }   
}

// API req
// async function apiRequest(endpoint, method = 'GET', data = null) {
//     if(!token) {
//         console.error('API Request failed: Missing authentication token');
//         throw new Errror('You must login before making requests');
//     }
    
//     try {
//         console.log(`Making API request to: ${endpoint}`);
//         const response = await axios({
//             url: `${BASE_URL}${endpoint}`,
//             method,
//             data,
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('API request successful:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error making API request:', error.response?.data || error.message);
//         throw error; 
//     }
// }

// Opret en stack
async function createStack(name, swarmId, fileContent, endpointId) {
    try {
        const payload = {
            Name: name,
            SwarmID: swarmId,
            StackFileContent: fileContent,
            EndpointID: endpointId,
        };

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


module.exports = { login, createStack, getEndpoints, };      