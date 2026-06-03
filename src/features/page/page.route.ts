import { Router } from "express";
import { dashboardGet, homeGet } from "./page.controller.js";
import pageProvider from "@/middlewares/pageProvider.js";
import requireAuth from "@/middlewares/requireAuth.js";

const pageRouter = Router();

pageRouter.get(["/", "/home"], pageProvider("home"), homeGet);
pageRouter.get(
  "/dashboard",
  requireAuth,
  pageProvider("dashboard"),
  dashboardGet,
);

export default pageRouter;
