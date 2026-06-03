import {
  createFolderWithUserId,
  findFolderByIdAndUserId,
} from "@/repositories/folderRepository.js";
import type { FolderRequestBody } from "@/types/types.js";
import { validateNewFolder } from "@/validates/validateFolder.js";
import { matchedData, validationResult } from "express-validator";
import type { RequestHandler } from "express";
import RecordNotFoundError from "@/errors/RecordNorFoundError.js";

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

export const createFolderPost = [...validateNewFolder, createFolderPostHandler];

export const folderGet: RequestHandler = async (req, res) => {
  const { folderId } = req.params;
  const folder = await findFolderByIdAndUserId(Number(folderId), req.user!.id);
  if (!folder) {
    throw new RecordNotFoundError({
      message: "Record not found",
      statusCode: 404,
      code: "ERR_NF",
    });
  }
  res.render("index", {
    folder: folder,
  });
};

export const uploadFilesPost: RequestHandler = (req, res, next) => {};
