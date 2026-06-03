import { Router } from "express";
import { dashboardGet, homeGet } from "../controllers/controller.js";
import pageProvider from "@/middlewares/pageProvider.js";
import requireAuth from "@/middlewares/requireAuth.js";

const router = Router();

router.use(["/", "/home"], pageProvider("home")).get(["/", "/home"], homeGet);

router
  .use("/dashboard", requireAuth, pageProvider("dashboard"))
  .get("/dashboard", dashboardGet);

export default router;
