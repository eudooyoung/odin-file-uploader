import { body } from "express-validator";
import bcrypt from "bcryptjs";
import {
  duplicateErr,
  emailErr,
  emptyErr,
  passwordConfirmNotMatchErr,
  passwordMaxLengthErr,
  passwordMinLengthErr,
  passwordNumericErr,
  passwordSpecialCharacterErr,
  passwordUppercaseErr,
  usernameMaxLengthErr,
  usernameMinLengthErr,
} from "./errorMessages.js";
import { existUserByUsername } from "@/features/user/user.repository.js";
import type { SignupBody } from "@/features/auth/auth.types.js";

export const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`username ${emptyErr}`)
    .isEmail()
    .withMessage(`username ${emailErr}`)
    .isLength({ min: 6 })
    .withMessage(`username ${usernameMinLengthErr}`)
    .isLength({ max: 30 })
    .withMessage(`username ${usernameMaxLengthErr}`)
    .custom(async (username: string) => {
      const isDuplicate = await existUserByUsername(username);
      if (isDuplicate) {
        throw new Error(`username ${duplicateErr}`);
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`password ${emptyErr}`)
    .matches(/[A-Z]/)
    .withMessage(`password ${passwordUppercaseErr}`)
    .matches(/[0-9]/)
    .withMessage(`password ${passwordNumericErr}`)
    .matches(/[!@#$%^&*]/)
    .withMessage(`password ${passwordSpecialCharacterErr}`)
    .isLength({ min: 8 })
    .withMessage(`password ${passwordMinLengthErr}`)
    .isLength({ max: 72 })
    .withMessage(`password ${passwordMaxLengthErr}`)
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    ),
  body("passwordConfirm")
    .trim()
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    )
    .custom(async (passwordConfirm: string, { req }) => {
      const { password } = req.body as SignupBody;
      if (await bcrypt.compare(password, passwordConfirm)) {
        throw new Error(passwordConfirmNotMatchErr);
      }
    }),
];
