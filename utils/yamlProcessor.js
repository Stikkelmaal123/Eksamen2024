const yaml = require('js-yaml');
const { v4: uuidv4 } = require('uuid');

function replacePlaceholders(obj, replacements) {
    if (Array.isArray(obj)) {
        return obj.map(item => replacePlaceholders(item, replacements));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = replacePlaceholders(obj[key], replacements);
        }
        return newObj;
    } else if (typeof obj === 'string') {
        let str = obj;
        for (const [placeholder, value] of Object.entries(replacements)) {
            const regex = new RegExp(placeholder, 'g');
            str = str.replace(regex, value);
        }
        return str;
    }
    return obj;
}

async function processYaml(templateContent, dynamicValues) {
    try {
        // Preprocess the templateContent to handle escaped characters
        const preprocessedContent = templateContent.replace(/\\n/g, '\n').replace(/\\/g, '');
        console.log('Preprocessed Content:', preprocessedContent);

        // Parse the YAML content
        const yamlObject = yaml.load(preprocessedContent);

        // Generate unique strings
        const randomString1 = uuidv4();
        const randomString2 = uuidv4();
        const randomString3 = uuidv4();

        // Define replacements
        const replacements = {
            RANDOMSTRING: randomString1,
            RANDOMSTRING2: randomString2,
            SUBDOMAIN: dynamicValues.subdomain,
            SUBDOMAIN2: randomString3,
        };

        // Replace placeholders in YAML object
        const updatedYamlObject = replacePlaceholders(yamlObject, replacements);

        // Convert back to JSON for Portainer
        const processedYaml = JSON.stringify(updatedYamlObject);
        console.log('Processed YAML/JSON for Portainer:', processedYaml);

        return processedYaml;
    } catch (error) {
        console.error('Error in processYaml:', error.message);
        throw error;
    }
}



module.exports = { processYaml };
