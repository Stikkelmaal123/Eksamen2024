
const portainerApi = require('../utils/portainerApi');

exports.login = async (req, res) => {
    try {
        const token = await portainerApi.login(username, password);

        if (token) {
            // Send the token back to the client
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


