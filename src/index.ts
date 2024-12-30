import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { swaggerOptions } from "./swagger/swaggerOptions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/db-coally")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;