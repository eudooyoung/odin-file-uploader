import { Router } from "express";
import { homeGet } from "./page.controller.js";

const pageRouter = Router();

pageRouter.get(["/", "home"], homeGet);

export default pageRouter;
