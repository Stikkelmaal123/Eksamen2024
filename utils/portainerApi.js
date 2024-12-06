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
        console.error('Error authenticating with Portainer', error.response?.data || error.message);
        throw error;
    }   
};

// Create stack function
const createStack = async (name, fileContent) => {
    try {
        if (!token) {
            throw new Error('User is not authenticated. Please log in first.');
        }

        const payload = {
            Name: name,
            StackFileContent: fileContent,
        };

        console.log('Payload for stack creation:', payload);

        const response = await axios.post(
            `${BASE_URL}/stacks`,
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

module.exports = { login, createStack };
