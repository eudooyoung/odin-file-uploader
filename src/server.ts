import express from "express";
import flash from "express-flash";
import path from "node:path";
import sessionConfig from "./config/session.config.js";
import requestBodyCaseConverter from "./middlewares/utils/requestBodyCaseConverter.js";
import passport from "passport";
import { configurePassport } from "./config/passport.config.js";
import errorHandler from "./middlewares/errors/errorHandler.js";
import pageRouter from "./features/page/page.route.js";

export const createServer = () => {
  const app = express();
  configurePassport();

  app
    .set("views", path.join(import.meta.dirname, "views"))
    .set("view engine", "ejs")
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(flash())
    .use(sessionConfig)
    .use(passport.session())
    .use(requestBodyCaseConverter);

  app.use("/", pageRouter);

  app.use(errorHandler);

  return app;
};
