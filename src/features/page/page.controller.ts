import type { RequestHandler } from "express";

export const homeGet: RequestHandler = (req, res) => {
  res.render("index");
};
