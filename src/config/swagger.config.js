const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SwaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "Divar",
        description: "An example of Divar website",
        version: "1.0.0",
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument);

  app.use("/", swaggerUi.serve, swagger);
};

module.exports = SwaggerConfig;
