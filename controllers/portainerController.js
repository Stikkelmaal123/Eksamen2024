const { login, apiRequest } = require('../utils/portainerApi');

exports.getPortainerInfo = async (req, res) => {
    try {
        //Login
        const jwt = await login('alpha', 'Ladida.12');
        console.log('JWT Token:', jwt);

        //Hent data
        const data = await apiRequest('/status');
        console.log('Portainer Status:', data);

        res.render('portainer', {
            title: 'Portainer Connection',
            message: ' Forbindelse til Portainer oprettet!',
            data: JSON.stringify(data, null, 2),
        });
    } catch (error) {
        console.error('Error in Portainer Controller:', error); // Log mere detaljeret
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        res.status(500).send('Fejl ved forbindelse til Portainer API: ' + errorMessage);
    }
};