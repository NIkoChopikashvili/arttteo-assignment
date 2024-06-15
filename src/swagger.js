const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Arttteo Task api',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        description: 'JWT authorization of an API using cookies',
        name: 'Authorization',
        in: 'cookie',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/swagger-routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
