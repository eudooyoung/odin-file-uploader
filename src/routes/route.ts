import { Router } from "express";
import {
  dashboardGet,
  homeGet,
  storageGet,
  uploadPost,
} from "../controllers/controller.js";
import pageProvider from "@/middlewares/pageProvider.js";
import requireAuth from "@/middlewares/requireAuth.js";

const pageRouter = Router();

pageRouter
  .use(["/", "/home"], pageProvider("home"))
  .get(["/", "/home"], homeGet);

pageRouter
  .use("/dashboard", requireAuth, pageProvider("dashboard"))
  .get("/dashboard", dashboardGet);

pageRouter
  .use("/storage", requireAuth, pageProvider("storage"))
  .get("/storage", storageGet)
  .post("/upload", uploadPost);

export default pageRouter;
