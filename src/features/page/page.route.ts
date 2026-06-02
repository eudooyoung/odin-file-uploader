import { Router } from "express";
import { homeGet } from "./page.controller.js";
import pageProvider from "@/middlewares/pageProvider.js";

const pageRouter = Router();

pageRouter.get(["/", "home"], pageProvider("home"), homeGet);

export default pageRouter;
