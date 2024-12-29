import { SwaggerOptions } from "swagger-ui-express";
import tasksSwaggerDocs from "./taskSwaggerDocs";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coally Task Manager ",
      version: "1.0.0",
      description: "API para el challenge de Coally",
    },
    servers: [
      {
        url: `${process.env.DEPLOY_URL || "http://localhost:3000"}`,
      },
    ],
    paths: tasksSwaggerDocs,
  },
  apis: ["./src/routes/*.ts"],
};
