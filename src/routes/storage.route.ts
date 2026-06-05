import {
  createFolderPost,
  deleteFilePost,
  deleteFolderPost,
  downloadFilePost,
  folderGet,
  storageGet,
  updateFolderPost,
  uploadFilesPost,
} from "@/controllers/storage.controller.js";
import folderProvider from "@/middlewares/folderProvider.js";
import pageProvider from "@/middlewares/pageProvider.js";
import requireAuth from "@/middlewares/requireAuth.js";
import { Router } from "express";

const storageRouter = Router();

storageRouter.use(requireAuth, folderProvider);

storageRouter.get("/", pageProvider("storage"), storageGet);
storageRouter.post("/folder/create", pageProvider("storage"), createFolderPost);

storageRouter
  .use("/folder/:folderId", pageProvider("folder"))
  .get("/folder/:folderId", folderGet)
  .post("/folder/:folderId/update", updateFolderPost)
  .post("/folder/:folderId/delete", deleteFolderPost)
  .post("/folder/:folderId/file/upload", uploadFilesPost)
  .post("/folder/:folderId/file/:fileId/download", downloadFilePost)
  .post("/folder/:folderId/file/:fileId/delete", deleteFilePost);

export default storageRouter;
