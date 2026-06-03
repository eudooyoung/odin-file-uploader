import { createFolderWithUserId } from "@/repositories/folderRepository.js";
import type { FolderRequestBody } from "@/types/types.js";
import { validateNewFolder } from "@/validates/validateFolder.js";
import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";

export const homeGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const dashboardGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const storageGet: RequestHandler = (req, res) => {
  res.render("index");
};

const createFolderPostHandler: RequestHandler = (req, res) => {
  void (async () => {
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
  })();
};

export const createFolderPost = [...validateNewFolder, createFolderPostHandler];
