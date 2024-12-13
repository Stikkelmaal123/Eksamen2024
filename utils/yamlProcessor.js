// utils/yamlProcessor.js
const yaml = require('js-yaml');
const { v4: uuidv4 } = require('uuid');

// Recursively replaces placeholders in the YAML object
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

// Processes the YAML template string
async function processYaml(templateContent, dynamicValues) {
    let yamlObject = yaml.load(templateContent);

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

    // Replace placeholders in YAML
    yamlObject = replacePlaceholders(yamlObject, replacements);

    // Return processed YAML as a string
    return yaml.dump(yamlObject);
}

module.exports = { processYaml };
