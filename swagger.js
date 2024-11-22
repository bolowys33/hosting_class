const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDoc = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Our Social API",
      version: "1.0.0",
      description: "This is a social API for social network applications",
    },
  },
  apis: ["./routes/*.js"],
});

module.exports = { swaggerDoc };
