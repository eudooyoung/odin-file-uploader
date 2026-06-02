import pageProvider from "@/middlewares/pageProvider.js";
import { Router } from "express";
import { loginGet, signupGet, signupPost } from "./auth.controller.js";

const authRouter = Router();

authRouter
  .get("/signup", pageProvider("signup"), signupGet)
  .post("/signup", pageProvider("signup"), signupPost);

authRouter.get("/login", pageProvider("login"), loginGet);

export default authRouter;
