const { login, createStack, getEndpoints } = require('../utils/portainerApi');

// Render formular til oprettelse af stack
exports.renderCreateStackForm = async (req, res) => {
    try {
        await login('alpha', 'Ladida.12'); 
        const endpoints = await getEndpoints();
        res.render('createStack', { title: 'Create Stack', endpoints });
    } catch (error) {
        console.error('Error rendering form:', error.message);
        res.status(500).send('Failed to render form.');
    }
};

// Håndter oprettelse af stack
exports.createStack = async (req, res) => {
    try {
        const { name, swarmId, fileContent, endpointId } = req.body;
        const stack = await createStack(name, swarmId, fileContent, parseInt(endpointId));

        // Her kan vi gemme stacken i en database
        // Eksempel: await StackModel.create(stack);

        res.render('stackDetails', { title: 'Stack Created', stack });
    } catch (error) {
        console.error('Error creating stack:', error.message);
        res.status(500).send('Failed to create stack.');
    }
};

// exports.getPortainerInfo = async (req, res) => {
//     try {
//         //Login
//         const jwt = await login('alpha', 'Ladida.12');
//         console.log('JWT Token:', jwt);

//         //Hent data
//         const data = await apiRequest('/status');
//         console.log('Portainer Status:', data);

//         res.render('portainer', {
//             title: 'Portainer Connection',
//             message: ' Forbindelse til Portainer oprettet!',
//             data: JSON.stringify(data, null, 2),
//         });
//     } catch (error) {
//         console.error('Error in Portainer Controller:', error); // Log mere detaljeret
//         const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
//         res.status(500).send('Fejl ved forbindelse til Portainer API: ' + errorMessage);
//     }
// };