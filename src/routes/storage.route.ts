import {
  createFolderPost,
  folderGet,
  storageGet,
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
storageRouter.get("/folder/:folderId", pageProvider("folder"), folderGet);
storageRouter.post(
  "/folder/:folderId/file/upload",
  pageProvider("folder"),
  uploadFilesPost,
);

export default storageRouter;
