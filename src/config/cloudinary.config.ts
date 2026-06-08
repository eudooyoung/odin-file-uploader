import { v2 as cloudinary } from "cloudinary";
import config from "./env.config.js";
import type { RequestHandler } from "express";
import CustomError from "@/errors/customError.js";
import { upload } from "./multer.config.js";

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});

export default cloudinary;
