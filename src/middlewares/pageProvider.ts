import type { Page } from "@/features/page/page.types.js";
import type { RequestHandler } from "express";

const pageProvider =
  (page: Page): RequestHandler =>
  (req, res, next) => {
    res.locals.page = page;
    next();
  };

export default pageProvider;
