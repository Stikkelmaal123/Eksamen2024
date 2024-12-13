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
        let yamlObject;

        // Log raw input for debugging
        console.log('Raw templateContent:', templateContent);

        // Detect and parse the content
        if (templateContent.trim().startsWith('{')) {
            // Likely JSON, check for escaping issues
            try {
                yamlObject = JSON.parse(templateContent); // Try parsing directly
            } catch {
                console.log('Unescaping content and retrying JSON.parse');
                const unescapedContent = templateContent.replace(/\\/g, ''); // Remove extra backslashes
                yamlObject = JSON.parse(unescapedContent);
            }
        } else {
            // Likely YAML
            yamlObject = yaml.load(templateContent);
        }

        // Generate unique strings
        const randomString1 = uuidv4();
        const randomString2 = uuidv4();

        // Define replacements
        const replacements = {
            RANDOMSTRING: randomString1,
            RANDOMSTRING2: randomString2,
            SUBDOMAIN: dynamicValues.subdomain,
            SUBDOMAIN2: dynamicValues.subdomain2,
        };

        // Replace placeholders in YAML object
        const updatedYamlObject = replacePlaceholders(yamlObject, replacements);

        // Convert back to string for Portainer (JSON or YAML as needed)
        const processedYaml = JSON.stringify(updatedYamlObject); // JSON for Portainer
        console.log('Processed YAML/JSON for Portainer:', processedYaml);

        return processedYaml;
    } catch (error) {
        console.error('Error in processYaml:', error.message);
        throw error;
    }
}



module.exports = { processYaml };
