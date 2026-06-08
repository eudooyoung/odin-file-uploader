import {
  createFilesWithFolderId,
  createFolderWithUserId,
  deleteFileByIdAndFolderId,
  deleteFolderByIdAndUserId,
  findFolderByIdAndUserId,
  updateFolderByIdAndUserId,
} from "@/repositories/storage.repository.js";
import type { FolderRequestBody } from "@/types/storage.types.js";
import {
  validateCreateFolder,
  validateUpdateFolder,
} from "@/validates/validateFolder.js";
import { matchedData, validationResult } from "express-validator";
import type { RequestHandler } from "express";
import { upload } from "@/config/multer.config.js";
import { unlinkSync } from "node:fs";

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

export const deleteFolderPost: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  await deleteFolderByIdAndUserId(folderId, req.user!.id);
  res.redirect("/storage");
};

const uploadFilesPostHandler: RequestHandler = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const filesRaw = req.files as Express.Multer.File[];
  const filesInput = filesRaw.map((file) => {
    return {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      size: file.size,
      folderId,
    };
  });
  await createFilesWithFolderId(filesInput);
  res.redirect(`/storage/folder/${folderId}`);
};

export const uploadFilesPost = [upload.array("files"), uploadFilesPostHandler];

export const downloadFilePost: RequestHandler = (req, res) => {
  const { path, name } = req.query as { path: string; name: string };
  res.download(path, name);
};

export const deleteFilePost: RequestHandler = async (req, res) => {
  const fileId = Number(req.params.fileId);
  const folderId = Number(req.params.folderId);
  const deletedPath = await deleteFileByIdAndFolderId(fileId, folderId);
  unlinkSync(deletedPath);
  res.redirect(`/storage/folder/${folderId}`);
};
