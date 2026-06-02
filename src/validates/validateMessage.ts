import { body } from "express-validator";
import {
  contentMaxLengthErr,
  emptyErr,
  titleMaxLenghErr,
} from "./errorMessages.js";

export const validateNewMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(`title ${emptyErr}`)
    .isLength({ max: 50 })
    .withMessage(`title ${titleMaxLenghErr}`),
  body("content")
    .trim()
    .notEmpty()
    .withMessage(`content ${emptyErr}`)
    .isLength({ max: 500 })
    .withMessage(`content ${contentMaxLengthErr}`),
];
