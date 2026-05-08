import { Router } from "express";
import { UrlController } from "../controllers/url.controller";
import { validateUrl } from "../middlewares/validateUrl";

const urlRouter = Router();

urlRouter.post("/create", validateUrl, UrlController.create);
urlRouter.get("/:shortCode", UrlController.redirect);

export default urlRouter;
