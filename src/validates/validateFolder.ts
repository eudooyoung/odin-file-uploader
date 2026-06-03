import { body } from "express-validator";
import v from "./validateErrorMessages.js";
import { existFolderNameByUserId } from "@/repositories/folderRepository.js";
import type { AuthUser } from "@/types/auth.types.js";

export const validateNewFolder = [
  body("folderName")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`Folder name ${v.emptyErr}`)
    .matches(/^[a-zA-Z가-힣0-9\s]+$/)
    .withMessage(`Folder name ${v.hangulAlphaNumericErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Floder name ${v.nameLengthErr}`)
    .custom(async (folderName: string, { req }) => {
      const { id } = req.user as AuthUser;
      const isDuplicate = await existFolderNameByUserId(folderName, id);
      if (isDuplicate) {
        throw new Error(`Folder name ${v.duplicateErr}`);
      }
    }),
];
