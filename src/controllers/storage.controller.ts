import {
  createFolderWithUserId,
  findFolderByIdAndUserId,
  updateFolderByIdAndUserId,
} from "@/repositories/folderRepository.js";
import type { FolderRequestBody } from "@/types/types.js";
import {
  validateCreateFolder,
  validateUpdateFolder,
} from "@/validates/validateFolder.js";
import { matchedData, validationResult } from "express-validator";
import type { RequestHandler } from "express";
import { upload } from "@/config/multer.config.js";

export const storageGet: RequestHandler = (req, res) => {
  res.render("index");
};

const createFolderPostHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
      prev: req.body as FolderRequestBody,
    });
  }
  const body: FolderRequestBody = matchedData(req);
  await createFolderWithUserId(body.folderName, req.user!.id);
  res.redirect("/storage");
};

export const createFolderPost = [
  ...validateCreateFolder,
  createFolderPostHandler,
];

export const folderGet: RequestHandler = async (req, res) => {
  const folder = await findFolderByIdAndUserId(
    Number(req.params.folderId),
    req.user!.id,
  );

  res.render("index", {
    folder: folder,
  });
};

const updateFolderPostHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const folder = await findFolderByIdAndUserId(
      Number(req.params.folderId),
      req.user!.id,
    );
    return res.status(400).render("index", {
      folder: folder,
      errors: errors.array(),
    });
  }
  const folderId = Number(req.params.folderId);
  const body: FolderRequestBody = matchedData(req);
  await updateFolderByIdAndUserId(folderId, body.folderName, req.user!.id);
  res.redirect(`/storage/folder/${folderId}`);
};

export const updateFolderPost = [
  ...validateUpdateFolder,
  updateFolderPostHandler,
];

const uploadFilesPostHandler: RequestHandler = (req, res) => {
  console.log(req.files);
  res.redirect(`/storage/folder/${Number(req.params.folderId)}`);
};

export const uploadFilesPost = [upload.array("files"), uploadFilesPostHandler];
