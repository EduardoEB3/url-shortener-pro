import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();
app.use(express.json());

// Global Error Handler
app.use(errorHandler);

export default app;
