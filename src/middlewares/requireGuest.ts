import type { RequestHandler } from "express";

const requireGuest: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export default requireGuest;
