import pageProvider from "@/middlewares/pageProvider.js";
import { Router, type RequestHandler } from "express";
import {
  loginGet,
  logoutGet,
  signupGet,
  signupPost,
} from "../controllers/auth.controller.js";
import requireGuest from "@/middlewares/requireGuest.js";
import passport from "@/config/passport.config.js";

const authRouter = Router();

authRouter
  .use("/signup", requireGuest, pageProvider("signup"))
  .get("/signup", signupGet)
  .post("/signup", signupPost);

authRouter
  .use("/login", requireGuest, pageProvider("login"))
  .get("/login", loginGet)
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
      failureFlash: true,
    }) as RequestHandler,
  );

authRouter.post("/logout", logoutGet);

export default authRouter;
