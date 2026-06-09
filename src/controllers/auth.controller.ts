import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import type { CreateUserInput, SignupBody } from "../types/auth.types.js";
import { validateUser } from "@/validates/validateUser.js";
import { createUser } from "../repositories/auth.repository.js";
import cloudinary from "@/config/cloudinary.config.js";

export const signupGet: RequestHandler = (req, res) => {
  res.render("index");
};

const signupPostHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
      prev: req.body as SignupBody,
    });
  }
  const { username, password }: CreateUserInput = matchedData(req);
  const createdUserId = await createUser({ username, password });
  await cloudinary.api.create_folder(`odin_file_uploader/${createdUserId}`);
  res.redirect("/auth/login");
};

export const signupPost = [...validateUser, signupPostHandler];

export const loginGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const logoutGet: RequestHandler = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
