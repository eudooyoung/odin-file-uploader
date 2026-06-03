import { findFoldersByUserId } from "@/repositories/folderRepository.js";
import type { RequestHandler } from "express";

const folderProvider: RequestHandler = async (req, res, next) => {
  const folders = await findFoldersByUserId(req.user!.id);
  res.locals.folders = folders;
  next();
};

export default folderProvider;
