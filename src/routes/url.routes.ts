import { Router } from "express";
import { UrlController } from "../controllers/url.controller";
import { validateUrl } from "../middlewares/validateUrl";

const urlRouter = Router();

urlRouter.post("/create", validateUrl, UrlController.create);

export default urlRouter;
