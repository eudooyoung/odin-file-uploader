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
import cloudinary from "@/config/cloudinary.config.js";
import CustomError from "@/errors/customError.js";
import type { UploadApiResponse } from "cloudinary";

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
  const createdFolderId = await createFolderWithUserId(
    body.folderName,
    req.user!.id,
  );
  await cloudinary.api.create_folder(
    `odin_file_uploader/${req.user!.id}/${createdFolderId}`,
  );
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
  const filesInput = await Promise.all(
    filesRaw.map(async (file) => {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                asset_folder: `odin_file_uploader/${req.user!.id}/${folderId}`,
                unique_filename: true,
              },
              (error, uploadResult) => {
                if (error) {
                  return reject(
                    new CustomError({
                      message: error.message,
                      statusCode: 400,
                    }),
                  );
                }
                return resolve(uploadResult!);
              },
            )
            .end(file.buffer);
        },
      );
      return {
        originalName: file.originalname,
        fileName: uploadResult.public_id,
        size: uploadResult.bytes,
        path: uploadResult.secure_url,
        folderId,
      };
    }),
  );
  await createFilesWithFolderId(filesInput);
  res.redirect(`/storage/folder/${folderId}`);
};

export const uploadFilesPost = [upload.array("files"), uploadFilesPostHandler];

export const downloadFileGet: RequestHandler = (req, res) => {
  const { key, name } = req.params as { key: string; name: string };
  const url = cloudinary.url(key, {
    flags: `attachment:${name}`,
    resource_type: "raw",
  });

  res.redirect(url);
};

export const deleteFilePost: RequestHandler = async (req, res) => {
  const fileId = Number(req.params.fileId);
  const folderId = Number(req.params.folderId);
  const publicId = await deleteFileByIdAndFolderId(fileId, folderId);
  await cloudinary.uploader.destroy(publicId);
  res.redirect(`/storage/folder/${folderId}`);
};
