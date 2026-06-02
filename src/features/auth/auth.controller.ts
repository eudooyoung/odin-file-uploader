import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import type { CreateUserInput, SignupBody } from "./auth.types.js";
import { createUser } from "./auth.repository.js";
import { validateUser } from "@/validates/validateUser.js";

export const signupGet: RequestHandler = (req, res) => {
  res.render("index");
};

const signupPostHandler: RequestHandler = (req, res) => {
  void (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        prev: req.body as SignupBody,
      });
    }
    const { username, password }: CreateUserInput = matchedData(req);
    await createUser({ username, password });
    res.redirect("/dashboard");
  })();
};

export const signupPost = [...validateUser, signupPostHandler];

export const loginGet: RequestHandler = (req, res) => {
  res.render("index");
};
