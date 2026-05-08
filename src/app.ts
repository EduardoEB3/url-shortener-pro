import express, { Application } from "express";
import healthRoutes from "./routes/health.routes";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();
app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/url", urlRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
