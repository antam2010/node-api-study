const swaggerJsDoc = require("swagger-jsdoc");


const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API TEST",
      version: "1.0.0",
      description: "node api 공부중",
    },
    schemes: ["http"], // HTTP만 사용하도록 설정
    servers: [
      {
        url: `http://${hostname}:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // API 문서화할 파일 경로
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
