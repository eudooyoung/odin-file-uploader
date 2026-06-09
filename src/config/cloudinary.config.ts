import { v2 as cloudinary } from "cloudinary";
import config from "./env.config.js";

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});

export default cloudinary;
