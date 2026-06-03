import type { RequestHandler } from "express";

const authProvider: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

export default authProvider;
