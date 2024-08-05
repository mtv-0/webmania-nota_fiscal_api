const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "WebmaniaBR Nota Fiscal API",
      version: "1.0.0",
      description: "API para integração com a Nota Fiscal da WebmaniaBR",
      contact: {
        name: "Walter Matheus Tavares da Silva",
        email: "matheustavares858@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Servidor Local",
        },
      ],
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js", "./src/swagger/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
