import type { Page } from "@/types/types.js";
import type { RequestHandler } from "express";

const pageProvider =
  (page: Page): RequestHandler =>
  (req, res, next) => {
    res.locals.page = page;
    next();
  };

export default pageProvider;
