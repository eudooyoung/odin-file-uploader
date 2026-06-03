import express from "express";
import flash from "express-flash";
import path from "node:path";
import session from "./config/session.config.js";
import requestBodyCaseConverter from "./middlewares/requestBodyCaseConverter.js";
import errorHandler from "./errors/errorHandler.js";
import pageRouter from "./features/page/page.route.js";
import linkProvider from "./middlewares/linkProvider.js";
import authRouter from "./features/auth/auth.route.js";
import passport from "@/config/passport.config.js";
import authProvider from "./middlewares/authProvider.js";

export const createServer = () => {
  const app = express();

  app
    .set("views", path.join(import.meta.dirname, "views"))
    .set("view engine", "ejs")
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(flash())
    .use(session)
    .use(passport.session())
    .use(requestBodyCaseConverter)
    .use(linkProvider)
    .use(authProvider);

  app.use("/", pageRouter);
  app.use("/auth", authRouter);

  app.use(errorHandler);

  return app;
};
