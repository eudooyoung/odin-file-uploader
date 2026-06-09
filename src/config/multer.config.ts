import CustomError from "@/errors/customError.js";
import multer from "multer";
// import { existsSync, mkdirSync } from "node:fs";

/*
const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = `uploads/${req.user!.id}/${Number(req.params.folderId)}`;
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
});
*/

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg/", "impage/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      callback(
        new CustomError({
          message: "Unsupported filetype",
          statusCode: 400,
        }),
      );
    }

    callback(null, true);
  },
});
