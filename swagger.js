const swaggerAutogen = require("swagger-autogen")();
const DEFINITIONS = require('./definitions')
const dotenv = require("dotenv");
dotenv.config();

const docs = {
  info: {
    title: "API",
    version: "1.0.0",
    description: "This is the API for the application",
  },
  host:  process.env.NODE_ENV === "development"
      ? `${process.env.HOST}:${process.env.PORT}`
      : process.env.SERVER_IP,
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  definitions: DEFINITIONS,
  security: [{ Bearer: [] }],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, docs);
