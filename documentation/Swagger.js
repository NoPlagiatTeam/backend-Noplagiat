const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API For Noplagiat Project',
            version: '1.0.0',
            description: 'This API describe all the routes of our project',
        },
    },
    apis: ['src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = {
    swaggerUI,
    specs,
};
